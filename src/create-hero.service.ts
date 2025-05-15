import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { KnexService } from 'src/knex.service';
import { Hero } from 'src/types/hero';

@Injectable()
export class CreateHero {
  constructor(private knex: KnexService) {}

  async execute(input: Hero.HeroCreateInput) {
    const knex = this.knex.instance;
    await knex('heroes').insert({
      ...input,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
