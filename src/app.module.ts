import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule} from './database/database.module';


@Module({
  imports: [
    BookModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule]
})
export class AppModule {}
