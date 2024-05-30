import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';;
import typeorm from './config/typeorm'


@Module({
  imports: [
    BookModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true , load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    })]
})
export class AppModule {}
