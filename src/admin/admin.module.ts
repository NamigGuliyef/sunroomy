import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { aboutOutdorrModel } from 'src/about-outdorr/model/aboutoutdorr.schema';
import { applicationModel } from 'src/applications/model/application.schema';
import { contactModel } from 'src/contact/model/contact.schema';
import { featureModel } from 'src/features/model/feature.schema';
import { projectNeedModel } from 'src/needs/model/need.schema';
import { productModel } from 'src/product/model/product.schema';
import { projectModel } from 'src/projects/model/project.schema';
import { specificationModel } from 'src/specifications/model/specification.schema';
import { subProductModel } from 'src/subproduct/model/subproduct.schema';
import { subscribeModel } from 'src/subscribe/model/subscribe.schema';
import { usedProductsModel } from 'src/used-products/model/usedproduct.schema';
import { whyOutdorrModel } from 'src/why-outdorr/model/whyoutdorr.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ProjectDesignModel } from 'src/project-design/model/projectdesign.schema';
import { ProjectDesignDetailsModel } from 'src/project-design-details/model/projectdesigndetails.schema';
import { requestProjectModel } from 'src/request-project/model/requestproject.schema';

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
      { name: 'requestproject', schema: requestProjectModel }
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
