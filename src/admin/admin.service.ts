import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createApplicationDto, updateApplicationDto } from 'src/applications/dto/application.dto';
import { Application } from 'src/applications/model/application.schema';
import cloudinary from 'src/config/cloudinary/cloudinary';
import { createFeatureDto, updateFeatureDto } from 'src/features/dto/feature.dto';
import { Feature } from 'src/features/model/feature.schema';
import { createProjectNeedDto, updateProjectNeedDto } from 'src/needs/dto/need.dto';
import { ProjectNeed } from 'src/needs/model/need.schema';
import { createProjectDto, updateProjectDto } from 'src/projects/dto/project.dto';
import { Project } from 'src/projects/model/project.schema';
import { createUsedProductsDto, updateUsedProductsDto } from 'src/used-products/dto/usedproduct.dto';
import { UsedProducts } from 'src/used-products/model/usedProduct.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel('feature') private featureModel: Model<Feature>,
    @InjectModel('projectneed') private projectNeedModel: Model<ProjectNeed>,
    @InjectModel('usedproducts') private usedProductsModel: Model<UsedProducts>,
    @InjectModel('application') private applicationModel: Model<Application>,
    @InjectModel('project') private projectModel: Model<Project>
  ) { }

  // create feature
  async createFeature(CreateFeatureDto: createFeatureDto, file: Express.Multer.File): Promise<Feature> {
    const featureExist = await this.featureModel.findOne({ title: CreateFeatureDto.title })
    if (featureExist) {
      throw new HttpException('Feature already created', HttpStatus.CONFLICT)
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
  async createUsedProducts(CreateUsedProductsDto: createUsedProductsDto): Promise<UsedProducts> {
    return await this.usedProductsModel.create(CreateUsedProductsDto)
  }

  // update used Products
  async updateUsedProducts(id: string, UpdateUsedProducts: updateUsedProductsDto): Promise<UsedProducts> {
    const usedProductsExist = await this.usedProductsModel.findById(id)
    if (!usedProductsExist) {
      throw new HttpException('The used products you want to change were not found', HttpStatus.NOT_FOUND)
    } else {
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
async updateApplication(id:string,UpdateApplicationDto:updateApplicationDto,files:Express.Multer.File[]):Promise<Application>{
  const application=await this.applicationModel.findById(id)
  if(!application){
    throw new HttpException('The application you want to update was not found',HttpStatus.NOT_FOUND)
  }else{
    const fileUrls=[]
    for(let i=0;i<files.length;i++){
      const fileUrl=await cloudinary.uploader.upload(files[i].path,{public_id:files[i].originalname})
      fileUrls.push(fileUrl.url)
    }
    const updateApplication=await this.applicationModel.findByIdAndUpdate(id,{$set:{...UpdateApplicationDto,photos:fileUrls}},{new:true})
    return updateApplication
  }
}

// delete product application
async deleteApplication(id:string):Promise<string> {
  const application=await this.applicationModel.findById(id)
  if(!application){
    throw new HttpException('The application you want to uninstall was not found',HttpStatus.NOT_FOUND)
  }else{
    await this.applicationModel.findByIdAndDelete(id)
    return "The application has been deleted"
  }
}

// get single product application
  async getSingleApplication(id:string):Promise<Application>{
    const application=await this.applicationModel.findById(id)
  if(!application){
  throw new HttpException('Application not found',HttpStatus.NOT_FOUND)
  }else{
  return application
  }
}

// get all product application
  async getAllApplication():Promise<Application[]>{
    return await this.applicationModel.find()
  }

// create project
  async createProject(CreateProjectDto:createProjectDto,files:Express.Multer.File[]):Promise<Project>{
  const fileUrls=[]
  for(let i=0;i<files.length;i++){
    const fileUrl=await cloudinary.uploader.upload(files[i].path,{public_id:files[i].originalname})
    fileUrls.push(fileUrl.url)
  }
  const project=await this.projectModel.create({...CreateProjectDto,photos:fileUrls})
  return project
}

// update project
async updateProject(id:string,UpdateProjectDto:updateProjectDto,files:Express.Multer.File[]):Promise<Project>{
  const project=await this.projectModel.findById(id)
  if(!project){
    throw new HttpException('The project to be change was not found',HttpStatus.NOT_FOUND)
  }else{
    const fileUrls=[]
    for(let i=0;i<files.length;i++){
      const fileUrl=await cloudinary.uploader.upload(files[i].path,{public_id:files[i].originalname})
      fileUrls.push(fileUrl.url)
    }
    const updateProject=await this.projectModel.findByIdAndUpdate(id,{$set:{...UpdateProjectDto,photos:fileUrls}},{new:true})
    return updateProject
  }
}

// delete project
async deleteProject(id:string):Promise<string>{
  const project=await this.projectModel.findById(id)
  if(!project){
    throw new HttpException('The project you want to delete was not found',HttpStatus.NOT_FOUND)
  }else{
    await this.projectModel.findByIdAndDelete(id)
    return 'The project has been deleted'
  }
}

// get single project



}