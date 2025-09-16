import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private configService: ConfigService) {
        // Получаем значения и проверяем их наличие
        const clientID = configService.get("GOOGLE_CLIENT_ID");
        const clientSecret = configService.get("GOOGLE_CLIENT_SECRET");
        const serverURL = configService.get("SERVER_URL");

        if (!clientID || !clientSecret || !serverURL) {
            throw new Error('Google OAuth configuration is missing');
        }

        super({
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: `${serverURL}/auth/google/callback`, // Добавлен слеш
            scope: ['profile', 'email']
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ): Promise<any> {
        const { displayName, emails, photos } = profile;

        // Создаем пользователя с проверками
        const user = {
            email: emails?.[0]?.value, // Безопасное извлечение
            name: displayName || '',
            picture: photos?.[0]?.value || null // Безопасное извлечение
        };

        done(null, user);
    }
}