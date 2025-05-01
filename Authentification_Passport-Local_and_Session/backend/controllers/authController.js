exports.signup = (req, res) => {
    res.json({ message: 'Page pour s\'inscrire' });
};

exports.signin = (req, res) => {
    res.json({ message: 'Page pour se connecter' });
};

exports.home = (req, res) => {
    res.json({ message: 'Bienvenue sur la page d\'accueil sécurisée' });
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la déconnexion', error: err });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la suppression de la session', error: err });
            }
            res.clearCookie('connect.sid', {
                httpOnly: true,
                sameSite: 'Strict'
            });
            return res.status(200).json({ message: 'Déconnexion réussie' });
        });
    });
};

