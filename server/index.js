const express = require('express'),
  cors = require('cors'),
  { json } = require('body-parser'),
  session = require('express-session'),
  massive = require('massive'),
  passport = require('passport'),
  path = require('path'),
  { Strategy: DevmtnStrategy } = require('devmtn-auth'),
  devMtnPassport = new passport.Passport(),
  syncStudents = require('./studentSyncCronJob');

require('dotenv').config();

const app = express();
const port = process.env.DEV_PORT;
const configPath = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const {
  connectionString,
  sessionConfig,
  devmtnAuth,
  auth_redirect
} = require(`../configs/${configPath}.config`);
const masterRoutes = require('./masterRoutes');

app.use(cors());
app.use(json());
app.use(session(sessionConfig));

massive(connectionString)
  .then(dbInstance => {
    app.set('db', dbInstance);
  })
  .catch(err => console.log('Failed to connect to Postgres DataBase: ', err));

devMtnPassport.use(
  'devmtn',
  new DevmtnStrategy(devmtnAuth, (jwtoken, user, done) => {
    const db = app.get('db');

    return db.scripts.dm_users
      .addUser(user)
      .then(dbUser => {
        const finalUser = dbUser.reduce(
          (acc, cur) => ({
            cohorts: [...acc.cohorts, cur.name],
            name: `${cur.first_name} ${cur.last_name}`,
            user_id: cur.user_id,
            default_cohort_id: cur.default_cohort_id
          }),
          { cohorts: [] }
        );
        finalUser.roles = user.roles;
        done(null, finalUser);
      })
      .catch(err => console.log('Could not add or select user', err));
  })
);

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

app.use(devMtnPassport.initialize());

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/devmtn',
  (req, res, next) => {
    req.session.redirect = req.query.redirect
      ? req.query.redirect.replace(/\//, '')
      : '';
    next();
  },
  devMtnPassport.authenticate('devmtn')
);
app.get(
  '/auth/devmtn/callback',
  devMtnPassport.authenticate('devmtn', { failureRedirect: '/loginFailed' }),
  (req, res) => res.redirect(`${auth_redirect}${req.session.redirect}`)
);

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect(auth_redirect);
  });
});

// app.use('*', authMiddleware);

masterRoutes(app);
syncStudents(app);

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
