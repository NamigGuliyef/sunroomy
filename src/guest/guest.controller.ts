import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { WhyOutdorr } from 'src/why-outdorr/model/whyoutdorr.schema';
import { GuestService } from './guest.service';

@Controller('')
export class GuestController {
  constructor(private guestService: GuestService){}

  @Get('/why-outdorr')
  @HttpCode(HttpStatus.OK)
  async getAllWhyOutdorr(): Promise<WhyOutdorr[]> {
    return await this.guestService.getAllWhyOutdorr()
  }

  @Post('/subscribers')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createSubscribe(@Body() CreateSubscribeDto: createSubscribeDto): Promise<Subscribe> {
    return await this.guestService.createSubscribe(CreateSubscribeDto)
  }

}
