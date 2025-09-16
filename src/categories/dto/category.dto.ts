import { IsString } from 'class-validator'

export class CategoriesDto {
	@IsString({
		message: 'Название обязательно'
	})
	title: string

	@IsString({
		message: 'Описание обязательно'
	})
	description: string
}
