import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoriesDto } from './dto/category.dto'


@Injectable()
export class CategoriesService {
	constructor(private prisma: PrismaService) {}

	async getByStoreId(storeId: string) {
		return this.prisma.category.findMany({
			where: {
				storeId
			}
		})
	}

	async getById(id: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			}
		})

		if (!category) throw new NotFoundException('Категория не найдена')

		return category
	}

	async create(storeId: string, dto: CategoriesDto) {
		return this.prisma.category.create({
			data: {
				title: dto.title,
				description: dto.description,
				storeId
			}
		})
	}

	async update(id: string, dto: CategoriesDto) {
		await this.getById(id)

		return this.prisma.category.update({
			where: { id },
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prisma.category.delete({
			where: { id }
		})
	}
}
