import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createApplicationDto } from 'src/applications/dto/application.dto';
import { Application } from 'src/applications/model/application.schema';
import { MulterOptions } from 'src/config/multer/multer';
import { createFeatureDto, updateFeatureDto } from 'src/features/dto/feature.dto';
import { Feature } from 'src/features/model/feature.schema';
import { createProjectNeedDto, updateProjectNeedDto } from 'src/needs/dto/need.dto';
import { ProjectNeed } from 'src/needs/model/need.schema';
import { createUsedProductsDto, updateUsedProductsDto } from 'src/used-products/dto/usedproduct.dto';
import { UsedProducts } from 'src/used-products/model/usedProduct.schema';
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
  async updateProjectNeed(@Param('id') id: string, @Body() UpdateProjectNeedDto: updateProjectNeedDto): Promise<ProjectNeed> {
    return await this.adminService.updateProjectNeed(id, UpdateProjectNeedDto)
  }

  @Delete('/dashboard/projectneeds/:id')
  @HttpCode(HttpStatus.OK)
  async deleteProjectNeed(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteProjectNeed(id)
  }

  @Get('/dashboard/projectneeds/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleProjectNeed(@Param('id') id: string): Promise<ProjectNeed> {
    return await this.adminService.getSingleProjectNeed(id)
  }

  @Get('/dashboard/projectneeds')
  @HttpCode(HttpStatus.OK)
  async getAllProjectNeed(): Promise<ProjectNeed[]> {
    return await this.adminService.getAllProjectNeed()
  }

  @Post('/dashboard/usedproducts')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createUsedProducts(@Body() CreateUsedProductsDto: createUsedProductsDto): Promise<UsedProducts> {
    return await this.adminService.createUsedProducts(CreateUsedProductsDto)
  }

  @Put('/dashboard/usedproducts/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateUsedProducts(@Param('id') id: string, @Body() UpdateUsedProductsDto: updateUsedProductsDto): Promise<UsedProducts> {
    return await this.adminService.updateUsedProducts(id, UpdateUsedProductsDto)
  }

  @Delete('/dashboard/usedproducts/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUsedProducts(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteUsedProducts(id)
  }

  @Get('/dashboard/usedproducts/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleUsedProducts(@Param('id') id: string): Promise<UsedProducts> {
    return this.adminService.getSingleUsedProducts(id)
  }

  @Get('/dashboard/usedproducts')
  @HttpCode(HttpStatus.OK)
  async getAllUsedProducts(): Promise<UsedProducts[]> {
    return this.adminService.getAllUsedProducts()
  }

  @Post('/dashboard/applications')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photo', 10, MulterOptions))
  async createApplication(@Body() CreateApplicationDto: createApplicationDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Application> {
    return await this.adminService.createApplication(CreateApplicationDto, files)
  }
  

}
