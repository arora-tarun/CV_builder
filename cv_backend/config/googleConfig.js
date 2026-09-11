import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../modals/userModal.js";
import jwt from "jsonwebtoken";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: false,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModel.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await UserModel.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            password: "GOOGLE_LOGIN",
          });
        }

        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        // IMPORTANT: no req.login() here.
        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
)

export default passport;
