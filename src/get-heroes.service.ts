import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { KnexService } from 'src/knex.service';
import { Hero } from 'src/types/hero';

@Injectable()
export class GetHeroes {
  constructor(
    private knex: KnexService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async execute(input?: Input): Promise<Hero.HeroGetAllOutput[]> {
    const heroesInCache: Hero.HeroGetAllOutput[] =
      (await this.cacheManager.get('heroes')) || [];

    if (heroesInCache.length > 0) {
      return heroesInCache;
    }

    const knex = this.knex.instance;
    const offset = (input?.page ?? 1) * 20;
    const heroes = await knex('heroes').select('*').offset(offset).limit(20);

    await this.cacheManager.set('heroes', heroes, 1000 * 60);

    return heroes;
  }
}

type Input = {
  page: number;
};
