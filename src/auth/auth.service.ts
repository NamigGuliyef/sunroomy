import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/schema/admin.schema';
import { tokenRequestType } from 'src/middleware/tokenRequest';
import { adminSigninResponse, adminTokenResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(@InjectModel('admin') private adminModel: Model<Admin>, @Inject(REQUEST) private readonly req: tokenRequestType) { }

  // admin sign-in
  async signIn(AdminSigninResponse: adminSigninResponse): Promise<adminTokenResponse> {
    const adminExist = await this.adminModel.findOne({ email: AdminSigninResponse.email })
    if (!adminExist) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND)
    }
    const passRight = await this.adminModel.findOne({ password: AdminSigninResponse.password })
    if (!passRight) {
      throw new HttpException('You entered the password incorrectly', HttpStatus.BAD_REQUEST)
    } else {
      const token = sign({ email: adminExist.email }, 'outdoor2023secret', { expiresIn: '3h' })
      return { token, message: "You are successfully logged in" }
    }
  }
}