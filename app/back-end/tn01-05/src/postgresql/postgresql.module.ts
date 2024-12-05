import { Module } from '@nestjs/common';
import { PostgresqlService } from './postgresql.service';
import { PostgresqlController } from './postgresql.controller';

@Module({
  providers: [PostgresqlService],
  controllers: [PostgresqlController]
})
export class PostgresqlModule {}
