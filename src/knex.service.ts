import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { knex } from 'knex';

@Injectable()
export class KnexService implements OnModuleInit {
  private db: knex.Knex;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.db = knex({
      client: 'pg',
      connection: this.configService.get('DATABASE_URL'),
    });

    await this.db.schema.withSchema('fyoussef').raw(
      `
        -- CreateExtension
        CREATE EXTENSION IF NOT EXISTS "citext";

        -- CreateExtension
        CREATE EXTENSION IF NOT EXISTS "pg_trgm";

        -- CreateExtension
        CREATE EXTENSION IF NOT EXISTS "unaccent";

        -- CreateTable
        CREATE TABLE IF NOT EXISTS "heroes" (
          "id" UUID NOT NULL,
          "name" TEXT NOT NULL,
          "description" TEXT NOT NULL,
          "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMPTZ NOT NULL,

          CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
        );

        -- CreateIndex
        CREATE INDEX IF NOT EXISTS "heroes_name_trgm_idx" ON "heroes" USING GIN ("name" gin_trgm_ops);
        CREATE INDEX IF NOT EXISTS "heroes_description_trgm_idx" ON "heroes" USING GIN ("description" gin_trgm_ops);
        CREATE INDEX IF NOT EXISTS "heroes_name_description_idx"
        ON "heroes"
        USING GIN ((name || ' ' || description) gin_trgm_ops);
      `,
    );
  }

  get instance() {
    return this.db;
  }
}
