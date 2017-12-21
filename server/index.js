const express = require('express'),
  cors = require('cors'),
  { json } = require('body-parser'),
  session = require('express-session'),
  massive = require('massive'),
  passport = require('passport'),
  axios = require('axios'),
  path = require('path'),
  { Strategy: DevmtnStrategy } = require('devmtn-auth'),
  devMtnPassport = new passport.Passport();
require('dotenv').config();

const app = express();
const port = process.env.DEV_PORT;
const configPath = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const {
  connectionString,
  sessionConfig,
  devmtnAuth,
  auth_redirect,
  authHeaders
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
  .catch(err => console.log('Failed to connect to Postgres DataBase: ', err));

devMtnPassport.use(
  'devmtn',
  new DevmtnStrategy(devmtnAuth, (jwtoken, user, done) => done(null, user))
);

devMtnPassport.serializeUser((user, done) => {
  done(null, user);
});

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => {
  const db = app.get('db');
  db.dm_users
    .getUser([user.id])
    .then(dbUser => {
      if (dbUser.length) {
        const existingUser = dbUser[0];
        return done(null, existingUser);
      }
      db.dm_users
        .addUser([user.id, user.first_name, user.last_name])
        .then(newDbUser => {
          const newUser = newDbUser[0];
          return done(null, newUser);
        })
        .catch(error => done(error, null));
    })
    .catch(err => {
      console.log('Could not find user, creating new User');
      return done(err, null);
    });
});

app.use(devMtnPassport.initialize());

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/devmtn', devMtnPassport.authenticate('devmtn'));
app.get(
  '/auth/devmtn/callback',
  devMtnPassport.authenticate('devmtn', { failureRedirect: '/loginFailed' }),
  (req, res) => {
    axios
      .get(
        `https://devmountain.com/api/mentors/${req.user.id}/classsessions`,
        authHeaders
      )
      .then(sessionResponse => {
        /**
         * Currently only adding sesssion id and short_name, however in the future
         * if there is any other information that is needed about the classes that
         * the mentor/instructor was over, this is where we'd want to add it.
         */
        const sessions = sessionResponse.data.map(userSession => ({
          id: userSession.id,
          name: userSession.short_name
        }));
        req.session.devmtnUser = Object.assign({}, req.user, { sessions });
        return res.redirect(auth_redirect);
      })
      .catch(err => console.log('Cannot get sessions: ', err));
  }
);

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect(auth_redirect);
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
