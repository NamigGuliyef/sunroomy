import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { tokenCheckMiddleware } from './middleware/tokencheck.middleware';

@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb+srv://outdoorproject2023:outdoor2023@outdoor.3zumzdl.mongodb.net/?retryWrites=true&w=majority'), AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tokenCheckMiddleware).forRoutes(AdminController)
  }
}

