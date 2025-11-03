import { Test, TestingModule } from '@nestjs/testing';
import { SubradditController } from './subraddit.controller';
import { SubradditService } from './subraddit.service';

describe('SubradditController', () => {
  let controller: SubradditController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubradditController],
      providers: [SubradditService],
    }).compile();

    controller = module.get<SubradditController>(SubradditController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
