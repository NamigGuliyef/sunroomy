import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from 'src/config/multer/multer';
import { createFeatureDto, updateFeatureDto } from 'src/features/dto/feature.dto';
import { Feature } from 'src/features/model/feature.schema';
import { createProjectNeedDto } from 'src/needs/dto/need.dto';
import { ProjectNeed } from 'src/needs/model/need.schema';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('/dashboard/features')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('icon', MulterOptions))
  async createFeature(@Body() CreateFeatureDto: createFeatureDto, @UploadedFile() file: Express.Multer.File): Promise<Feature> {
    return await this.adminService.createFeature(CreateFeatureDto, file);
  }

  @Put('/dashboard/features/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('icon', MulterOptions))
  async updateFeature(@Param('id') id: string, @Body() UpdateFeatureDto: updateFeatureDto, @UploadedFile() file: Express.Multer.File): Promise<Feature> {
    return await this.adminService.updateFeature(id, UpdateFeatureDto, file)
  }

  @Delete('/dashboard/features/:id')
  @HttpCode(HttpStatus.OK)
  async deleteFeature(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteFeature(id)
  }

  @Get('/dashboard/features/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleFeature(@Param('id') id: string): Promise<Feature> {
    return await this.adminService.getSingleFeature(id)
  }

  @Get('/dashboard/features')
  @HttpCode(HttpStatus.OK)
  async getAllFeatures(): Promise<Feature[]> {
    return await this.adminService.getAllFeatures()
  }

  @Post('/dashboard/projectneeds')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createProjectNeed(@Body() CreateProjectNeedDto: createProjectNeedDto): Promise<ProjectNeed> {
    return await this.adminService.createProjectNeed(CreateProjectNeedDto)
  }

  @Put('/dashboard/projectneeds/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateProjectNeed(@Param('id') id: string, @Body() CreateProjectNeedDto: createProjectNeedDto): Promise<ProjectNeed> {
    return await this.adminService.updateProjectNeed(id, CreateProjectNeedDto)
  }

}
