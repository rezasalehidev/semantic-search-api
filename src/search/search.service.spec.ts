import { Test, TestingModule } from '@nestjs/testing';
import { GroqService } from '../groq/groq.service.js';
import { SearchService } from './search.service.js';
import { VectorStoreService } from './vector-store.service.js';

describe('SearchService', () => {
  let service: SearchService;
  let store: VectorStoreService;

  const groq = {
    embed: async (texts: string[]) =>
      texts.map((text) =>
        text.toLowerCase().includes('vacation') ||
        text.toLowerCase().includes('time off')
          ? [1, 0]
          : [0, 1],
      ),
    chat: async () => 'Submit leave in the People portal.',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        VectorStoreService,
        { provide: GroqService, useValue: groq },
      ],
    }).compile();

    service = module.get(SearchService);
    store = module.get(VectorStoreService);
    store.clear();
  });

  it('ranks the closest seeded document first', async () => {
    await service.addMany([
      {
        title: 'Time off',
        content: 'Paid vacation and leave requests',
      },
      {
        title: 'Pricing',
        content: 'Starter and Growth monthly plans',
      },
    ]);

    const results = await service.search('how do I take time off', 2);

    expect(results[0].title).toBe('Time off');
    expect(results[0].score).toBeGreaterThan(results[1].score);
  });
});
