import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { WhyOutdorr } from 'src/why-outdorr/model/whyoutdorr.schema';

@Injectable()
export class GuestService {
  constructor(@InjectModel('whyoutdorr') private whyOutdorrModel: Model<WhyOutdorr>,
    @InjectModel('subscribe') private subscribeModel: Model<Subscribe>
  ) { }

  // get all why-outdorr
  async getAllWhyOutdorr(): Promise<WhyOutdorr[]> {
    return await this.whyOutdorrModel.find().populate([{ path: 'about_outdorr', select: ['key', 'value'] }])
  }

  // create subscribe
  async createSubscribe(CreateSubscribeDto: createSubscribeDto): Promise<Subscribe> {
    const subscribeExist = await this.subscribeModel.findOne({ email: CreateSubscribeDto.email })
    if (subscribeExist) {
      throw new HttpException('The email address is already subscribed', HttpStatus.CONFLICT)
    }
    return await this.subscribeModel.create(CreateSubscribeDto)
  }

}
