import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { contactModel } from '../contact/model/contact.schema';
import { productModel } from '../product/model/product.schema';
import { projectModel } from '../projects/model/project.schema';
import { subProductModel } from '../subproduct/model/subproduct.schema';
import { subscribeModel } from '../subscribe/model/subscribe.schema';
import { whyOutdorrModel } from '../why-outdorr/model/whyoutdorr.schema';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { ProjectDesignModel } from '../project-design/model/projectdesign.schema';
import { ProjectDesignDetailsModel } from '../project-design-details/model/projectdesigndetails.schema';
import { requestProjectModel } from '../request-project/model/requestproject.schema';
import { LetUs_Inspire_YouModel } from '../letus-inspire-you/model/letus_inspire_you.schema';
import { aboutUsModel } from '../about-us/model/about_us.schema';
import { homeAboutUsModel } from '../home_about_us/model/home_about_us.schema';
import { HomepageHeroModel } from '../homepage_hero/model/homepage_hero.schema';
import { FollowUs } from '../follow_us/model/followus.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'whyoutdorr', schema: whyOutdorrModel },
  { name: 'subscribe', schema: subscribeModel }, { name: 'product', schema: productModel },
  { name: 'subproduct', schema: subProductModel }, { name: 'project', schema: projectModel }, { name: 'contact', schema: contactModel },
  { name: 'projectdesign', schema: ProjectDesignModel }, { name: 'projectdesigndetail', schema: ProjectDesignDetailsModel },
  { name: 'requestproject', schema: requestProjectModel }, { name: 'letus_inspire_you', schema: LetUs_Inspire_YouModel }, { name: 'about_us', schema: aboutUsModel },
  { name: 'home_about_us', schema: homeAboutUsModel },{ name: 'homepage_hero', schema: HomepageHeroModel },{name:'follow_us',schema:FollowUs} ])],
  providers: [GuestService],
  controllers: [GuestController]
})
export class GuestModule { }
