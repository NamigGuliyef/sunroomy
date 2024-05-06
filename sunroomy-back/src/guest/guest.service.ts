import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { aboutUs } from '../about-us/model/about_us.schema';
import cloudinary from '../config/cloudinary/cloudinary';
import { Contact } from '../contact/model/contact.schema';
import { FollowUs } from '../follow_us/model/followus.schema';
import { HomeAboutUs } from '../home_about_us/model/home_about_us.schema';
import { HomepageHero } from '../homepage_hero/model/homepage_hero.schema';
import { LetUs_Inspire_You } from '../letus-inspire-you/model/letus_inspire_you.schema';
import { Product } from '../product/model/product.schema';
import { ProjectDesignDetails } from '../project-design-details/model/projectdesigndetails.schema';
import { ProjectDesign } from '../project-design/model/projectdesign.schema';
import { Project } from '../projects/model/project.schema';
import { CreateRequestProjectDto } from '../request-project/dto/requestproject.dto';
import { RequestProject } from '../request-project/model/requestproject.schema';
import { subproductCustomItem } from '../subproduct-customItem/model/subproduct_customItem.schema';
import { subproductPlacementItem } from '../subproduct-placementItem/model/subproduct_placementItem.schema';
import { Subproduct } from '../subproduct/model/subproduct.schema';
import { subproductCustom } from '../subproduct_custom/model/subproduct_custom.schema';
import { subproductPlacement } from '../subproduct_placement/model/subproduct_placement.schema';
import { createSubscribeDto } from '../subscribe/dto/subscribe.dto';
import { Subscribe } from '../subscribe/model/subscribe.schema';
import { WhyOutdorr } from '../why-outdorr/model/whyoutdorr.schema';
import { Filter } from './guest.filter';
import { RequestQuote } from '../request_quote/model/request_quote.schema';

@Injectable()
export class GuestService {
  constructor(
    private mailerService: MailerService,
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
    @InjectModel('letus_inspire_you')
    private LetUs_Inspire_YouModel: Model<LetUs_Inspire_You>,
    @InjectModel('about_us') private aboutUsModel: Model<aboutUs>,
    @InjectModel('home_about_us') private homeAboutUsModel: Model<HomeAboutUs>,
    @InjectModel('homepage_hero')
    private homepage_heroModel: Model<HomepageHero>,
    @InjectModel('follow_us') private followUsModel: Model<FollowUs>,
    @InjectModel('subproduct_custom')
    private subproductCustomModel: Model<subproductCustom>,
    @InjectModel('subproduct_customItem')
    private subproductCustomItemModel: Model<subproductCustomItem>,
    @InjectModel('subproduct_placement')
    private subproductPlacementModel: Model<subproductPlacement>,
    @InjectModel('subproduct_placementItem')
    private subproductPlacementItemModel: Model<subproductPlacementItem>,
    @InjectModel('request_quote') private requestQuoteModel: Model<RequestQuote>
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
    return await this.subProductModel.find().populate([
      { path: 'featuresIds' },
      { path: 'specifications' },
      { path: 'applicationIds' },
      {
        path: 'productId',
        select: 'title',
        populate: {
          path: 'subProductIds',
          select: ['title', 'description', 'cover_photo', 'slug'],
        },
      },
      { path: 'customId' },
      {
        path: 'placementId',
        select: ['itemIds', 'description', 'title'],
        populate: {
          path: 'itemIds',
          select: ['description', 'photo'],
        },
      },
      {
        path: 'customId',
        select: ['itemIds', 'description', 'title'],
        populate: {
          path: 'itemIds',
          select: ['description', 'photo'],
        },
      },
    ]);
  }

  // get single sub product - test edildi
  async getSingleSubProduct(slug: string): Promise<Subproduct> {
    const subProductExist = await this.subProductModel
      .findOne({ slug })
      .populate([
        { path: 'featuresIds' },
        { path: 'specifications' },
        { path: 'applicationIds' },
        {
          path: 'productId',
          select: 'title',
          populate: {
            path: 'subProductIds',
            select: ['title', 'description', 'cover_photo', 'slug'],
          },
        },
        { path: 'customId' },
        {
          path: 'placementId',
          select: ['itemIds', 'description'],
          populate: {
            path: 'itemIds',
            select: ['description', 'photo'],
          },
        },
        {
          path: 'customId',
          select: ['itemIds', 'description'],
          populate: {
            path: 'itemIds',
            select: ['description', 'photo'],
          },
        },
      ]);
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
    return await this.projectDesignModel.find().populate({
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
  ): Promise<string> {
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
      const newRequestProject = await this.requestProjectModel.create({
        ...createRequestProjectDto,
        window_and_doors,
        sunscreens,
        files: fileUrls,
      });

      this.mailerService.sendMail({
        from: `${newRequestProject.email}`,
        to: 'sunroomy.inc@gmail.com',
        subject: `Request a Project - ${
          newRequestProject.first_name + ' ' + newRequestProject.last_name
        }`,
        html: '',
      });
      return ' Your project request has been successfully sent';
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
    const titleRegex = new RegExp(title, 'i'); // 'i' parametresi büyük/küçük harf duyarlılığını kapatır

    const product = await this.productModel.find({ filter: titleRegex });
    const subProduct = await this.subProductModel.find({ title: titleRegex });
    const project = await this.projectModel.find({ title: titleRegex });
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
  async getAllLetUsInspireYou(): Promise<LetUs_Inspire_You[]> {
    return await this.LetUs_Inspire_YouModel.find();
  }

  // get single let us inspire you - test ok
  async geSingleLetUsInspireYou(id: string): Promise<LetUs_Inspire_You> {
    return await this.LetUs_Inspire_YouModel.findById(id);
  }

  // get single about us  - test ok
  async getSingleAboutUs(id: string): Promise<aboutUs> {
    const aboutUs = await this.aboutUsModel.findById(id);
    if (!aboutUs)
      throw new HttpException('About us not found', HttpStatus.NOT_FOUND);
    return aboutUs;
  }

  // get all about us  - test ok
  async getAllAboutUs(): Promise<aboutUs[]> {
    return await this.aboutUsModel.find();
  }

  // get single home about us
  async getSingleHomeAboutUs(id: string): Promise<HomeAboutUs> {
    const homeAboutUs = await this.homeAboutUsModel.findById(id);
    if (!homeAboutUs) {
      throw new HttpException('Home about us not found', HttpStatus.NOT_FOUND);
    } else {
      return homeAboutUs;
    }
  }

  //get All home about us
  async getAllhomeAboutUs(): Promise<HomeAboutUs[]> {
    return await this.homeAboutUsModel.find();
  }

  // get single homepage hero
  async getSingleHomepageHero(_id: string): Promise<HomepageHero> {
    return await this.homepage_heroModel.findById(_id);
  }

  // get all homepage hero
  async getAllHomepageHero(): Promise<HomepageHero[]> {
    return await this.homepage_heroModel.find();
  }

  // get follow us single
  async getSingleFolowUs(id: string): Promise<FollowUs> {
    return await this.followUsModel.findById(id);
  }

  // get all follow us
  async getAllFollowUs(): Promise<FollowUs[]> {
    return await this.followUsModel.find();
  }

  // get subproduct custom
  async getSingleSubproductCustom(id: string): Promise<subproductCustom> {
    const subproductCustom = await this.subproductCustomModel.findById(id);
    if (!subproductCustom) {
      throw new HttpException(
        'Subproduct custom not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return subproductCustom.populate([{ path: 'itemIds' }]);
    }
  }

  //get All subproduct custom
  async getAllSubproductCustom(): Promise<subproductCustom[]> {
    return await this.subproductCustomModel
      .find()
      .populate([{ path: 'itemIds', select: ['photo', 'description'] }]);
  }

  // get single subproduct custom item
  async getSingleSubproductCustomItem(
    id: string,
  ): Promise<subproductCustomItem> {
    const subproductCustomItemExist =
      await this.subproductCustomItemModel.findById(id);
    if (!subproductCustomItemExist)
      throw new HttpException(
        'Subproduct custom item not found',
        HttpStatus.NOT_FOUND,
      );
    return subproductCustomItemExist.populate([
      { path: 'subproductCustomId', select: ['photo', 'description'] },
    ]);
  }

  // get all subproduct custom item
  async getAllSubproductCustomItem(): Promise<subproductCustomItem[]> {
    return await this.subproductCustomItemModel
      .find()
      .populate([{ path: 'subproductCustomId' }]);
  }

  // get subproduct placement
  async getSingleSubproductPlacement(id: string): Promise<subproductPlacement> {
    const subproductPlacement = await this.subproductPlacementModel.findById(
      id,
    );
    if (!subproductPlacement) {
      throw new HttpException(
        'Subproduct placement not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return subproductPlacement.populate([{ path: 'itemIds' }]);
    }
  }

  //get All subproduct placement
  async getAllSubproductPlacement(): Promise<subproductPlacement[]> {
    return await this.subproductPlacementModel
      .find()
      .populate([{ path: 'itemIds' }]);
  }

  // get single subproduct placement item
  async getSingleSubproductPlacementItem(
    id: string,
  ): Promise<subproductPlacementItem> {
    const subproductPlacementItemExist =
      await this.subproductPlacementItemModel.findById(id);
    if (!subproductPlacementItemExist)
      throw new HttpException(
        'Subproduct placement item not found',
        HttpStatus.NOT_FOUND,
      );
    return subproductPlacementItemExist.populate([
      { path: 'subproductPlacementId' },
    ]);
  }

  // get all subproduct placement item
  async getAllSubproductPlacementItem(): Promise<subproductPlacementItem[]> {
    return await this.subproductPlacementItemModel
      .find()
      .populate([{ path: 'subproductPlacementId' }]);
  }


  
  // get All request quote 
  async getAllRequestQuote(): Promise<RequestQuote[]> {
    return await this.requestQuoteModel.find()
  }


  // get single request quote 
  async getSingleRequestQuote(id: string): Promise<RequestQuote> {
    return await this.requestQuoteModel.findById(id)
  }

}
