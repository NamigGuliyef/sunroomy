import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from '../config/cloudinary/cloudinary';
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
import { Filter } from './guest.filter';
import { LetUs_Inspire_You } from '../letus-inspire-you/model/letus_inspire_you.schema';
import { aboutUs } from '../about-us/model/about_us.schema';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel('whyoutdorr') private whyOutdorrModel: Model<WhyOutdorr>,
    @InjectModel('subscribe') private subscribeModel: Model<Subscribe>,
    @InjectModel('product') private productModel: Model<Product>,
    @InjectModel('subproduct') private subProductModel: Model<Subproduct>,
    @InjectModel('project') private projectModel: Model<Project>,
    @InjectModel('contact') private contactModel: Model<Contact>,
    @InjectModel('projectdesign')
    private projectDesignModel: Model<ProjectDesign>,
    @InjectModel('projectdesigndetail')
    private projectDesignDetailsModel: Model<ProjectDesignDetails>,
    @InjectModel('requestproject')
    private requestProjectModel: Model<RequestProject>,
    @InjectModel('letus_inspire_you') private LetUs_Inspire_YouModel: Model<LetUs_Inspire_You>,
    @InjectModel('about_us') private aboutUsModel: Model<aboutUs>
        
  ) {}

  // get all product - test edildi
  async getAllProduct(): Promise<Product[]> {
    return await this.productModel.find().populate({
      path: 'subProductIds',
      select: ['title', 'description', 'photos', 'slug'], // Rufat A. elave etdim
    });
  }

  // get single product - test edildi
  async getSingleProduct(slug: string): Promise<Product> {
    const product = await this.productModel.findOne({ slug }).populate({
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
      .populate([
        { path: 'featuresIds' },
        { path: 'specifications' },
        { path: 'applicationIds' },
        { path: 'productId', select:'title', populate:{ path:'subProductIds', select:['title','description','cover_photo', 'slug']}}
      ]);
  }

  // get single sub product - test edildi
  async getSingleSubProduct(slug: string): Promise<Subproduct> {
    const subProductExist = await this.subProductModel
      .findOne({ slug })
      .populate([{ path: 'featuresIds' }, { path: 'specifications' }, { path: 'applicationIds' },
      { path: 'productId',select:'title', populate:{ path:'subProductIds', select:['title','description','cover_photo', 'slug']}}]);
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
    return this.projectDesignDetailsModel.find();
  }

  // get single project design detail - test ok
  async getSingleProjectDesignDetails(
    id: string,
  ): Promise<ProjectDesignDetails> {
    return this.projectDesignDetailsModel.findById(id);
  }

  // get all project design - test ok
  async getAllProjectDesign(): Promise<ProjectDesign[]> {
    return await this.projectDesignModel
      .find()
      .populate({
        path: 'design_details',
        select: ['title', 'description', 'photo', 'step'],
      });
  }

  // get single project design - test ok
  async getSingleProjectDesign(id: string): Promise<ProjectDesign> {
    const projectDesignExist = await this.projectDesignModel.findById(id);
    if (!projectDesignExist) {
      throw new HttpException(
        'Information about the design of the project was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return (await this.projectDesignModel.findById(id)).populate({
      path: 'design_details',
      select: ['title', 'description', 'photo', 'step'],
    });
  }

  // request project
  async createRequestProject(
    createRequestProjectDto: CreateRequestProjectDto,
    files: Express.Multer.File[],
  ): Promise<RequestProject> {
    const selected_window_and_doors = [];
    selected_window_and_doors.push(createRequestProjectDto.window_and_doors);
    const window_and_doors = selected_window_and_doors.join().split(',');
    const selected_sunscreens = [];
    selected_sunscreens.push(createRequestProjectDto.sunscreens);
    const sunscreens = selected_sunscreens.join().split(',');
    if (window_and_doors.length === 3) {
      const fileUrls = [];
      for (let i = 0; i < files.length; i++) {
        const fileUrl = await cloudinary.uploader.upload(files[i].path, {
          public_id: files[i].originalname,
        });
        fileUrls.push(fileUrl.url);
      }
      return await this.requestProjectModel.create({
        ...createRequestProjectDto,
        window_and_doors,
        sunscreens,
        files: fileUrls,
      });
    } else {
      throw new HttpException(
        'Select only 3 products from the window_and_doors section.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // all filter
  async getAllFilter(filter: Filter) {
    const { title } = filter;
    const search: any = {};
    if (title) search.title = title;
    const titleRegex = new RegExp(title, 'i')  // 'i' parametresi büyük/küçük harf duyarlılığını kapatır

    const product = await this.productModel.find({filter: titleRegex});
    const subProduct = await this.subProductModel.find({title: titleRegex})
    const project = await this.projectModel.find({title: titleRegex})
    if (product.length > 0) {
      return product;
    }
    if (subProduct.length > 0) {
      return subProduct;
    }
    if (project.length > 0) {
      return project;
    }
  }


    // get All let us inspire you - test ok
    async getAllLetUsInspireYou():Promise<LetUs_Inspire_You[]>{
      return await this.LetUs_Inspire_YouModel.find()
    }
  
  
   // get single let us inspire you - test ok
   async geSingleLetUsInspireYou(id:string):Promise<LetUs_Inspire_You>{
    return await this.LetUs_Inspire_YouModel.findById(id)
   }


     // get single about us  - test ok
  async getSingleAboutUs(id:string):Promise<aboutUs>{
    const aboutUs=await this.aboutUsModel.findById(id)
    if(!aboutUs) throw new HttpException('About us not found',HttpStatus.NOT_FOUND)
    return aboutUs
  }

  
  // get all about us  - test ok
  async getAllAboutUs():Promise<aboutUs[]>{
    return await this.aboutUsModel.find()
  }

}
