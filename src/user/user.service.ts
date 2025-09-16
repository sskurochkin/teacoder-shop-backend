import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {hash} from "argon2";
import {AuthDto} from "../auth/dto/auth.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {
    }

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			},
			include: {
				stores: true,
				favorites: {
					include: {
						category: true
					}
				},
				orders: true
			}
		})
	}
    async getByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
            select: {
                stores: true,
                favorites: true,
                orders: true
            }
        })

        return user
    }

	async toggleFavorite(productId: string, userId: string) {
		const user = await this.getById(userId)

		const isExists = user.favorites.some(
			product => product.id === productId
		)

		await this.prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				favorites: {
					[isExists ? 'disconnect' : 'connect']: {
						id: productId
					}
				}
			}
		})

		return true
	}
    async create(dto: AuthDto) {

        return this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: await hash(dto.password)
            }
        })
    }
}
