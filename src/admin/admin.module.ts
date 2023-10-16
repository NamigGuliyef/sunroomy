import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose'
import { adminModel } from './schema/admin.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: "admin", schema: adminModel }])],
  providers: [AdminService],
  controllers: [AdminController]


})
export class AdminModule {}
