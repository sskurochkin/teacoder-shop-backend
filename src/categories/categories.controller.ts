import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CategoriesDto } from './dto/category.dto'
import { CategoriesService} from './categories.service'
import { Auth } from '../auth/decorartors/auth.decorator'


@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}

	@Auth()
	@Get('by-storeId/:storeId')
	async getByStoreId(@Param('storeId') storeId: string) {
		return this.categoryService.getByStoreId(storeId)
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.categoryService.getById(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post(':storeId')
	async create(@Param('storeId') storeId: string, @Body() dto: CategoriesDto) {
		return this.categoryService.create(storeId, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: CategoriesDto) {
		return this.categoryService.update(id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(id)
	}
}
