import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feature } from 'src/features/model/feature.schema';
import { Model} from 'mongoose';
import { createFeatureDto } from 'src/features/dto/feature.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel('feature') private featureModel: Model<Feature>) {}

  // create feature
  async createFeature(CreateFeatureDto:createFeatureDto,file:Express.Multer.File):Promise<Feature>{
    const featureExist = await this.featureModel.findOne({title:CreateFeatureDto.title})
    if(!featureExist){
      throw new HttpException('Feature already created',HttpStatus.CONFLICT)
    }else{
      const feature = await this.featureModel.create({...CreateFeatureDto,icon:file.originalname})
      return feature
    }
  }

}
