import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';
import { createApplicationDto, updateApplicationDto } from 'src/applications/dto/application.dto';
import { Application } from 'src/applications/model/application.schema';
import cloudinary from 'src/config/cloudinary/cloudinary';
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
import { createUsedProductsDto, updateUsedProductsDto } from 'src/used-products/dto/usedproduct.dto';
import { UsedProducts } from 'src/used-products/model/usedProduct.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel('feature') private featureModel: Model<Feature>,
    @InjectModel('projectneed') private projectNeedModel: Model<ProjectNeed>,
    @InjectModel('usedproducts') private usedProductsModel: Model<UsedProducts>,
    @InjectModel('application') private applicationModel: Model<Application>,
    @InjectModel('project') private projectModel: Model<Project>,
    @InjectModel('specification') private specificationModel: Model<Specification>,
    @InjectModel('subproduct') private subProductModel: Model<Subproduct>,
    @InjectModel('product') private productModel: Model<Product>
  ) { }

  // create feature
  async createFeature(CreateFeatureDto: createFeatureDto, file: Express.Multer.File): Promise<Feature> {
    if (!CreateFeatureDto.icon) {
      const { title, description } = CreateFeatureDto
      return await this.featureModel.create({ title, description })
    } else {
      const feature = await this.featureModel.create({ ...CreateFeatureDto, icon: file.originalname })
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
      await this.featureModel.findByIdAndDelete(id)
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
    const project = await this.projectModel.findById(id).populate({ path: 'featuresId', select: ['title', 'description'] })
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
    return await this.specificationModel.create(CreateSpecificationDto)
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
  async createProduct(CreateProductDto: createProductDto): Promise<Product> {
    const product = await this.productModel.findOne({ title: CreateProductDto.title })
    if (product) {
      throw new HttpException('The product is already available', HttpStatus.CONFLICT)
    }
    return await this.productModel.create(CreateProductDto)
  }

  // update product
  async updateProduct(id: string, UpdateProductDto: updateProductDto): Promise<Product> {
    const product = await this.productModel.findById(id)
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }
    return await this.productModel.findByIdAndUpdate(id, { $set: UpdateProductDto }, { new: true })
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
  async createSubProduct(CreateSubProductDto: createSubProductDto): Promise<Subproduct> {
    const { title } = CreateSubProductDto
    const subProductExist = await this.subProductModel.findOne({ title })
    if (subProductExist) {
      throw new HttpException('Sub product already created', HttpStatus.CONFLICT)
    }
    const subProduct = await this.subProductModel.create(CreateSubProductDto)
    await this.productModel.findOneAndUpdate({ _id: subProduct.productId }, { $push: { subProductIds: subProduct.id } }, { new: true })
    return subProduct
  }

  // update sub product
  async updateSubProduct(id: string, UpdateSubproductDto: updateSubProductDto): Promise<Subproduct> {
    const subProductExist = await this.subProductModel.findById(id)
    if (!subProductExist) {
      throw new HttpException('Sub product not found', HttpStatus.NOT_FOUND)
    }
    return await this.subProductModel.findByIdAndUpdate(id, { $set: UpdateSubproductDto }, { new: true })
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






}