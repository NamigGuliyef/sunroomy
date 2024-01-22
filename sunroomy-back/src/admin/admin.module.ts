import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { aboutOutdorrModel } from '../about-outdorr/model/aboutoutdorr.schema';
import { applicationModel } from '../applications/model/application.schema';
import { contactModel } from '../contact/model/contact.schema';
import { featureModel } from '../features/model/feature.schema';
import { projectNeedModel } from '../needs/model/need.schema';
import { productModel } from '../product/model/product.schema';
import { projectModel } from '../projects/model/project.schema';
import { specificationModel } from '../specifications/model/specification.schema';
import { subProductModel } from '../subproduct/model/subproduct.schema';
import { subscribeModel } from '../subscribe/model/subscribe.schema';
import { usedProductsModel } from '../used-products/model/usedproduct.schema';
import { whyOutdorrModel } from '../why-outdorr/model/whyoutdorr.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProjectDesignModel } from '../project-design/model/projectdesign.schema';
import { ProjectDesignDetailsModel } from '../project-design-details/model/projectdesigndetails.schema';
import { requestProjectModel } from '../request-project/model/requestproject.schema';
import { LetUs_Inspire_YouModel } from '../letus-inspire-you/model/letus_inspire_you.schema';
import { aboutUsModel } from '../about-us/model/about_us.schema';

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
      { name: 'about_us', schema: aboutUsModel }
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
