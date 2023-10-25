import { MailerService } from '@nestjs-modules/mailer/dist';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createAboutOutdorrDto, updateAboutOutdorrDto } from 'src/about-outdorr/dto/aboutoutdorr.dto';
import { AboutOutdorr } from 'src/about-outdorr/model/aboutoutdorr.schema';
import { createApplicationDto, updateApplicationDto } from 'src/applications/dto/application.dto';
import { Application } from 'src/applications/model/application.schema';
import cloudinary from 'src/config/cloudinary/cloudinary';
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
import { createSubscribeDto, sendEmailText } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { createUsedProductsDto, updateUsedProductsDto } from 'src/used-products/dto/usedproduct.dto';
import { UsedProducts } from 'src/used-products/model/usedProduct.schema';
import { createWhyOutdorrDto, updateWhyOutdorrDto } from 'src/why-outdorr/dto/whyoutdorr.dto';
import { WhyOutdorr } from 'src/why-outdorr/model/whyoutdorr.schema';

@Injectable()
export class AdminService {
  constructor(private mailerService: MailerService,
    @InjectModel('feature') private featureModel: Model<Feature>,
    @InjectModel('projectneed') private projectNeedModel: Model<ProjectNeed>,
    @InjectModel('usedproducts') private usedProductsModel: Model<UsedProducts>,
    @InjectModel('application') private applicationModel: Model<Application>,
    @InjectModel('project') private projectModel: Model<Project>,
    @InjectModel('specification') private specificationModel: Model<Specification>,
    @InjectModel('subproduct') private subProductModel: Model<Subproduct>,
    @InjectModel('product') private productModel: Model<Product>,
    @InjectModel('contact') private contactModel: Model<Contact>,
    @InjectModel('subscribe') private subscribeModel: Model<Subscribe>,
    @InjectModel('whyoutdorr') private whyOutdorrModel: Model<WhyOutdorr>,
    @InjectModel('aboutoutdorr') private aboutOutdorrModel: Model<AboutOutdorr>) { }

  // create feature - problem var
  async createFeature(CreateFeatureDto: createFeatureDto, file: Express.Multer.File): Promise<Feature> {
    if (!CreateFeatureDto.icon) {
      const { title, description } = CreateFeatureDto
      return await this.featureModel.create({ title, description })
    } else {
      const feature = await this.featureModel.create({ ...CreateFeatureDto, icon: file.originalname })
      await this.subProductModel.findOneAndUpdate({ _id: feature.subProductId }, { $push: { featuresIds: feature._id } })
      return feature
    }
  }

  // update feature
  async updateFeature(id: string, UpdateFeatureDto: updateFeatureDto, file: Express.Multer.File): Promise<Feature> {
    const feature = await this.featureModel.findById(id)
    if (!feature) {
      throw new HttpException('The feature you are looking for was not found', HttpStatus.NOT_FOUND)
    } else if (!UpdateFeatureDto.icon) {
      const { title, description } = UpdateFeatureDto
      return await this.featureModel.findByIdAndUpdate(id, { $set: { title, description } }, { new: true })
    } else {
      const updateFeature = await this.featureModel.findByIdAndUpdate(id, { $set: { ...UpdateFeatureDto, icon: file.originalname } }, { new: true })
      return updateFeature
    }
  }

  // delete feature
  async deleteFeature(id: string): Promise<string> {
    const feature = await this.featureModel.findById(id)
    if (!feature) {
      throw new HttpException('The feature you want to remove was not found', HttpStatus.NOT_FOUND)
    } else {
      const deleteFeature = await this.featureModel.findByIdAndDelete(id)
      await this.subProductModel.findOneAndUpdate({ _id: deleteFeature.subProductId }, { $pull: { featuresIds: deleteFeature._id } })
      return 'Project feature removed'
    }
  }

  // get single feature
  async getSingleFeature(id: string): Promise<Feature> {
    const feature = await this.featureModel.findById(id)
    if (!feature) {
      throw new HttpException('Feature not found', HttpStatus.NOT_FOUND)
    } else {
      return feature
    }
  }

  // get all features
  async getAllFeatures(): Promise<Feature[]> {
    return await this.featureModel.find()
  }

  // create Project needs
  async createProjectNeed(CreateProjectNeedDto: createProjectNeedDto): Promise<ProjectNeed> {
    return await this.projectNeedModel.create(CreateProjectNeedDto)
  }

  // update Project needs
  async updateProjectNeed(id: string, UpdateProjectNeedDto: updateProjectNeedDto): Promise<ProjectNeed> {
    const projectNeedExist = await this.projectNeedModel.findById(id)
    if (!projectNeedExist) {
      throw new HttpException('No project requirements found to be modified', HttpStatus.NOT_FOUND)
    } else {
      const updateProjectNeed = await this.projectNeedModel.findByIdAndUpdate(id, { $set: UpdateProjectNeedDto }, { new: true })
      return updateProjectNeed
    }
  }

  // delete Project needs
  async deleteProjectNeed(id: string): Promise<string> {
    const projectNeed = await this.projectNeedModel.findById(id)
    if (!projectNeed) {
      throw new HttpException('The project needs you want to delete were not found', HttpStatus.NOT_FOUND)
    } else {
      await this.projectNeedModel.findByIdAndDelete(id)
      return 'Project need removed'
    }
  }

  // get single project needs
  async getSingleProjectNeed(id: string): Promise<ProjectNeed> {
    const projectNeed = await this.projectNeedModel.findById(id)
    if (!projectNeed) {
      throw new HttpException('Project needs not found', HttpStatus.NOT_FOUND)
    } else {
      return projectNeed
    }
  }

  //get All project needs
  async getAllProjectNeed(): Promise<ProjectNeed[]> {
    return await this.projectNeedModel.find()
  }

  // create used Products
  async createUsedProducts(CreateUsedProductsDto: createUsedProductsDto, files: Express.Multer.File[]): Promise<UsedProducts> {
    const fileUrls = []
    for (let i = 0; i < files.length; i++) {
      const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname })
      fileUrls.push(fileUrl.url)
    }
    return await this.usedProductsModel.create({ ...CreateUsedProductsDto, photos: fileUrls })
  }

  // update used Products
  async updateUsedProducts(id: string, UpdateUsedProducts: updateUsedProductsDto, files: Express.Multer.File[]): Promise<UsedProducts> {
    const usedProductsExist = await this.usedProductsModel.findById(id)
    if (!usedProductsExist) {
      throw new HttpException('The used products you want to change were not found', HttpStatus.NOT_FOUND)
    } else {
      const fileUrls = []
      for (let i = 0; i < files.length; i++) {
        const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname })
        fileUrls.push(fileUrl.url)
      }
      const updateUsedProduct = await this.usedProductsModel.findByIdAndUpdate(id, { $set: UpdateUsedProducts }, { new: true })
      return updateUsedProduct
    }
  }

  // delete used Products
  async deleteUsedProducts(id: string): Promise<string> {
    const usedProducts = await this.usedProductsModel.findById(id)
    if (!usedProducts) {
      throw new HttpException('The used products you want to delete were not found', HttpStatus.NOT_FOUND)
    } else {
      await this.usedProductsModel.findByIdAndDelete(id)
      return 'Removed used products'
    }
  }

  // get single used Products
  async getSingleUsedProducts(id: string): Promise<UsedProducts> {
    const usedPorducts = await this.usedProductsModel.findById(id)
    if (!usedPorducts) {
      throw new HttpException('Used products not found', HttpStatus.NOT_FOUND)
    } else {
      return usedPorducts
    }
  }

  // get all used Products
  async getAllUsedProducts(): Promise<UsedProducts[]> {
    return await this.usedProductsModel.find()
  }

  // create product application
  async createApplication(CreateApplicationDto: createApplicationDto, files: Express.Multer.File[]): Promise<Application> {
    const fileUrls = []
    for (let i = 0; i < files.length; i++) {
      const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname });
      fileUrls.push(fileUrl.url)
    }
    const application = await this.applicationModel.create({ ...CreateApplicationDto, photos: fileUrls })
    return application
  }

  // update product application
  async updateApplication(id: string, UpdateApplicationDto: updateApplicationDto, files: Express.Multer.File[]): Promise<Application> {
    const application = await this.applicationModel.findById(id)
    if (!application) {
      throw new HttpException('The application you want to update was not found', HttpStatus.NOT_FOUND)
    } else {
      const fileUrls = []
      for (let i = 0; i < files.length; i++) {
        const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname })
        fileUrls.push(fileUrl.url)
      }
      const updateApplication = await this.applicationModel.findByIdAndUpdate(id, { $set: { ...UpdateApplicationDto, photos: fileUrls } }, { new: true })
      return updateApplication
    }
  }

  // delete product application
  async deleteApplication(id: string): Promise<string> {
    const application = await this.applicationModel.findById(id)
    if (!application) {
      throw new HttpException('The application you want to uninstall was not found', HttpStatus.NOT_FOUND)
    } else {
      await this.applicationModel.findByIdAndDelete(id)
      return "The application has been deleted"
    }
  }

  // get single product application
  async getSingleApplication(id: string): Promise<Application> {
    const application = await this.applicationModel.findById(id)
    if (!application) {
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND)
    } else {
      return application
    }
  }

  // get all product application
  async getAllApplication(): Promise<Application[]> {
    return await this.applicationModel.find()
  }

  // create project
  async createProject(CreateProjectDto: createProjectDto, files: Express.Multer.File[]): Promise<Project> {
    const fileUrls = []
    for (let i = 0; i < files.length; i++) {
      const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname })
      fileUrls.push(fileUrl.url)
    }
    const project = await this.projectModel.create({ ...CreateProjectDto, photos: fileUrls })
    return project
  }

  // update project
  async updateProject(id: string, UpdateProjectDto: updateProjectDto, files: Express.Multer.File[]): Promise<Project> {
    const project = await this.projectModel.findById(id)
    if (!project) {
      throw new HttpException('The project to be change was not found', HttpStatus.NOT_FOUND)
    } else {
      const fileUrls = []
      for (let i = 0; i < files.length; i++) {
        const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname })
        fileUrls.push(fileUrl.url)
      }
      const updateProject = await this.projectModel.findByIdAndUpdate(id, { $set: { ...UpdateProjectDto, photos: fileUrls } }, { new: true })
      return updateProject
    }
  }

  // delete project
  async deleteProject(id: string): Promise<string> {
    const project = await this.projectModel.findById(id)
    if (!project) {
      throw new HttpException('The project you want to delete was not found', HttpStatus.NOT_FOUND)
    } else {
      await this.projectModel.findByIdAndDelete(id)
      return 'The project has been deleted'
    }
  }

  // get single project
  async getSingleProject(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).populate({ path: 'featuresId', select: ['title', 'description', 'subProductId'] })
    if (!project) {
      throw new HttpException('The project you are looking for has not been found', HttpStatus.NOT_FOUND)
    }
    return project
  }

  // get all project
  async getAllProject(): Promise<Project[]> {
    return await this.projectModel.find()
  }

  // create specification
  async createSpecification(CreateSpecificationDto: createSpecificationDto): Promise<Specification> {
    const { key, value } = CreateSpecificationDto
    const specificationExist = await this.specificationModel.findOne({ key, value })
    if (specificationExist) {
      throw new HttpException('The specification has already been created', HttpStatus.CONFLICT)
    }
    const specification = await this.specificationModel.create(CreateSpecificationDto)
    await this.subProductModel.findOneAndUpdate({ _id: specification.subProductId }, { $push: { specifications: specification._id } })
    return specification
  }

  // update specification
  async updateSpecification(id: string, UpdateSpecificationDto: updateSpecificationDto): Promise<Specification> {
    const specificationExist = await this.specificationModel.findById(id)
    if (!specificationExist) {
      throw new HttpException('Specification not found', HttpStatus.NOT_FOUND)
    }
    const { key, value } = UpdateSpecificationDto
    const specification = await this.specificationModel.findOne({ key, value })
    if (specification) {
      throw new HttpException('The specification has already been created', HttpStatus.CONFLICT)
    }
    return await this.specificationModel.findByIdAndUpdate(id, { $set: UpdateSpecificationDto }, { new: true })
  }

  // delete specification
  async deleteSpecification(id: string): Promise<string> {
    const specification = await this.specificationModel.findById(id)
    if (!specification) {
      throw new HttpException('Specification not found', HttpStatus.NOT_FOUND)
    }
    await this.specificationModel.findByIdAndDelete(id)
    await this.subProductModel.findOneAndUpdate({ _id: specification.subProductId }, { $pull: { specifications: specification._id } })
    return 'The specification has been removed'
  }

  // get single specification
  async getSingleSpecification(id: string): Promise<Specification> {
    const specification = await this.specificationModel.findById(id)
    if (!specification) {
      throw new HttpException('Specification not found', HttpStatus.NOT_FOUND)
    }
    return specification
  }

  // get all specification
  async getAllSpecification(): Promise<Specification[]> {
    return await this.specificationModel.find()
  }

  // create product
  async createProduct(CreateProductDto: createProductDto, file: Express.Multer.File): Promise<Product> {
    const product = await this.productModel.findOne({ title: CreateProductDto.title })
    if (product) {
      throw new HttpException('The product is already available', HttpStatus.CONFLICT)
    }
    const fileuRL = await cloudinary.uploader.upload(file.path, { public_id: file.originalname })
    return await this.productModel.create({ ...CreateProductDto, photo: fileuRL.url })
  }

  // update product
  async updateProduct(id: string, UpdateProductDto: updateProductDto, file: Express.Multer.File): Promise<Product> {
    const product = await this.productModel.findById(id)
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }
    const fileUrl = await cloudinary.uploader.upload(file.path, { public_id: file.originalname })
    return await this.productModel.findByIdAndUpdate(id, { $set: { ...UpdateProductDto, photo: fileUrl.url } }, { new: true })
  }

  // delete product
  async deleteProduct(id: string): Promise<string> {
    const productExist = await this.productModel.findById(id)
    if (!productExist) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }
    await this.productModel.findByIdAndDelete(id)
    return "Product deleted"
  }

  // get single product
  async getSingleProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id)
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }
    return product
  }

  // get all product
  async getAllProduct(): Promise<Product[]> {
    return await this.productModel.find()
  }

  // create sub product
  async createSubProduct(CreateSubProductDto: createSubProductDto, files: Express.Multer.File[]): Promise<Subproduct> {
    const { title } = CreateSubProductDto
    const subProductExist = await this.subProductModel.findOne({ title })
    if (subProductExist) {
      throw new HttpException('Sub product already created', HttpStatus.CONFLICT)
    }
    const fileUrls = []
    for (let i = 0; i < files.length; i++) {
      const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname })
      fileUrls.push(fileUrl.url)
    }
    const subProduct = await this.subProductModel.create({ ...CreateSubProductDto, photos: fileUrls })
    await this.productModel.findOneAndUpdate({ _id: subProduct.productId }, { $push: { subProductIds: subProduct.id } }, { new: true })
    return subProduct
  }

  // update sub product
  async updateSubProduct(id: string, UpdateSubproductDto: updateSubProductDto, files: Express.Multer.File[]): Promise<Subproduct> {
    const subProductExist = await this.subProductModel.findById(id)
    if (!subProductExist) {
      throw new HttpException('Sub product not found', HttpStatus.NOT_FOUND)
    }
    const fileUrls = []
    for (let i = 0; i < files.length; i++) {
      const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname })
      fileUrls.push(fileUrl.url)
    }
    return await this.subProductModel.findByIdAndUpdate(id, { $set: { ...UpdateSubproductDto, photos: fileUrls } }, { new: true })
  }

  // delete sub product
  async deleteSubProduct(id: string): Promise<string> {
    const subProductExist = await this.subProductModel.findById(id)
    if (!subProductExist) {
      throw new HttpException('Sub product not found', HttpStatus.NOT_FOUND)
    }
    const deleteSubProduct = await this.subProductModel.findByIdAndDelete(id)
    await this.productModel.findOneAndUpdate({ _id: deleteSubProduct.productId }, { $pull: { subProductIds: deleteSubProduct._id } })
    return 'The sub product has been removed'
  }

  // get single sub product
  async getSingleSubProduct(id: string): Promise<Subproduct> {
    const subProductExist = await this.subProductModel.findById(id).populate([{ path: 'featuresIds' }, { path: 'specifications' }])
    if (!subProductExist) {
      throw new HttpException('Sub product not found', HttpStatus.NOT_FOUND)
    }
    return subProductExist
  }

  // get all sub product
  async getAllSubProduct(): Promise<Subproduct[]> {
    return await this.subProductModel.find()
  }

  // create contact
  async createContact(CreateContactDto: createContactDto): Promise<Contact> {
    const contactExist = await this.contactModel.findOne({ location: CreateContactDto.location })
    if (contactExist) {
      throw new HttpException('Location already created', HttpStatus.CONFLICT)
    }
    return await this.contactModel.create(CreateContactDto)
  }

  // update contact
  async updateContact(id: string, UpdateContactDto: updateContactDto): Promise<Contact> {
    const contactExist = await this.contactModel.findById(id)
    if (!contactExist) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND)
    }
    return await this.contactModel.findByIdAndUpdate(id, { $set: UpdateContactDto }, { new: true })
  }

  // delete contact
  async deleteContact(id: string): Promise<string> {
    const contactExist = await this.contactModel.findById(id)
    if (!contactExist) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND)
    }
    await this.contactModel.findByIdAndDelete(id)
    return 'Contact information has been removed'
  }

  // get single contact
  async getSingleContact(id: string): Promise<Contact> {
    const contactExist = await this.contactModel.findById(id)
    if (!contactExist) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND)
    }
    return contactExist
  }

  // get all contact
  async getAllContact(): Promise<Contact[]> {
    return await this.contactModel.find()
  }


  // get subscribe
  async getAllSubscribe(): Promise<Subscribe[]> {
    return await this.subscribeModel.find()
  }

  // send email
  async sendEmail(text: sendEmailText): Promise<string> {
    const subscribers = await this.subscribeModel.find()
    for (let i = 0; i < subscribers.length; i++) {
      this.mailerService.sendMail({
        from: "quliyevnamiq8@gmail.com",
        to: `${subscribers[i].email}`,
        subject: "Outdorr new information",
        text: `${text.text}`
      })
    }
    return "An email has been sent to site subscribers"
  }

  // create why-outdorr 
  async createWhyOutdorr(CreateWhyOutdorrDto: createWhyOutdorrDto): Promise<WhyOutdorr> {
    const { title, description } = CreateWhyOutdorrDto
    const whyOutdorrExist = await this.whyOutdorrModel.findOne({ title, description })
    if (whyOutdorrExist) {
      throw new HttpException('Title and description are already created', HttpStatus.CONFLICT)
    } else {
      return await this.whyOutdorrModel.create(CreateWhyOutdorrDto)
    }
  }

  // update why-outdorr
  async updateWhyOutdorr(id: string, UpdateOutdorrDto: updateWhyOutdorrDto): Promise<WhyOutdorr> {
    const whyoutdorrExist = await this.whyOutdorrModel.findById(id)
    if (!whyoutdorrExist) {
      throw new HttpException('No information found to change', HttpStatus.NOT_FOUND)
    }
    const { title, description } = UpdateOutdorrDto
    const whyoutdorr = await this.whyOutdorrModel.findOne({ title, description })
    if (whyoutdorr) {
      throw new HttpException('Title and description are already created', HttpStatus.CONFLICT)
    }
    return await this.whyOutdorrModel.findByIdAndUpdate(id, { $set: UpdateOutdorrDto }, { new: true })
  }

  // delete why-outdorr
  async deleteWhyOutdorr(id: string): Promise<string> {
    const whyoutdorrExist = await this.whyOutdorrModel.findById(id)
    if (!whyoutdorrExist) {
      throw new HttpException('The information you want to delete was not found', HttpStatus.NOT_FOUND)
    }
    await this.whyOutdorrModel.findByIdAndDelete(id)
    return 'The data has been deleted'
  }

  // get single why-outdorr
  async getSingleWhyOutdorr(id: string): Promise<WhyOutdorr> {
    const whyoutdorrExist = await this.whyOutdorrModel.findById(id)
    if (!whyoutdorrExist) {
      throw new HttpException('The information you were looking for was not found', HttpStatus.NOT_FOUND)
    }
    return whyoutdorrExist
  }

  // get all why-outdorr
  async getAllWhyOutdorr(): Promise<WhyOutdorr[]> {
    return await this.whyOutdorrModel.find()
  }

  // create about-outdorr
  async createAboutOutdorr(CreateAboutOutdorrDto: createAboutOutdorrDto): Promise<AboutOutdorr> {
    const { key, value } = CreateAboutOutdorrDto
    const aboutOutdorrExist = await this.aboutOutdorrModel.findOne({ key, value })
    if (aboutOutdorrExist) {
      throw new HttpException('The information about outdoor has already been created', HttpStatus.CONFLICT)
    }
    const aboutOutdorr = await this.aboutOutdorrModel.create(CreateAboutOutdorrDto)
    await this.whyOutdorrModel.findOneAndUpdate({ _id: aboutOutdorr.why_outdorr }, { $push: { about_outdorr: aboutOutdorr._id } })
    return aboutOutdorr
  }

  // update about-outdorr
  async updateAboutOutdorr(id: string, UpdateAboutOutdorrDto: updateAboutOutdorrDto): Promise<AboutOutdorr> {
    const aboutOutdorrExist = await this.aboutOutdorrModel.findById(id)
    if (!aboutOutdorrExist) {
      throw new HttpException('The information you want to change does not exist', HttpStatus.NOT_FOUND)
    }
    const { key, value } = UpdateAboutOutdorrDto
    const aboutOutdorr = await this.aboutOutdorrModel.findOne({ key, value })
    if (aboutOutdorr) {
      throw new HttpException('There is information already mentioned about the outdoor', HttpStatus.CONFLICT)
    } else {
      return await this.aboutOutdorrModel.findByIdAndUpdate(id, { $set: UpdateAboutOutdorrDto },{new:true})
    }
  }

  // delete about-outdorr
  async deleteAboutOutdorr(id: string): Promise<string> {
    const aboutOutdorrExist = await this.aboutOutdorrModel.findById(id)
    if (!aboutOutdorrExist) {
      throw new HttpException('The information you want to delete does not exist', HttpStatus.NOT_FOUND)
    } else {
      const deleteAboutOutdorr = await this.aboutOutdorrModel.findByIdAndDelete(id)
      await this.whyOutdorrModel.findOneAndUpdate({ _id: deleteAboutOutdorr.why_outdorr }, { $pull: { about_outdorr: deleteAboutOutdorr._id } })
      return 'Information about Outdoor has been deleted'
    }
  }

  // get single about-outdorr
  async getSingleAboutOutdorr(id: string): Promise<AboutOutdorr> {
    const aboutOutdorrExist = await this.aboutOutdorrModel.findById(id)
    if (!aboutOutdorrExist) {
      throw new HttpException('Data not found', HttpStatus.NOT_FOUND)
    } else {
      return aboutOutdorrExist
    }
  }

  // get all about-outdorr-yoxlanildi 
  async getAllAboutOutdorr(): Promise<AboutOutdorr[]> {
    return await this.aboutOutdorrModel.find()
  }


}



