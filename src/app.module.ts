import KeyvRedis from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateHero } from 'src/create-hero.service';
import { GetHeroes } from 'src/get-heroes.service';
import { HeroesController } from 'src/heroes.controller';
import { KnexService } from 'src/knex.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [new KeyvRedis(process.env.REDIS_URL)],
        };
      },
    }),
  ],
  providers: [KnexService, GetHeroes, CreateHero],
  controllers: [HeroesController],
})
export class AppModule {}
