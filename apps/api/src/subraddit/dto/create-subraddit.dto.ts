import { createZodDto } from 'nestjs-zod';

import {
  createSubradditSchema,
  createSubradditResponseSchema,
} from '@repo/validation';

export class CreateSubradditDto extends createZodDto(createSubradditSchema) {}
export class CreateSubradditResponseDto extends createZodDto(
  createSubradditResponseSchema,
) {}
