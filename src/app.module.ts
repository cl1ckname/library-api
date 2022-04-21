import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookEntity } from './book/book.entity';
import { BookModule } from './book/book.module';
import { RentEntity } from './rent/rent.entity';
import { RentModule } from './rent/rent.module';
import { SubscriptionEntity } from './subscriprion/subscription.entity';
import { SubscriptionModule } from './subscriprion/subscription.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'library',
      password: 'library',
      database: 'library',
      synchronize: false,
      entities: [UserEntity, SubscriptionEntity, BookEntity, RentEntity]
    }),
    UserModule,
    SubscriptionModule,
    BookModule,
    RentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
