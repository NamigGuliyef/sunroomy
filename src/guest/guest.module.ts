import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { contactModel } from 'src/contact/model/contact.schema';
import { productModel } from 'src/product/model/product.schema';
import { projectModel } from 'src/projects/model/project.schema';
import { subProductModel } from 'src/subproduct/model/subproduct.schema';
import { subscribeModel } from 'src/subscribe/model/subscribe.schema';
import { whyOutdorrModel } from 'src/why-outdorr/model/whyoutdorr.schema';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'whyoutdorr', schema: whyOutdorrModel },
  { name: 'subscribe', schema: subscribeModel }, { name: 'product', schema: productModel },
  { name: 'subproduct', schema: subProductModel }, { name: 'project', schema: projectModel }, { name: 'contact', schema: contactModel }])],
  providers: [GuestService],
  controllers: [GuestController]
})
export class GuestModule { }
