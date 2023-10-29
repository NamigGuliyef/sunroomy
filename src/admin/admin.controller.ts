import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createAboutOutdorrDto, updateAboutOutdorrDto } from 'src/about-outdorr/dto/aboutoutdorr.dto';
import { AboutOutdorr } from 'src/about-outdorr/model/aboutoutdorr.schema';
import { createApplicationDto, updateApplicationDto } from 'src/applications/dto/application.dto';
import { Application } from 'src/applications/model/application.schema';
import { MulterOptions, MulterOptionsCloudinary } from 'src/config/multer/multer';
import { createContactDto, updateContactDto } from 'src/contact/dto/contact.dto';
import { Contact } from 'src/contact/model/contact.schema';
import { createFeatureDto, updateFeatureDto } from 'src/features/dto/feature.dto';
import { Feature } from 'src/features/model/feature.schema';
import { createProjectNeedDto, updateProjectNeedDto } from 'src/needs/dto/need.dto';
import { ProjectNeed } from 'src/needs/model/need.schema';
import { createProductDto, updateProductDto } from 'src/product/dto/product.dto';
import { Product } from 'src/product/model/product.schema';
import { createProjectDto, updateProjectDto } from 'src/projects/dto/project.dto';
import { Project } from 'src/projects/model/project.schema';
import { createSpecificationDto, updateSpecificationDto } from 'src/specifications/dto/specification.dto';
import { Specification } from 'src/specifications/model/specification.schema';
import { createSubProductDto, updateSubProductDto } from 'src/subproduct/dto/subproduct.dto';
import { Subproduct } from 'src/subproduct/model/subproduct.schema';
import { sendEmailText } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { createUsedProductsDto, updateUsedProductsDto } from 'src/used-products/dto/usedproduct.dto';
import { UsedProducts } from 'src/used-products/model/usedProduct.schema';
import { createWhyOutdorrDto, updateWhyOutdorrDto } from 'src/why-outdorr/dto/whyoutdorr.dto';
import { WhyOutdorr } from 'src/why-outdorr/model/whyoutdorr.schema';
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
  @UseInterceptors(FilesInterceptor('photos', 5, MulterOptionsCloudinary))
  async createUsedProducts(@Body() CreateUsedProductsDto: createUsedProductsDto, @UploadedFiles() files: Express.Multer.File[]): Promise<UsedProducts> {
    return await this.adminService.createUsedProducts(CreateUsedProductsDto, files)
  }

  @Put('/dashboard/usedproducts/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos', 5, MulterOptionsCloudinary))
  async updateUsedProducts(@Param('id') id: string, @Body() UpdateUsedProductsDto: updateUsedProductsDto, @UploadedFiles() files: Express.Multer.File[]): Promise<UsedProducts> {
    return await this.adminService.updateUsedProducts(id, UpdateUsedProductsDto, files)
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
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptionsCloudinary))
  async createApplication(@Body() CreateApplicationDto: createApplicationDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Application> {
    return await this.adminService.createApplication(CreateApplicationDto, files)
  }

  @Put('/dashboard/applications/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptionsCloudinary))
  async updateApplication(@Param('id') id: string, @Body() UpdateApplicationDto: updateApplicationDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Application> {
    return await this.adminService.updateApplication(id, UpdateApplicationDto, files)
  }

  @Delete('/dashboard/applications/:id')
  @HttpCode(HttpStatus.OK)
  async deleteApplication(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteApplication(id)
  }

  @Get('/dashboard/applications/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleApplication(@Param('id') id: string): Promise<Application> {
    return await this.adminService.getSingleApplication(id)
  }

  @Get('dashboard/applications')
  @HttpCode(HttpStatus.OK)
  async getAllApplication(): Promise<Application[]> {
    return await this.adminService.getAllApplication()
  }

  @Post('/dashboard/projects')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptionsCloudinary))
  async createProject(@Body() CreateProjectDto: createProjectDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Project> {
    return await this.adminService.createProject(CreateProjectDto, files)
  }

  @Put('/dashboard/projects/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptionsCloudinary))
  async updateProject(@Param('id') id: string, @Body() UpdateProjectDto: updateProjectDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Project> {
    return await this.adminService.updateProject(id, UpdateProjectDto, files)
  }

  // @Delete('/dashboard/projects/:id')
  // @HttpCode(HttpStatus.OK)
  // async deleteProject(@Param('id') id: string): Promise<string> {
  //   return await this.adminService.deleteProject(id)
  // }

  @Get('/dashboard/projects/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleProject(@Param('id') id: string): Promise<Project> {
    return await this.adminService.getSingleProject(id)
  }

  @Get('/dashboard/projects')
  @HttpCode(HttpStatus.OK)
  async getAllProject(): Promise<Project[]> {
    return await this.adminService.getAllProject()
  }

  @Post('/dashboard/specifications')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createSpecification(@Body() CreateSpecificationDto: createSpecificationDto): Promise<Specification> {
    return await this.adminService.createSpecification(CreateSpecificationDto)
  }

  @Put('/dashboard/specifications/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateSpecification(@Param('id') id: string, @Body() UpdateSpecificationDto: updateSpecificationDto): Promise<Specification> {
    return await this.adminService.updateSpecification(id, UpdateSpecificationDto)
  }

  @Delete('/dashboard/specifications/:id')
  @HttpCode(HttpStatus.OK)
  async deleteSpecification(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteSpecification(id)
  }

  @Get('/dashboard/specifications/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleSpecification(@Param('id') id: string): Promise<Specification> {
    return await this.adminService.getSingleSpecification(id)
  }

  @Get('/dashboard/specifications')
  @HttpCode(HttpStatus.OK)
  async getAllSpecification(): Promise<Specification[]> {
    return await this.adminService.getAllSpecification()
  }

  @Post('/dashboard/subproducts')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptionsCloudinary))
  async createSubProduct(@Body() CreateSubproductDto: createSubProductDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Subproduct> {
    return await this.adminService.createSubProduct(CreateSubproductDto, files)
  }

  @Put('/dashboard/subproducts/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptionsCloudinary))
  async updateSubProduct(@Param('id') id: string, @Body() UpdateSubproductDto: updateSubProductDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Subproduct> {
    return await this.adminService.updateSubProduct(id, UpdateSubproductDto, files)
  }

  @Delete('/dashboard/subproducts/:id')
  @HttpCode(HttpStatus.OK)
  async deleteSubProduct(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteSubProduct(id)
  }

  @Get('/dashboard/subproducts/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleSubProduct(@Param('id') id: string): Promise<Subproduct> {
    return await this.adminService.getSingleSubProduct(id)
  }

  @Get('/dashboard/subproducts')
  @HttpCode(HttpStatus.OK)
  async getAllSubProduct(): Promise<Subproduct[]> {
    return await this.adminService.getAllSubProduct()
  }

  @Post('/dashboard/products')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async createProduct(@Body() CreateProductDto: createProductDto, @UploadedFile() file: Express.Multer.File): Promise<Product> {
    return await this.adminService.createProduct(CreateProductDto, file)
  }

  @Put('/dashboard/products/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async updateProduct(@Param('id') id: string, @Body() UpdateProductDto: updateProductDto, @UploadedFile() file: Express.Multer.File): Promise<Product> {
    return await this.adminService.updateProduct(id, UpdateProductDto, file)
  }

  @Delete('/dashboard/products/:id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: string) {
    return await this.adminService.deleteProduct(id)
  }

  @Get('/dashboard/products/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleProduct(@Param('id') id: string): Promise<Product> {
    return await this.adminService.getSingleProduct(id)
  }

  @Get('/dashboard/products')
  @HttpCode(HttpStatus.OK)
  async getAllProduct(): Promise<Product[]> {
    return await this.adminService.getAllProduct()
  }

  @Post('/dashboard/contacts')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createContact(@Body() CreateContactDto: createContactDto): Promise<Contact> {
    return await this.adminService.createContact(CreateContactDto)
  }

  @Put('/dashboard/contacts/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateContact(@Param('id') id: string, @Body() UpdateContactDto: updateContactDto): Promise<Contact> {
    return await this.adminService.updateContact(id, UpdateContactDto)
  }

  @Delete('/dashboard/contacts/:id')
  @HttpCode(HttpStatus.OK)
  async deleteContact(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteContact(id)
  }

  @Get('/dashboard/contacts/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleContact(@Param('id') id: string): Promise<Contact> {
    return await this.adminService.getSingleContact(id)
  }

  @Get('/dashboard/contacts')
  @HttpCode(HttpStatus.OK)
  async getAllContact(): Promise<Contact[]> {
    return await this.adminService.getAllContact()
  }

  @Get('/dashboard/subscribers')
  @HttpCode(HttpStatus.OK)
  async getAllSubscribe(): Promise<Subscribe[]> {
    return await this.adminService.getAllSubscribe()
  }

  @Post('/dashboard/subscribers/sendEmail')
  @HttpCode(HttpStatus.CREATED)
  async sendEmail(@Body() text: sendEmailText): Promise<string> {
    return await this.adminService.sendEmail(text)
  }

  @Post('/dashboard/why-outdorr')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createWhyOutdorr(@Body() CreateWhyOutdorrDto: createWhyOutdorrDto): Promise<WhyOutdorr> {
    return await this.adminService.createWhyOutdorr(CreateWhyOutdorrDto)
  }

  @Put('/dashboard/why-outdorr/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateWhyOutdorr(@Param('id') id: string, @Body() UpdateWhyOutdorrDto: updateWhyOutdorrDto): Promise<WhyOutdorr> {
    return await this.adminService.updateWhyOutdorr(id, UpdateWhyOutdorrDto)
  }

  // @Delete('/dashboard/why-outdorr/:id')
  // @HttpCode(HttpStatus.OK)
  // async deleteWhyOutdorr(@Param('id') id: string): Promise<string> {
  //   return await this.adminService.deleteWhyOutdorr(id)
  // }

  @Get('/dashboard/why-outdorr/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleWhyOutdorr(@Param('id') id: string): Promise<WhyOutdorr> {
    return await this.adminService.getSingleWhyOutdorr(id)
  }

  @Get('/dashboard/why-outdorr')
  @HttpCode(HttpStatus.OK)
  async getAllWhyOutdorr(): Promise<WhyOutdorr[]> {
    return await this.adminService.getAllWhyOutdorr()
  }

  @Post('/dashboard/about-outdorr')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createAboutOutdorr(@Body() CreateAboutOutdorrDto: createAboutOutdorrDto): Promise<AboutOutdorr> {
    return await this.adminService.createAboutOutdorr(CreateAboutOutdorrDto)
  }

  @Put('/dashboard/about-outdorr/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateAboutOutdorr(@Param('id') id: string, @Body() UpdateAboutOutdorrDto: updateAboutOutdorrDto): Promise<AboutOutdorr> {
    return await this.adminService.updateAboutOutdorr(id, UpdateAboutOutdorrDto)
  }

  @Delete('/dashboard/about-outdorr/:id')
  @HttpCode(HttpStatus.OK)
  async deleteAboutOutdorr(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteAboutOutdorr(id)
  }

  @Get('/dashboard/about-outdorr/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleAboutOutdorr(@Param('id') id: string): Promise<AboutOutdorr> {
    return await this.adminService.getSingleAboutOutdorr(id)
  }

  @Get('/dashboard/about-outdorr')
  @HttpCode(HttpStatus.OK)
  async getAllAboutOutdorr(): Promise<AboutOutdorr[]> {
    return await this.adminService.getAllAboutOutdorr()
  }

}


