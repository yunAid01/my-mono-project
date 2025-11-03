import { createZodDto } from 'nestjs-zod';

import { postUpdateSchema } from '@repo/validation';

export class UpdatePostDto extends createZodDto(postUpdateSchema) {}
