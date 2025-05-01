const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  githubId: { type: String },
  email: { type: String, required: true },
  displayName: { type: String, required: true, default: 'Nouvel Utilisateur' },
  avatar: String,
  refreshToken: String,
  accessTokens: [{
    token: String,
    provider: String,
    expiresAt: Date
  }],
  lastLogin: Date,
  loginCount: { type: Number, default: 0 }
}, { 
  timestamps: true,
  autoIndex: true 
});

// Méthodes
userSchema.methods.addToken = async function(tokenData) {
  this.accessTokens.push(tokenData);
  return this.save();
};

userSchema.methods.cleanExpiredTokens = async function() {
  this.accessTokens = this.accessTokens.filter(
    token => token.expiresAt > new Date()
  );
  return this.save();
};

// Hook de nettoyage automatique
userSchema.pre('save', function(next) {
  if (this.isModified('accessTokens')) {
    this.cleanExpiredTokens().then(() => next()).catch(next);
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);