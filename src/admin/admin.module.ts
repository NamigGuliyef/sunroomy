import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { featureModel } from 'src/features/model/feature.schema';
import { projectNeedModel } from 'src/needs/model/need.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { usedProductsModel } from 'src/used-products/model/usedProduct.schema';
import { applicationModel } from 'src/applications/model/application.schema';
import { projectModel } from 'src/projects/model/project.schema';
import { specificationModel } from 'src/specifications/model/specification.schema';
import { subProductModel } from 'src/subproduct/model/subproduct.schema';
import { productModel } from 'src/product/model/product.schema';
import { contactModel } from 'src/contact/model/contact.schema';
import { subscribeModel } from 'src/subscribe/model/subscribe.schema';
import { whyOutdorrModel } from 'src/why-outdorr/model/whyoutdorr.schema';
import { aboutOutdorrModel } from 'src/about-outdorr/model/aboutoutdorr.schema';

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
      { name: 'aboutoutdorr', schema: aboutOutdorrModel }
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
