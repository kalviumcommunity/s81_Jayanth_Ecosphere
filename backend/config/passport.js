const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { volunteerModel } = require('../Model/volenteerSchema');
const dotenv = require('dotenv');

dotenv.config();




passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    if (!profile.emails || profile.emails.length === 0) {
      return done(new Error('No email found in Google profile'));
    }
    console.log('Access Token:', accessToken);
    console.log('Profile:', profile);
    
    const email = profile.emails[0].value;
    const name = profile.displayName;
    console.log(email)
    let user = await volunteerModel.findOne({ email });

    if (!user) {
      user = new volunteerModel({
        name,
        email,
        password: '', 
        role: 'user',
        isActivated: true,
      });
      await user.save();
    }

  
    return done(null, { profile, user });

  } catch (err) {
    return done(err, null);
  }
}));



module.exports = passport;
