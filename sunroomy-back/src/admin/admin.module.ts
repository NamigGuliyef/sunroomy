import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { aboutOutdorrModel } from '../about-outdorr/model/aboutoutdorr.schema';
import { aboutUsModel } from '../about-us/model/about_us.schema';
import { applicationModel } from '../applications/model/application.schema';
import { contactModel } from '../contact/model/contact.schema';
import { featureModel } from '../features/model/feature.schema';
import { followUsModel } from '../follow_us/model/followus.schema';
import { HomepageHeroModel } from '../homepage_hero/model/homepage_hero.schema';
import { homeAboutUsModel } from '../home_about_us/model/home_about_us.schema';
import { LetUs_Inspire_YouModel } from '../letus-inspire-you/model/letus_inspire_you.schema';
import { projectNeedModel } from '../needs/model/need.schema';
import { productModel } from '../product/model/product.schema';
import { ProjectDesignDetailsModel } from '../project-design-details/model/projectdesigndetails.schema';
import { ProjectDesignModel } from '../project-design/model/projectdesign.schema';
import { projectModel } from '../projects/model/project.schema';
import { requestProjectModel } from '../request-project/model/requestproject.schema';
import { RequestQuoteModel } from '../request_quote/model/request_quote.schema';
import { specificationModel } from '../specifications/model/specification.schema';
import { subproductCustomItemModel } from '../subproduct-customItem/model/subproduct_customItem.schema';
import { subproductPlacementItemModel } from '../subproduct-placementItem/model/subproduct_placementItem.schema';
import { subProductModel } from '../subproduct/model/subproduct.schema';
import { subproductCustomModel } from '../subproduct_custom/model/subproduct_custom.schema';
import { subproductPlacementModel } from '../subproduct_placement/model/subproduct_placement.schema';
import { subscribeModel } from '../subscribe/model/subscribe.schema';
import { usedProductsModel } from '../used-products/model/usedproduct.schema';
import { whyOutdorrModel } from '../why-outdorr/model/whyoutdorr.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'feature', schema: featureModel },
      { name: 'projectneed', schema: projectNeedModel },
      { name: 'usedproducts', schema: usedProductsModel },
      { name: 'application', schema: applicationModel },
      { name: 'project', schema: projectModel },
      { name: 'specification', schema: specificationModel },
      { name: 'subproduct', schema: subProductModel },
      { name: 'product', schema: productModel },
      { name: 'contact', schema: contactModel },
      { name: 'subscribe', schema: subscribeModel },
      { name: 'whyoutdorr', schema: whyOutdorrModel },
      { name: 'aboutoutdorr', schema: aboutOutdorrModel },
      { name: 'projectdesign', schema: ProjectDesignModel },
      { name: 'projectdesigndetail', schema: ProjectDesignDetailsModel },
      { name: 'requestproject', schema: requestProjectModel },
      { name: 'letus_inspire_you', schema: LetUs_Inspire_YouModel },
      { name: 'about_us', schema: aboutUsModel },
      { name: 'home_about_us', schema: homeAboutUsModel },
      { name: 'homepage_hero', schema: HomepageHeroModel },
      { name: 'follow_us', schema: followUsModel },
      { name: 'subproduct_custom', schema: subproductCustomModel },
      { name: 'subproduct_customItem', schema: subproductCustomItemModel },
      { name: 'subproduct_placement', schema: subproductPlacementModel },
      { name: 'request_quote', schema: RequestQuoteModel }
      
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule { }
