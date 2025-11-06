import { createZodDto } from 'nestjs-zod';

import { voteSchema } from '@repo/validation';

export class VoteDto extends createZodDto(voteSchema) {}
