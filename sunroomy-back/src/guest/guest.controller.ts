import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptionsCloudinary } from '../config/multer/multer';
import { Contact } from '../contact/model/contact.schema';
import { Product } from '../product/model/product.schema';
import { ProjectDesignDetails } from '../project-design-details/model/projectdesigndetails.schema';
import { ProjectDesign } from '../project-design/model/projectdesign.schema';
import { Project } from '../projects/model/project.schema';
import { CreateRequestProjectDto } from '../request-project/dto/requestproject.dto';
import { RequestProject } from '../request-project/model/requestproject.schema';
import { Subproduct } from '../subproduct/model/subproduct.schema';
import { createSubscribeDto } from '../subscribe/dto/subscribe.dto';
import { Subscribe } from '../subscribe/model/subscribe.schema';
import { WhyOutdorr } from '../why-outdorr/model/whyoutdorr.schema';
import { GuestService } from './guest.service';
import { Filter } from './guest.filter';
import { LetUs_Inspire_You } from '../letus-inspire-you/model/letus_inspire_you.schema';
import { aboutUs } from '../about-us/model/about_us.schema';

@Controller('')
export class GuestController {
  constructor(private guestService: GuestService) { }

  @Get('/products/:slug')
  @HttpCode(HttpStatus.OK)
  async getSingleProduct(@Param('slug') slug: string): Promise<Product> {
    return await this.guestService.getSingleProduct(slug)
  }

  @Get('/products')
  @HttpCode(HttpStatus.OK)
  async getAllProduct(): Promise<Product[]> {
    return await this.guestService.getAllProduct()
  }

  @Get('/subproducts')
  @HttpCode(HttpStatus.OK)
  async getAllSubProduct(): Promise<Subproduct[]> {
    return await this.guestService.getAllSubProduct()
  }

  @Get('/subproducts/:slug')
  @HttpCode(HttpStatus.OK)
  async getSingleSubProduct(@Param('slug') slug: string): Promise<Subproduct> {
    return await this.guestService.getSingleSubProduct(slug)
  }

  @Get('/projects/:slug')
  @HttpCode(HttpStatus.OK)
  async getSingleProject(@Param('slug') slug: string): Promise<Project> {
    return await this.guestService.getSingleProject(slug)
  }

  @Get('/projects')
  @HttpCode(HttpStatus.OK)
  async getAllProject(): Promise<Project[]> {
    return await this.guestService.getAllProject()
  }

  @Get('/why-outdorr')
  @HttpCode(HttpStatus.OK)
  async getAllWhyOutdorr(): Promise<WhyOutdorr[]> {
    return await this.guestService.getAllWhyOutdorr()
  }

  @Post('/subscribers')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createSubscribe(@Body() CreateSubscribeDto: createSubscribeDto): Promise<Subscribe> {
    return await this.guestService.createSubscribe(CreateSubscribeDto)
  }

  @Get('/contacts')
  @HttpCode(HttpStatus.OK)
  async getAllContact(): Promise<Contact[]> {
    return await this.guestService.getAllContact()
  }

  @Get('/contacts/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleContact(@Param('id') id: string): Promise<Contact> {
    return await this.guestService.getSingleContact(id)
  }

  @Get('/project-design-details')
  @HttpCode(HttpStatus.OK)
  async getAllProjectDesignDetails(): Promise<ProjectDesignDetails[]> {
    return await this.guestService.getAllProjectDesignDetails()
  }


  @Get('/project-design-details/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleProjectDesignDetails(@Param('id') id: string): Promise<ProjectDesignDetails> {
    return await this.guestService.getSingleProjectDesignDetails(id)
  }

  @Get('/project-design')
  @HttpCode(HttpStatus.OK)
  async getAllProjectDesign(): Promise<ProjectDesign[]> {
    return await this.guestService.getAllProjectDesign()
  }

  @Get('/project-design/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleProjectDesign(@Param('id') id: string): Promise<ProjectDesign> {
    return await this.guestService.getSingleProjectDesign(id)
  }


  @Post('/request-project')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('files', 20, MulterOptionsCloudinary))
  async createRequestProject(@Body() createRequestProjectDto: CreateRequestProjectDto, @UploadedFiles() files: Express.Multer.File[]): Promise<RequestProject> {
    return await this.guestService.createRequestProject(createRequestProjectDto, files)
  }


  @Get('/q')
  @HttpCode(HttpStatus.OK)
  async getAllFilter(@Query() filter:Filter){
    return await this.guestService.getAllFilter(filter)
  }


  @Get('/letUs-inspire-you')
  @HttpCode(HttpStatus.OK)
  async getAllLetUsInspireYou():Promise<LetUs_Inspire_You[]>{
    return this.guestService.getAllLetUsInspireYou()
  }


  @Get('/letUs-inspire-you/:id')
  @HttpCode(HttpStatus.OK)
  async geSingleLetUsInspireYou(@Param('id') id:string):Promise<LetUs_Inspire_You>{
    return this.guestService.geSingleLetUsInspireYou(id)
  }


  
  // get single about us
  @Get('/about-us/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleAboutUs(@Param('id') id:string):Promise<aboutUs>{
    return await this.guestService.getSingleAboutUs(id)
  }


  // get all about us
  @Get('/about-us')
  @HttpCode(HttpStatus.OK)
  async getAllAboutUs():Promise<aboutUs[]>{
    return await this.guestService.getAllAboutUs()
  }

}

