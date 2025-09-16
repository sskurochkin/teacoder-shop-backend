import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Profile, Strategy } from "passport-yandex";

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get("YANDEX_CLIENT_ID")!, // Добавлен !
            clientSecret: configService.get("YANDEX_CLIENT_SECRET")!, // Добавлен !
            callbackURL: configService.get("SERVER_URL") + "/auth/yandex/callback", // Добавлен / и !

        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any) => void // Указан тип для done
    ): Promise<any> {
        const { username, emails, photos } = profile;

        const user = {
            email: emails?.[0]?.value, // Добавлена проверка на существование
            name: username,
            picture: photos?.[0]?.value // Добавлена проверка на существование
        };

        done(null, user);
    }
}