import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from 'src/config/multer/multer';
import { createFeatureDto } from 'src/features/dto/feature.dto';
import { Feature } from 'src/features/model/feature.schema';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

@Post('/dashboard/feature')
@HttpCode(HttpStatus.CREATED)
@UsePipes(new ValidationPipe())
@UseInterceptors(FileInterceptor('icon', MulterOptions))

  async createFeature(@Body() CreateFeatureDto: createFeatureDto, @UploadedFile() file:Express.Multer.File): Promise<Feature> {
    return await this.adminService.createFeature(CreateFeatureDto,file);
  }
}
