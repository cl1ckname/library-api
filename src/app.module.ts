import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookEntity } from './book/book.entity';
import { BookModule } from './book/book.module';
import { ConfigInterface } from './config.interface';
import { RentEntity } from './rent/rent.entity';
import { RentModule } from './rent/rent.module';
import { Subscription } from './subscriprion/subscription.entity';
import { SubscriptionModule } from './subscriprion/subscription.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({})
export class AppModule {
	public static register(config: ConfigInterface): DynamicModule {
		return {
			module: AppModule,
			imports: [
				TypeOrmModule.forRoot({
						type: 'postgres',
						host: config.host,
						port: Number.parseInt(config.port),
						username: config.username,
						password: config.password,
						database: config.database,
						synchronize: false,
						entities: [UserEntity, Subscription, BookEntity, RentEntity]
					}
				),
				UserModule,
				RentModule,
				SubscriptionModule,
				BookModule
			],
			controllers: [AppController],
			providers: [AppService]
		}
	}
}
