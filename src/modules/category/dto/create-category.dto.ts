import { OmitType } from '@nestjs/mapped-types';
import { CategoryEntity } from '../entities/category.entity';

export class CreateCategoryDto extends OmitType(CategoryEntity, ['id', 'createdAt', 'updatedAt']) {}
