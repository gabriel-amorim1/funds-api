import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private repository: Repository<CategoryEntity>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
        const { name } = createCategoryDto;

        const foundCategoryByName = await this.findByName(name);

        if (foundCategoryByName) {
            throw new ConflictException('A category with this name already exists.');
        }

        return this.repository.save(createCategoryDto);
    }

    async findAll(): Promise<CategoryEntity[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<CategoryEntity> {
        const categoryFound = this.repository.findOne({ where: { id } });

        if (!categoryFound) {
            throw new NotFoundException('Category not found.');
        }

        return categoryFound;
    }

    async findByName(name: string): Promise<CategoryEntity> {
        return this.repository.findOne({ where: { name } });
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<CategoryEntity> {
        const categoryFound = await this.findOne(id);

        return this.repository.save({
            ...categoryFound,
            updateCategoryDto,
        });
    }

    async remove(id: string): Promise<void> {
        const financialTransactionFound = await this.findOne(id);

        await this.repository.remove(financialTransactionFound);
    }
}
