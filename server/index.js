const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const path = require('path');
const axios = require('axios');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { Strategy: DevmtnStrategy } = require('devmtn-auth');

const devMtnPassport = new passport.Passport();
require('dotenv').config();

const app = express();
const port = process.env.DEV_PORT || 8080;
const configPath = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const {
  connectionString,
  sessionConfig,
  devmtnAuth,
  clientID,
  clientSecret,
  callbackURL,
  auth_redirect
} = require(`../configs/${configPath}.config`); // eslint-disable-line
const masterRoutes = require('./masterRoutes');

app.use(cors());
app.use(json());
app.use(session(sessionConfig));

massive(connectionString)
  .then(dbInstance => {
    dbInstance.init
      .createUserTable()
      .then(() => console.log('user table initialised'))
      .catch(err => {
        console.log('failed to initialize user table', err);
      });
    app.set('db', dbInstance);
  })
  .catch(console.log);

devMtnPassport.use(
  'devmtn',
  new DevmtnStrategy(devmtnAuth, (jwtoken, user, done) => done(null, user))
);

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
      scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar']
    },
    (accessToken, refreshToken, profile, done) => {
      const db = app.get('db');
      db.users
        .getUser([profile.id])
        .then(user => {
          const existingUser = user[0];
          existingUser.accessToken = accessToken;
          return done(null, existingUser);
        })
        .catch(() => {
          db.users
            .addUser([
              profile.id,
              profile.name.givenName,
              profile.name.familyName,
              accessToken,
              `${profile.photos[0].value}0`
            ])
            .then(user => {
              const newUser = user[0];
              newUser.accessToken = accessToken;
              return done(null, newUser);
            })
            .catch(error => done(error, null));
        });
    }
  )
);

devMtnPassport.serializeUser((user, done) => {
  done(null, user);
});

passport.serializeUser((user, done) => {
  const { token, accessToken } = user;
  if (token && accessToken) {
    /**
     * TODO: This may not actually be necessary (and in fact may be bad).
     * Once endpoint calls to DM.com work, check if this is good or bad.
     */
    axios.defaults.headers['x-access-token'] = accessToken;
    axios.defaults.headers['x-client-token'] = token;
  }
  done(null, user);
});

passport.deserializeUser((id, done) => {
  const db = app.get('db');
  // Checking to see if user is google or devmtn
  if (id.google_id) {
    db.users
      .getUser([id.google_id])
      .then(user => done(null, user[0]))
      .catch(err => done(err, null));
  } else {
    done(null, id);
  }
});

app.use(devMtnPassport.initialize());

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/devmtn', devMtnPassport.authenticate('devmtn'));
app.get(
  '/auth/devmtn/callback',
  devMtnPassport.authenticate('devmtn', { failureRedirect: '/#/login' }),
  (req, res) => {
    // Puts information from devmtn auth onto sessions, as the google user will overwrite req.user
    req.session.devmtnUser = Object.assign({}, req.user);
    res.redirect('/auth/google');
  }
);

app.get('/auth/google', passport.authenticate('google'));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    axios
      .get('https://devmountain.com/api/users/mentors')
      .then(console.log)
      .catch(console.log);
    res.redirect(auth_redirect);
  }
);
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

masterRoutes(app);

switch (process.env.npm_lifecycle_event) {
case 'build':
  break;
case 'start':
  break;
default:
  app.use('/', express.static(`${__dirname}/../build`));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../build/index.html'));
  });
}

app.listen(port, () => {
  console.log('Server listening on port', port);
});
