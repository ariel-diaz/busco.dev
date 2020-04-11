import User from './models/user.model';

export default (accessToken: string, refreshToken: string, profile: any, done: any) =>  {
  User.findOne({ githubId: profile.id }, async (err, user) => {
    if (err) {
      // tslint:disable-next-line: no-console
      console.log(err);  // handle errors!
    }
    if (!err && user !== null) {
      await user.updateOne({
        access_token_github:  accessToken,
      });

      done(null, { ...user, access_token_github: accessToken });
    } else {
      const newUser = new User({
        githubId: profile.id,
        name: profile.displayName || profile.username,
        email: null,
        github: profile.username,
        password: 'NOT_PASSWORD',
        access_token_github:  accessToken ,
      });
      newUser.save((error) => {
        if (error) {
          // tslint:disable-next-line: no-console
          console.log(error);  // handle errors!
        } else {
          done(null, newUser);
        }
      });
    }
  });
};
