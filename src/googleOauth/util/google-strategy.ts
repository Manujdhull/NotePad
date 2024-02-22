import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../oauth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {
    super({
      clientID:
        '705309791533-mq4e2rppq1irhadvj9ftectt2s4hf9ae.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/auth/google/callback',
      // callbackURL: 'http://localhost:8080/notes',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(profile);
    const data = {
      email: profile.emails[0].value,
      displayName: profile.displayName,
    };
    const user = await this.authService.validateUser(data);
    console.log('Validate');
    console.log('this is user', user);
    return user || null;
  }
}
