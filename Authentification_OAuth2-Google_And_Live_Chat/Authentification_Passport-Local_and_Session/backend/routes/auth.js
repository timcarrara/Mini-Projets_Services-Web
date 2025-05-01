const authController = require('../controllers/authcontroller.js');
module.exports = function(app,passport){
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', (req, res, next) => {
        passport.authenticate('local-signup', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({ message: info.message || 'Erreur lors de l’inscription' });

            req.login(user, err => {
                if (err) return res.status(500).json({ message: 'Connexion après inscription échouée' });
                return res.status(200).json({ message: 'Inscription réussie', user });
            });
        })(req, res, next);
    });
    app.get('/home', isLoggedIn, authController.home);
    app.post('/logout', (req, res) => {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
            }
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: 'Erreur lors de la suppression de la session' });
                }
                res.clearCookie('connect.sid');
                res.status(200).json({ message: 'Déconnexion réussie' });
            });
        });
    });
    app.post('/signin', (req, res, next) => {
        passport.authenticate('local-signin', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({ message: info.message || 'Identifiants invalides' });

            req.login(user, err => {
                if (err) return res.status(500).json({ message: 'Connexion échouée' });
                return res.status(200).json({ message: 'Connexion réussie', user });
            });
        })(req, res, next);
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).json({ message: 'Utilisateur non authentifié, veuillez vous connecter' });
        res.redirect('/signin');
    }
}