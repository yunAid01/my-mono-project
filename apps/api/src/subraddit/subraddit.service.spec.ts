import { Test, TestingModule } from '@nestjs/testing';
import { SubradditService } from './subraddit.service';

describe('SubradditService', () => {
  let service: SubradditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubradditService],
    }).compile();

    service = module.get<SubradditService>(SubradditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
