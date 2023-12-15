import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from 'src/config/cloudinary/cloudinary';
import { Contact } from 'src/contact/model/contact.schema';
import { Product } from 'src/product/model/product.schema';
import { ProjectDesignDetails } from 'src/project-design-details/model/projectdesigndetails.schema';
import { ProjectDesign } from 'src/project-design/model/projectdesign.schema';
import { Project } from 'src/projects/model/project.schema';
import { CreateRequestProjectDto } from 'src/request-project/dto/requestproject.dto';
import { RequestProject } from 'src/request-project/model/requestproject.schema';
import { Subproduct } from 'src/subproduct/model/subproduct.schema';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { WhyOutdorr } from 'src/why-outdorr/model/whyoutdorr.schema';
import { Filter } from './guest.filter';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel('whyoutdorr') private whyOutdorrModel: Model<WhyOutdorr>,
    @InjectModel('subscribe') private subscribeModel: Model<Subscribe>,
    @InjectModel('product') private productModel: Model<Product>,
    @InjectModel('subproduct') private subProductModel: Model<Subproduct>,
    @InjectModel('project') private projectModel: Model<Project>,
    @InjectModel('contact') private contactModel: Model<Contact>,
    @InjectModel('projectdesign') private projectDesignModel: Model<ProjectDesign>,
    @InjectModel('projectdesigndetail') private projectDesignDetailsModel: Model<ProjectDesignDetails>,
    @InjectModel('requestproject') private requestProjectModel: Model<RequestProject>
  ) { }

  // get all product - test edildi
  async getAllProduct(): Promise<Product[]> {
    return await this.productModel
      .find()
      .populate({
        path: 'subProductIds',
        select: ['title', 'description', 'photos'],
      });
  }

  // get single product - test edildi
  async getSingleProduct(slug: string): Promise<Product> {
    const product = await this.productModel
      .findOne({ slug })
      .populate({
        path: 'subProductIds',
        select: ['title', 'description', 'photos', 'cover_photo', 'slug'],
      });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  // get all sub product - test edildi
  async getAllSubProduct(): Promise<Subproduct[]> {
    return await this.subProductModel
      .find()
      .populate([{ path: 'featuresIds' }, { path: 'specifications' }]);
  }

  // get single sub product - test edildi
  async getSingleSubProduct(slug: string): Promise<Subproduct> {
    const subProductExist = await this.subProductModel
      .findOne({ slug })
      .populate([{ path: 'featuresIds' }, { path: 'specifications' }]);
    if (!subProductExist) {
      throw new HttpException('Sub product not found', HttpStatus.NOT_FOUND);
    }
    return subProductExist;
  }

  // get all project - test edildi
  async getAllProject(): Promise<Project[]> {
    return await this.projectModel
      .find()
      .populate([
        { path: 'featuresId' },
        { path: 'needsId' },
        { path: 'usedProductsId' },
      ]);
  }

  // get single project - test edildi
  async getSingleProject(slug: string): Promise<Project> {
    const project = await this.projectModel
      .findOne({ slug })
      .populate([
        { path: 'featuresId' },
        { path: 'needsId' },
        { path: 'usedProductsId' },
      ]);
    if (!project) {
      throw new HttpException(
        'The project you are looking for has not been found',
        HttpStatus.NOT_FOUND,
      );
    }
    return project;
  }

  // get all why-outdorr  - test edildi
  async getAllWhyOutdorr(): Promise<WhyOutdorr[]> {
    return await this.whyOutdorrModel
      .find()
      .populate([{ path: 'about_outdorr', select: ['key', 'value'] }]);
  }

  // create subscribe - test edildi
  async createSubscribe(
    CreateSubscribeDto: createSubscribeDto,
  ): Promise<Subscribe> {
    const subscribeExist = await this.subscribeModel.findOne({
      email: CreateSubscribeDto.email,
    });
    if (subscribeExist) {
      throw new HttpException(
        'The email address is already subscribed',
        HttpStatus.CONFLICT,
      );
    }
    return await this.subscribeModel.create(CreateSubscribeDto);
  }

  // get all contact - test edildi
  async getAllContact(): Promise<Contact[]> {
    return await this.contactModel.find();
  }

  // get single contact - test edildi
  async getSingleContact(id: string): Promise<Contact> {
    const contactExist = await this.contactModel.findById(id);
    if (!contactExist) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    return contactExist;
  }

  // get All project design detailsv - test ok
  async getAllProjectDesignDetails(): Promise<ProjectDesignDetails[]> {
    return this.projectDesignDetailsModel.find()
  }


  // get single project design detail - test ok
  async getSingleProjectDesignDetails(id: string): Promise<ProjectDesignDetails> {
    return this.projectDesignDetailsModel.findById(id)
  }


  // get all project design - test ok
  async getAllProjectDesign(): Promise<ProjectDesign[]> {
    return await this.projectDesignModel.find().populate({ path: 'design_details', select: ['title', 'description', 'photo', 'step'] })
  }


  // get single project design - test ok
  async getSingleProjectDesign(id: string): Promise<ProjectDesign> {
    const projectDesignExist = await this.projectDesignModel.findById(id)
    if (!projectDesignExist) {
      throw new HttpException('Information about the design of the project was not found', HttpStatus.NOT_FOUND)
    }
    return (await this.projectDesignModel.findById(id)).populate({ path: 'design_details', select: ['title', 'description', 'photo', 'step'] })
  }


  // request project
  async createRequestProject(createRequestProjectDto: CreateRequestProjectDto, files: Express.Multer.File[]): Promise<RequestProject> {
    const selected_window_and_doors = []
    selected_window_and_doors.push(createRequestProjectDto.window_and_doors)
    const window_and_doors = selected_window_and_doors.join().split(',')
    const selected_sunscreens = []
    selected_sunscreens.push(createRequestProjectDto.sunscreens)
    const sunscreens = selected_sunscreens.join().split(',')
    if (window_and_doors.length === 3) {
      const fileUrls = []
      for (let i = 0; i < files.length; i++) {
        const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname })
        fileUrls.push(fileUrl.url)
      }
      return await this.requestProjectModel.create({ ...createRequestProjectDto, window_and_doors, sunscreens, files: fileUrls })
    } else {
      throw new HttpException('Select only 3 products from the window_and_doors section.', HttpStatus.BAD_REQUEST)
    }
  }

  // all filter
  async getAllFilter(filter:Filter){
    const {title} = filter
    const search : any= {}
    if(title) search.title = title

    const product = await this.productModel.find(filter)
    const subProduct = await this.subProductModel.find(filter)
    const project = await this.projectModel.find(filter)
    if(product.length> 0){
      return product
    }
    if(subProduct.length> 0){
      return subProduct
    }
    if(project.length> 0){
      return project
    }
    
  }
}


