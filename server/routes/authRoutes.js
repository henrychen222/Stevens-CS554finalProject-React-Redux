const passport = require('passport');

//Exporting the routes as an anonymous function which expects app as
//its input argument

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', 
  passport.authenticate('google'),
  (req, res) =>{
      res.redirect('/dashboard');
  }
);

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});
};
