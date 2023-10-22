import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { adminModel } from 'src/admin/schema/admin.schema';
import { featureModel } from 'src/features/model/feature.schema';
import { projectNeedModel } from 'src/needs/model/need.schema';
import { usedProductsModel } from 'src/used-products/model/usedProduct.schema';
import { applicationModel } from 'src/applications/model/application.schema';
import { projectModel } from 'src/projects/model/project.schema';
import { specificationModel } from 'src/specifications/model/specification.schema';
import { subProductModel } from 'src/subproduct/model/subproduct.schema';
import { productModel } from 'src/product/model/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'admin', schema: adminModel },
      { name: 'feature', schema: featureModel },
      { name: "projectneed", schema: projectNeedModel },
      { name: 'usedproducts', schema: usedProductsModel },
      { name: 'application', schema: applicationModel },
      { name: 'project', schema: projectModel },
      { name: 'specification', schema: specificationModel },
      { name: 'subproduct', schema: subProductModel },
      { name: 'product', schema: productModel }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
