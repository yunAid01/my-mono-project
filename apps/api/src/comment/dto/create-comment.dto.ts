import { createZodDto } from 'nestjs-zod';
import { createCommentSchema } from '@repo/validation';

export class CreateCommentDto extends createZodDto(createCommentSchema) {}
