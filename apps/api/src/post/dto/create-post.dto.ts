import { createZodDto } from 'nestjs-zod';

import { postCreateSchema } from '@repo/validation';

export class CreatePostDto extends createZodDto(postCreateSchema) {}
