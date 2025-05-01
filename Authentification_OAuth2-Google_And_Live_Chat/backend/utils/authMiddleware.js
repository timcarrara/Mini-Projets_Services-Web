const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 1. Récupérer le token du header Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Accès non autorisé - Token manquant' });
  }

  try {
    // 2. Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Ajouter l'utilisateur à la requête
    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};