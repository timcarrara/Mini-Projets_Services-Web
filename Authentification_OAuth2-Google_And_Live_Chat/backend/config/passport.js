const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
const mongoose = require('mongoose');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    if (!profile.emails || !profile.emails[0]) {
      return done(new Error("Email non fourni par Google"));
    }

    const existingUser = await User.findOne({
      $or: [{ googleId: profile.id }, { email: profile.emails[0].value }]
    });

    let user;

    if (existingUser) {
      user = await User.findByIdAndUpdate(
        existingUser._id,
        {
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName || 'Utilisateur Google',
          avatar: profile.photos[0]?.value,
          lastLogin: new Date(),
          $inc: { loginCount: 1 }
        },
        { new: true }
      );
    } else {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName || 'Utilisateur Google',
        avatar: profile.photos[0]?.value,
        lastLogin: new Date(),
        loginCount: 1
      });
    }

    await User.updateOne(
      { _id: user._id },
      {
        $push: {
          accessTokens: {
            token: accessToken,
            provider: 'google',
            expiresAt: new Date(Date.now() + 3600 * 1000)
          }
        }
      }
    );

    done(null, user);
  } catch (err) {
    done(err);
  }
}));


passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback',
  scope: ['user:email']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

    const existingUser = await User.findOne({
      $or: [{ githubId: profile.id }, { email }]
    });

    let user;

    if (existingUser) {
      user = await User.findByIdAndUpdate(
        existingUser._id,
        {
          githubId: profile.id,
          email,
          displayName: profile.displayName || 'Utilisateur GitHub',
          avatar: profile.photos[0]?.value,
          lastLogin: new Date(),
          $inc: { loginCount: 1 }
        },
        { new: true }
      );
    } else {
      user = await User.create({
        githubId: profile.id,
        email,
        displayName: profile.displayName || 'Utilisateur GitHub',
        avatar: profile.photos[0]?.value,
        lastLogin: new Date(),
        loginCount: 1
      });
    }

    await User.updateOne(
      { _id: user._id },
      {
        $push: {
          accessTokens: {
            token: accessToken,
            provider: 'github',
            expiresAt: new Date(Date.now() + 3600 * 1000)
          }
        }
      }
    );

    done(null, user);
  } catch (err) {
    done(err);
  }
}));

module.exports = passport;