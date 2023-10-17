import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feature } from 'src/features/model/feature.schema';
import { Model } from 'mongoose';
import { createFeatureDto, updateFeatureDto } from 'src/features/dto/feature.dto';
import { ProjectNeed } from 'src/needs/model/need.schema';
import { createProjectNeedDto, updateProjectNeedDto } from 'src/needs/dto/need.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel('feature') private featureModel: Model<Feature>,
    @InjectModel('feature') private projectNeedModel: Model<ProjectNeed>) { }

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
    return await this.featureModel.findById(id)
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
      const updateProjectNeed = await this.projectNeedModel.findByIdAndUpdate(id, { $set: { UpdateProjectNeedDto } }, { new: true })
      return updateProjectNeed
    }

  }
}
