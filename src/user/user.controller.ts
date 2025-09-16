import { Controller, Get, Param, Patch } from '@nestjs/common'
import { CurrentUser } from './decorators/user.decorator'
import { UserService } from './user.service'
import { Auth } from '../auth/decorartors/auth.decorator'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get('profile')
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}

	@Auth()
	@Patch('profile/favorites/:productId')
	async toggleFavorite(
		@CurrentUser('id') userId: string,
		@Param('productId') productId: string
	) {
		return this.userService.toggleFavorite(productId, userId)
	}
}
