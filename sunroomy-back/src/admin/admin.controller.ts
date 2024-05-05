import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createAboutOutdorrDto, updateAboutOutdorrDto } from '../about-outdorr/dto/aboutoutdorr.dto';
import { AboutOutdorr } from '../about-outdorr/model/aboutoutdorr.schema';
import { CreateAboutUsDto, UpdateAboutUsDto } from '../about-us/dto/about_us.dto';
import { aboutUs } from '../about-us/model/about_us.schema';
import { createApplicationDto, updateApplicationDto } from '../applications/dto/application.dto';
import { Application } from '../applications/model/application.schema';
import { MulterOptionsCloudinary } from '../config/multer/multer';
import { createContactDto, updateContactDto } from '../contact/dto/contact.dto';
import { Contact } from '../contact/model/contact.schema';
import { createFeatureDto, updateFeatureDto } from '../features/dto/feature.dto';
import { Feature } from '../features/model/feature.schema';
import { createFollowUsDto, updateFollowUsDto } from '../follow_us/dto/followus.dto';
import { FollowUs } from '../follow_us/model/followus.schema';
import { CreateHomepageHeroDto, UpdateHomepageHeroDto } from '../homepage_hero/dto/homepage_hero.dto';
import { HomepageHero } from '../homepage_hero/model/homepage_hero.schema';
import { createHomeAboutUsDto, updateHomeAboutUsDto } from '../home_about_us/dto/home_about_us.dto';
import { HomeAboutUs } from '../home_about_us/model/home_about_us.schema';
import { LetUs_Inspire_You_Dto } from '../letus-inspire-you/dto/letus_inspire_you.dto';
import { LetUs_Inspire_You } from '../letus-inspire-you/model/letus_inspire_you.schema';
import { createProjectNeedDto, updateProjectNeedDto } from '../needs/dto/need.dto';
import { ProjectNeed } from '../needs/model/need.schema';
import { createProductDto, updateProductDto } from '../product/dto/product.dto';
import { Product } from '../product/model/product.schema';
import { CreateProjectDesignDetailsDto, UpdateProjectDesignDetailsDto } from '../project-design-details/dto/projectdesigndetails.dto';
import { ProjectDesignDetails } from '../project-design-details/model/projectdesigndetails.schema';
import { CreateProjectDesignDto, UpdateProjectDesignDto } from '../project-design/dto/projectdesign.dto';
import { ProjectDesign } from '../project-design/model/projectdesign.schema';
import { createProjectDto, updateProjectDto } from '../projects/dto/project.dto';
import { Project } from '../projects/model/project.schema';
import { RequestProject } from '../request-project/model/requestproject.schema';
import { RequestQuoteDto } from '../request_quote/dto/request_quote.dto';
import { RequestQuote } from '../request_quote/model/request_quote.schema';
import { createSpecificationDto, updateSpecificationDto } from '../specifications/dto/specification.dto';
import { Specification } from '../specifications/model/specification.schema';
import { CreateSubproductCustomItemDto, UpdateSubproductCustomItemDto } from '../subproduct-customItem/dto/subproduct_customItem.dto';
import { subproductCustomItem } from '../subproduct-customItem/model/subproduct_customItem.schema';
import { CreateSubproductPlacementItemDto, UpdateSubproductPlacementItemDto } from '../subproduct-placementItem/dto/subproduct_placementItem.dto';
import { subproductPlacementItem } from '../subproduct-placementItem/model/subproduct_placementItem.schema';
import { createSubProductDto, updateSubProductDto } from '../subproduct/dto/subproduct.dto';
import { Subproduct } from '../subproduct/model/subproduct.schema';
import { createSubproductCustomDto, updateSubproductCustomDto } from '../subproduct_custom/dto/subproduct_custom.dto';
import { subproductCustom } from '../subproduct_custom/model/subproduct_custom.schema';
import { createSubproductPlacementDto, updateSubproductPlacementDto } from '../subproduct_placement/dto/subproduct_placement.dto';
import { subproductPlacement } from '../subproduct_placement/model/subproduct_placement.schema';
import { sendEmailText } from '../subscribe/dto/subscribe.dto';
import { Subscribe } from '../subscribe/model/subscribe.schema';
import { createUsedProductsDto, updateUsedProductsDto } from '../used-products/dto/usedproduct.dto';
import { UsedProducts } from '../used-products/model/usedproduct.schema';
import { updateWhyOutdorrDto } from '../why-outdorr/dto/whyoutdorr.dto';
import { WhyOutdorr } from '../why-outdorr/model/whyoutdorr.schema';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('/dashboard/features')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('icon', MulterOptionsCloudinary))
  async createFeature(@Body() CreateFeatureDto: createFeatureDto, @UploadedFile() file: Express.Multer.File): Promise<Feature> {
    return await this.adminService.createFeature(CreateFeatureDto, file);
  }

  @Patch('/dashboard/features/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('icon', MulterOptionsCloudinary))
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

  @Patch('/dashboard/projectneeds/:id')
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

  @Patch('/dashboard/usedproducts/:id')
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

  @Patch('/dashboard/applications/:id')
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

  @Patch('/dashboard/projects/:id')
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

  @Get('/dashboard/projects/:slug')
  @HttpCode(HttpStatus.OK)
  async getSingleProject(@Param('slug') slug: string): Promise<Project> {
    return await this.adminService.getSingleProject(slug)
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

  @Patch('/dashboard/specifications/:id')
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
  @UseInterceptors(FileFieldsInterceptor([{ name: 'cover_photo', maxCount: 1 }, { name: 'photos', maxCount: 10 }], MulterOptionsCloudinary))
  async createSubProduct(@Body() CreateSubproductDto: createSubProductDto, @UploadedFiles() files: { cover_photo: Express.Multer.File[], photos: Express.Multer.File[] }): Promise<Subproduct> {
    return await this.adminService.createSubProduct(CreateSubproductDto, files)
  }

  @Patch('/dashboard/subproducts/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'cover_photo', maxCount: 1 }, { name: 'photos', maxCount: 10 }], MulterOptionsCloudinary))
  async updateSubProduct(@Param('id') id: string, @Body() UpdateSubproductDto: updateSubProductDto, @UploadedFiles() files: { cover_photo: Express.Multer.File[], photos: Express.Multer.File[] }): Promise<Subproduct> {
    return await this.adminService.updateSubProduct(id, UpdateSubproductDto, files)
  }

  @Delete('/dashboard/subproducts/:id')
  @HttpCode(HttpStatus.OK)
  async deleteSubProduct(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteSubProduct(id)
  }

  @Get('/dashboard/subproducts/:slug')
  @HttpCode(HttpStatus.OK)
  async getSingleSubProduct(@Param('slug') slug: string): Promise<Subproduct> {
    return await this.adminService.getSingleSubProduct(slug)
  }

  @Get('/dashboard/subproducts')
  @HttpCode(HttpStatus.OK)
  async getAllSubProduct(): Promise<Subproduct[]> {
    return await this.adminService.getAllSubProduct()
  }

  @Post('/dashboard/products')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }, { name: 'cover_photo', maxCount: 1 }], MulterOptionsCloudinary))
  async createProduct(@Body() CreateProductDto: createProductDto, @UploadedFiles() file: { cover_photo: Express.Multer.File, photo: Express.Multer.File }): Promise<Product> {
    return await this.adminService.createProduct(CreateProductDto, file)
  }

  @Patch('/dashboard/products/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }, { name: 'cover_photo', maxCount: 1 }], MulterOptionsCloudinary))
  async updateProduct(@Param('id') id: string, @Body() UpdateProductDto: updateProductDto, @UploadedFiles() file: { cover_photo: Express.Multer.File, photo: Express.Multer.File }): Promise<Product> {
    return await this.adminService.updateProduct(id, UpdateProductDto, file)
  }

  @Delete('/dashboard/products/:id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: string) {
    return await this.adminService.deleteProduct(id)
  }

  @Get('/dashboard/products/:slug')
  @HttpCode(HttpStatus.OK)
  async getSingleProduct(@Param('slug') slug: string): Promise<Product> {
    return await this.adminService.getSingleProduct(slug)
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

  @Patch('/dashboard/contacts/:id')
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

  // @Post('/dashboard/why-outdorr')
  // @HttpCode(HttpStatus.CREATED)
  // @UsePipes(new ValidationPipe())
  // async createWhyOutdorr(@Body() CreateWhyOutdorrDto: createWhyOutdorrDto): Promise<WhyOutdorr> {
  //   return await this.adminService.createWhyOutdorr(CreateWhyOutdorrDto)
  // }

  @Patch('/dashboard/why-outdorr/:id')
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

  @Patch('/dashboard/about-outdorr/:id')
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

  @Post('/dashboard/project-design')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createProjectDesign(@Body() createProjectDesignDto: CreateProjectDesignDto): Promise<ProjectDesign> {
    return await this.adminService.createProjectDesign(createProjectDesignDto)
  }

  @Patch('/dashboard/project-design/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateProjectDesign(@Param('id') id: string, @Body() updateProjectDesignDto: UpdateProjectDesignDto): Promise<ProjectDesign> {
    return await this.adminService.updateProjectDesign(id, updateProjectDesignDto)
  }

  @Delete('/dashboard/project-design/:id')
  @HttpCode(HttpStatus.OK)
  async deleteProjectDesign(@Param('id') id: string) {
    return await this.adminService.deleteProjectDesign(id)
  }

  @Get('/dashboard/project-design')
  @HttpCode(HttpStatus.OK)
  async getAllProjectDesign(): Promise<ProjectDesign[]> {
    return await this.adminService.getAllProjectDesign()
  }

  @Get('/dashboard/project-design/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleProjectDesign(@Param('id') id: string): Promise<ProjectDesign> {
    return await this.adminService.getSingleProjectDesign(id)
  }

  @Post('/dashboard/project-design-details')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async createProjectDesignDetails(@Body() createProjectDesignDetailsDto: CreateProjectDesignDetailsDto, @UploadedFile() file: Express.Multer.File): Promise<ProjectDesignDetails> {
    return await this.adminService.createProjectDesignDetails(createProjectDesignDetailsDto, file)
  }


  @Patch('/dashboard/project-design-details/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async updateProjectDesignDetails(@Param('id') id: string, @Body() updateProjectDesignDetailsDto: UpdateProjectDesignDetailsDto, @UploadedFile() file: Express.Multer.File): Promise<ProjectDesignDetails> {
    return await this.adminService.updateProjectDesignDetails(id, updateProjectDesignDetailsDto, file)
  }


  @Delete('/dashboard/project-design-details/:id')
  @HttpCode(HttpStatus.OK)
  async deleteProjectDesignDetails(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteProjectDesignDetails(id)
  }


  @Get('/dashboard/project-design-details')
  @HttpCode(HttpStatus.OK)
  async getAllProjectDesignDetails(): Promise<ProjectDesignDetails[]> {
    return await this.adminService.getAllProjectDesignDetails()
  }


  @Get('/dashboard/project-design-details/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleProjectDesignDetails(@Param('id') id: string): Promise<ProjectDesignDetails> {
    return await this.adminService.getSingleProjectDesignDetails(id)
  }


  @Get('/dashboard/request-project')
  @HttpCode(HttpStatus.OK)
  async getAllRequestProject(): Promise<RequestProject[]> {
    return await this.adminService.getAllRequestProject()
  }


  @Get('/dashboard/request-project/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleRequestProject(@Param('id') id: string): Promise<RequestProject> {
    return await this.adminService.getSingleRequestProject(id)
  }


  @Post('/dashboard/letUs-inspire-you')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptionsCloudinary))
  @UsePipes(new ValidationPipe())
  async createLetUsInspireYou(@Body() letUs_Inspire_You_Dto: LetUs_Inspire_You_Dto, @UploadedFiles() files: Express.Multer.File[]): Promise<LetUs_Inspire_You> {
    return await this.adminService.createLetUsInspireYou(letUs_Inspire_You_Dto, files)
  }


  @Patch('/dashboard/letUs-inspire-you/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptionsCloudinary))
  @UsePipes(new ValidationPipe())
  async updateLetUsInspireYou(@Param('id') id: string, @Body() letUs_Inspire_You_Dto: LetUs_Inspire_You_Dto, @UploadedFiles() files: Express.Multer.File[]): Promise<LetUs_Inspire_You> {
    return await this.adminService.updateLetUsInspireYou(id, letUs_Inspire_You_Dto, files)
  }


  @Delete('/dashboard/letUs-inspire-you/:id')
  @HttpCode(HttpStatus.OK)
  async deleteLetUsInspireYou(@Param('id') id: string) {
    return await this.adminService.deleteLetUsInspireYou(id)
  }


  @Get('/dashboard/letUs-inspire-you')
  @HttpCode(HttpStatus.OK)
  async getAllLetUsInspireYou(): Promise<LetUs_Inspire_You[]> {
    return this.adminService.getAllLetUsInspireYou()
  }


  @Get('/dashboard/letUs-inspire-you/:id')
  @HttpCode(HttpStatus.OK)
  async geSingleLetUsInspireYou(@Param('id') id: string): Promise<LetUs_Inspire_You> {
    return this.adminService.geSingleLetUsInspireYou(id)
  }


  // create about us
  @Post('/dashboard/about-us')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createAboutUs(@Body() createAboutUsDto: CreateAboutUsDto): Promise<aboutUs> {
    return await this.adminService.createAboutUs(createAboutUsDto)
  }


  // update about us
  @Patch('/dashboard/about-us/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateAboutUs(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto): Promise<aboutUs> {
    return await this.adminService.updateAboutUs(id, updateAboutUsDto)
  }


  // delete about
  @Delete('/dashboard/about-us/:id')
  @HttpCode(HttpStatus.OK)
  async deleteAboutUs(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteAboutUs(id)
  }


  // get single about us
  @Get('/dashboard/about-us/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleAboutUs(@Param('id') id: string): Promise<aboutUs> {
    return await this.adminService.getSingleAboutUs(id)
  }


  // get all about us
  @Get('/dashboard/about-us')
  @HttpCode(HttpStatus.OK)
  async getAllAboutUs(): Promise<aboutUs[]> {
    return await this.adminService.getAllAboutUs()
  }


  // create home about us
  @Post('/dashboard/home_about_us')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createHomeAboutUs(@Body() CreateHomeAboutUsDto: createHomeAboutUsDto): Promise<HomeAboutUs> {
    return await this.adminService.createHomeAboutUs(CreateHomeAboutUsDto)
  }

  // update home about us
  @Patch('/dashboard/home_about_us/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateHomeAboutUs(@Param('id') id: string, @Body() UpdateHomeAboutUsDto: updateHomeAboutUsDto): Promise<HomeAboutUs> {
    return await this.adminService.updateHomeAboutUs(id, UpdateHomeAboutUsDto)
  }

  // delete home about us
  @Delete('/dashboard/home_about_us/:id')
  @HttpCode(HttpStatus.OK)
  async deleteHomeAboutUs(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteHomeAboutUs(id)
  }


  // get single home about us
  @Get('/dashboard/home_about_us/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleHomeAboutUs(@Param('id') id: string): Promise<HomeAboutUs> {
    return await this.adminService.getSingleHomeAboutUs(id)
  }

  // get all home about us
  @Get('/dashboard/home_about_us')
  @HttpCode(HttpStatus.OK)
  async getAllHomeAboutUs(): Promise<HomeAboutUs[]> {
    return await this.adminService.getAllhomeAboutUs()
  }


  // create Homepage Hero
  @Post('/dashboard/homepage_hero')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async createHomepageHero(@Body() createHomepageHeroDto: CreateHomepageHeroDto, @UploadedFile() photo: Express.Multer.File): Promise<HomepageHero> {
    return await this.adminService.createHomepageHero(createHomepageHeroDto, photo)
  }

  // update Homepage Hero
  @Patch('/dashboard/homepage_hero/:_id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async updateHomepageHero(@Param('_id') _id: string, @Body() updateHomepageHeroDto: UpdateHomepageHeroDto, @UploadedFile() photo: Express.Multer.File): Promise<HomepageHero> {
    return await this.adminService.updateHomepageHero(_id, updateHomepageHeroDto, photo)
  }

  // delete homepage hero
  @Delete('/dashboard/homepage_hero/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteHomepageHero(@Param('_id') _id: string): Promise<string> {
    return await this.adminService.deleteHomepageHero(_id)
  }


  // get single homepage hero
  @Get('/dashboard/homepage_hero/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleHomepageHero(@Param('_id') _id: string): Promise<HomepageHero> {
    return await this.adminService.getSingleHomepageHero(_id)
  }


  // get all home page hero
  @Get('/dashboard/homepage_hero')
  @HttpCode(HttpStatus.OK)
  async getAllHomepageHero(): Promise<HomepageHero[]> {
    return await this.adminService.getAllHomepageHero()
  }


  // create follow us
  @Post('/dashboard/followUs')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createFollowUs(@Body() CreateFollowUsDto: createFollowUsDto): Promise<FollowUs> {
    return await this.adminService.createFollowUs(CreateFollowUsDto)
  }


  // update follow us
  @Patch('/dashboard/followUs/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateFollowUs(@Param('id') id: string, @Body() UpdateFollowUsDto: updateFollowUsDto): Promise<FollowUs> {
    return await this.adminService.updateFollowUs(id, UpdateFollowUsDto)
  }


  // delete follow us
  @Delete('/dashboard/followUs/:id')
  @HttpCode(HttpStatus.OK)
  async deleteFollowUs(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteFollowUs(id)
  }


  // get follow us single
  @Get('/dashboard/followUs/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleFolowUs(@Param('id') id: string): Promise<FollowUs> {
    return await this.adminService.getSingleFolowUs(id)
  }


  @Get('/dashboard/followUs')
  @HttpCode(HttpStatus.OK)
  async getAllFolowUs(): Promise<FollowUs[]> {
    return await this.adminService.getAllFollowUs()
  }


  // create subproduct custom
  @Post('/dashboard/subproduct-custom')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createSubproductCustom(@Body() CreatesubproductCustomDto: createSubproductCustomDto): Promise<subproductCustom> {
    return await this.adminService.createSubproductCustom(CreatesubproductCustomDto)
  }

  // update subproduct custom
  @Patch('/dashboard/subproduct-custom/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateSubproductCustom(@Param('id') id: string, @Body() UpdatesubproductCustomDto: updateSubproductCustomDto): Promise<subproductCustom> {
    return await this.adminService.updateSubproductCustom(id, UpdatesubproductCustomDto)
  }

  // delete subproduct custom
  @Delete('/dashboard/subproduct-custom/:id')
  @HttpCode(HttpStatus.OK)
  async deleteSubproductCustom(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteSubproductCustom(id)
  }


  // get single subproduct custom
  @Get('/dashboard/subproduct-custom/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleSubproductCustom(@Param('id') id: string): Promise<subproductCustom> {
    return await this.adminService.getSingleSubproductCustom(id)
  }


  // get all subproduct custom
  @Get('/dashboard/subproduct-custom')
  @HttpCode(HttpStatus.OK)
  async getAllSubproductCustom(): Promise<subproductCustom[]> {
    return await this.adminService.getAllSubproductCustom()
  }


  // create subproduct custom item
  @Post('/dashboard/subproduct-customItem')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async createSubproductCustomItem(@Body() createSubproductCustomItemDto: CreateSubproductCustomItemDto, @UploadedFile() photo: Express.Multer.File): Promise<string> {
    return await this.adminService.createSubproductCustomItem(createSubproductCustomItemDto, photo)
  }


  // update subproduct custom item
  @Patch('/dashboard/subproduct-customItem/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async updateSubproductCustomItem(@Param('id') id: string, @Body() updateSubproductCustomItemDto: UpdateSubproductCustomItemDto, @UploadedFile() photo: Express.Multer.File): Promise<string> {
    return await this.adminService.updateSubproductCustomItem(id, updateSubproductCustomItemDto, photo)
  }


  // delete subproduct custom item
  @Delete('/dashboard/subproduct-customItem/:id')
  @HttpCode(HttpStatus.OK)
  async deleteSubproductCustomItem(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteSubproductCustomItem(id)
  }


  // get single subproduct custom item
  @Get('/dashboard/subproduct-customItem/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleSubproductCustomItem(@Param('id') id: string): Promise<subproductCustomItem> {
    return await this.adminService.getSingleSubproductCustomItem(id)
  }


  // get all subproduct custom item
  @Get('/dashboard/subproduct-customItem')
  @HttpCode(HttpStatus.OK)
  async getAllSubproductCustomItem(): Promise<subproductCustomItem[]> {
    return await this.adminService.getAllSubproductCustomItem()
  }


  // create subproduct placement
  @Post('/dashboard/subproduct-placement')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createSubproductPlacement(@Body() CreatesubproductPlacementDto: createSubproductPlacementDto): Promise<subproductPlacement> {
    return await this.adminService.createSubproductPlacement(CreatesubproductPlacementDto)
  }

  // update subproduct placement
  @Patch('/dashboard/subproduct-placement/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateSubproductPlacement(@Param('id') id: string, @Body() UpdatesubproductPlacementDto: updateSubproductPlacementDto): Promise<subproductPlacement> {
    return await this.adminService.updateSubproductPlacement(id, UpdatesubproductPlacementDto)
  }

  // delete subproduct placement
  @Delete('/dashboard/subproduct-placement/:id')
  @HttpCode(HttpStatus.OK)
  async deleteSubproductPlacement(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteSubproductPlacement(id)
  }


  // get single subproduct Placement
  @Get('/dashboard/subproduct-placement/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleSubproductPlacement(@Param('id') id: string): Promise<subproductPlacement> {
    return await this.adminService.getSingleSubproductPlacement(id)
  }


  // get all subproduct placement
  @Get('/dashboard/subproduct-placement')
  @HttpCode(HttpStatus.OK)
  async getAllSubproductPlacement(): Promise<subproductPlacement[]> {
    return await this.adminService.getAllSubproductPlacement()
  }


  // create subproduct placement item
  @Post('/dashboard/subproduct-placementItem')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async createSubproductPlacementItem(@Body() createSubproductPlacementItemDto: CreateSubproductPlacementItemDto, @UploadedFile() photo: Express.Multer.File): Promise<string> {
    return await this.adminService.createSubproductPlacementItem(createSubproductPlacementItemDto, photo)
  }


  // update subproduct placement item
  @Patch('/dashboard/subproduct-placementItem/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptionsCloudinary))
  async updateSubproductPlacementItem(@Param('id') id: string, @Body() updateSubproductPlacementItemDto: UpdateSubproductPlacementItemDto, @UploadedFile() photo: Express.Multer.File): Promise<string> {
    return await this.adminService.updateSubproductPlacementItem(id, updateSubproductPlacementItemDto, photo)
  }


  // delete subproduct placement item
  @Delete('/dashboard/subproduct-placementItem/:id')
  @HttpCode(HttpStatus.OK)
  async deleteSubproductPlacementItem(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteSubproductPlacementItem(id)
  }


  // get single subproduct placement item
  @Get('/dashboard/subproduct-placementItem/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleSubproductPlacementItem(@Param('id') id: string): Promise<subproductPlacementItem> {
    return await this.adminService.getSingleSubproductPlacementItem(id)
  }


  // get all subproduct placement item
  @Get('/dashboard/subproduct-placementItem')
  @HttpCode(HttpStatus.OK)
  async getAllSubproductPlacementItem(): Promise<subproductPlacementItem[]> {
    return await this.adminService.getAllSubproductPlacementItem()
  }


  // create request quote 
  @Post('/dashboard/request-quote')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('cover_photo', MulterOptionsCloudinary))
  async createRequestQuote(@Body() requestQuoteDto: RequestQuoteDto, @UploadedFile() file: Express.Multer.File): Promise<RequestQuote> {
    return await this.adminService.createRequestQuote(requestQuoteDto, file)
  }


  // update request quote 
  @Patch('/dashboard/request-qoute/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('cover_photo', MulterOptionsCloudinary))
  async updateRequestQuote(@Param('id') id: string, @Body() requestQuoteDto: RequestQuoteDto, @UploadedFile() file: Express.Multer.File): Promise<RequestQuote> {
    return await this.adminService.updateRequestQuote(id, requestQuoteDto, file)
  }


  // delete request quote 
  @Delete('/dashboard/request-quote/:id')
  @HttpCode(HttpStatus.OK)
  async deleteRequestQuote(@Param('id') id: string): Promise<string> {
    return await this.adminService.deleteRequestQuote(id)
  }


  // get All request quote 
  @Get('/dashboard/request-qoute')
  @HttpCode(HttpStatus.OK)
  async getAllRequestQuote(): Promise<RequestQuote[]> {
    return await this.adminService.getAllRequestQuote()
  }


  // get single request quote 
  @Get('/dashboard/request-qoute/:id')
  @HttpCode(HttpStatus.OK)
  async geSingleRequestQuote(@Param('id') id: string): Promise<RequestQuote> {
    return await this.adminService.getSingleRequestQuote(id)
  }


}