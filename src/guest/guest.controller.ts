import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Contact } from 'src/contact/model/contact.schema';
import { Product } from 'src/product/model/product.schema';
import { Project } from 'src/projects/model/project.schema';
import { Subproduct } from 'src/subproduct/model/subproduct.schema';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { WhyOutdorr } from 'src/why-outdorr/model/whyoutdorr.schema';
import { GuestService } from './guest.service';

@Controller('')
export class GuestController {
  constructor(private guestService: GuestService){}

  @Get('/products/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleProduct(@Param('id') id: string): Promise<Product> {
    return await this.guestService.getSingleProduct(id)
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

  @Get('/subproducts/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleSubProduct(@Param('id') id: string): Promise<Subproduct> {
    return await this.guestService.getSingleSubProduct(id)
  }

  @Get('/projects/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleProject(@Param('id') id: string): Promise<Project> {
    return await this.guestService.getSingleProject(id)
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

}

