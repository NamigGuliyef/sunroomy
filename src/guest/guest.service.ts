import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/contact/model/contact.schema';
import { Product } from 'src/product/model/product.schema';
import { Project } from 'src/projects/model/project.schema';
import { Subproduct } from 'src/subproduct/model/subproduct.schema';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { WhyOutdorr } from 'src/why-outdorr/model/whyoutdorr.schema';

@Injectable()
export class GuestService {
  constructor(@InjectModel('whyoutdorr') private whyOutdorrModel: Model<WhyOutdorr>,
    @InjectModel('subscribe') private subscribeModel: Model<Subscribe>,
    @InjectModel('product') private productModel: Model<Product>,
    @InjectModel('subproduct') private subProductModel: Model<Subproduct>,
    @InjectModel('project') private projectModel: Model<Project>,
    @InjectModel('contact') private contactModel: Model<Contact>
  ) { }

  // get all product - test edildi
  async getAllProduct(): Promise<Product[]> {
    return await this.productModel.find().populate({ path: 'subProductIds', select: ['title', 'description', 'photos'] })
  }

  // get single product - test edildi
  async getSingleProduct(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({slug}).populate({ path: 'subProductIds', select: ['title', 'description', 'photos'] })
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }
    return product
  }

  // get all sub product - test edildi
  async getAllSubProduct(): Promise<Subproduct[]> {
    return await this.subProductModel.find().populate([{ path: 'featuresIds' }, { path: 'specifications' }])
  }

  // get single sub product - test edildi
  async getSingleSubProduct(id: string): Promise<Subproduct> {
    const subProductExist = await this.subProductModel.findById(id).populate([{ path: 'featuresIds' }, { path: 'specifications' }])
    if (!subProductExist) {
      throw new HttpException('Sub product not found', HttpStatus.NOT_FOUND)
    }
    return subProductExist
  }

  // get all project - test edildi
  async getAllProject(): Promise<Project[]> {
    return await this.projectModel.find().populate([
      { path: 'featuresId' }, { path: 'needsId' }, { path: 'usedProductsId' }
    ])
  }

  // get single project - test edildi
  async getSingleProject(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).populate([
      { path: 'featuresId' }, { path: 'needsId' }, { path: 'usedProductsId' }
    ])
    if (!project) {
      throw new HttpException('The project you are looking for has not been found', HttpStatus.NOT_FOUND)
    }
    return project
  }

  // get all why-outdorr  - test edildi
  async getAllWhyOutdorr(): Promise<WhyOutdorr[]> {
    return await this.whyOutdorrModel.find().populate([{ path: 'about_outdorr', select: ['key', 'value'] }])
  }

  // create subscribe - test edildi
  async createSubscribe(CreateSubscribeDto: createSubscribeDto): Promise<Subscribe> {
    const subscribeExist = await this.subscribeModel.findOne({ email: CreateSubscribeDto.email })
    if (subscribeExist) {
      throw new HttpException('The email address is already subscribed', HttpStatus.CONFLICT)
    }
    return await this.subscribeModel.create(CreateSubscribeDto)
  }

  // get all contact - test edildi
  async getAllContact(): Promise<Contact[]> {
    return await this.contactModel.find()
  }

  // get single contact - test edildi
  async getSingleContact(id: string): Promise<Contact> {
    const contactExist = await this.contactModel.findById(id)
    if (!contactExist) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND)
    }
    return contactExist
  }

}
