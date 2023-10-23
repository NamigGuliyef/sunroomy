import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { tokenCheckMiddleware } from './middleware/tokencheck.middleware';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://outdoorproject2023:outdoor2023@outdoor.3zumzdl.mongodb.net/?retryWrites=true&w=majority'),
    MailerModule.forRoot({
      transport:{
        port:587,
        service:"gmail",
        auth:{
          user:"quliyevnamiq8@gmail.com",
          pass:"kuuozvazyyafntrg"
        }
      },
      
    }),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tokenCheckMiddleware).forRoutes(AdminController);
  }
}
