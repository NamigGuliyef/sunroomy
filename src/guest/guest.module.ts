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
import { ProjectDesignModel } from 'src/project-design/model/projectdesign.schema';
import { ProjectDesignDetailsModel } from 'src/project-design-details/model/projectdesigndetails.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'whyoutdorr', schema: whyOutdorrModel },
  { name: 'subscribe', schema: subscribeModel }, { name: 'product', schema: productModel },
  { name: 'subproduct', schema: subProductModel }, { name: 'project', schema: projectModel }, { name: 'contact', schema: contactModel }, 
  { name: 'projectdesign', schema: ProjectDesignModel }, { name: 'projectdesigndetail', schema: ProjectDesignDetailsModel }])],
  providers: [GuestService],
  controllers: [GuestController]
})
export class GuestModule { }
