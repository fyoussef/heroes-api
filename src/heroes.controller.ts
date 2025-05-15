import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateHero } from 'src/create-hero.service';
import { HeroCreateDto } from 'src/dto/hero-create.dto';
import { GetHeroes } from 'src/get-heroes.service';

@Controller('heroes')
export class HeroesController {
  constructor(
    private getHeroes: GetHeroes,
    private createHero: CreateHero,
  ) {}

  @Get()
  async getAllHeroes(@Query('page') page?: string) {
    return this.getHeroes.execute({ page: page ? Number(page) : 1 });
  }

  @Post()
  async create(@Body() input: HeroCreateDto) {
    await this.createHero.execute(input);
  }
}
