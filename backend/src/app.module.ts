import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'plantdex-db',
      port: 3306,
      username: 'user',
      password: 'user_password',
      database: 'plantdex',
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
