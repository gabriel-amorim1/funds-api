import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryService } from './services/category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    findAll(): Promise<CategoryEntity[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<CategoryEntity> {
        return this.categoryService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<CategoryEntity> {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.categoryService.remove(id);
    }
}
