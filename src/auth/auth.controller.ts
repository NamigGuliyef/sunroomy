import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { adminSigninResponse, adminTokenResponse } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async signIn(@Body() AdminSigninResponse: adminSigninResponse): Promise<adminTokenResponse> {
    return await this.authService.signIn(AdminSigninResponse)
  }

}
