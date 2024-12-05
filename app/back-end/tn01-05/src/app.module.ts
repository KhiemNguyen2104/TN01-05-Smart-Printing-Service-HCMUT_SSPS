import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostgresqlService } from './postgresql/postgresql.service';
import { PostgresqlController } from './postgresql/postgresql.controller';
import { PostgresqlModule } from './postgresql/postgresql.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, PostgresqlModule, AuthModule],
  controllers: [AppController, PostgresqlController],
  providers: [AppService, PostgresqlService],
})
export class AppModule {}
