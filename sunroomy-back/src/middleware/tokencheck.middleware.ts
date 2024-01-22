import { NestMiddleware, HttpException, HttpStatus } from '@nestjs/common'
import { Response, NextFunction } from 'express'
import { tokenRequestType } from './tokenRequest'
import { verify } from 'jsonwebtoken'
import { Admin } from '../admin/schema/admin.schema'


export class tokenCheckMiddleware implements NestMiddleware {
  use(req: tokenRequestType, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new HttpException('Not found token', HttpStatus.NOT_FOUND)
    } else {
      verify(token, 'outdoor2023secret', (err, admin: Admin) => {
        if (err) {
          throw new HttpException('Invalid Authorization Token', HttpStatus.FORBIDDEN)
        } else {
          req.admin = admin
          next()
        }
      })
    }
  }
}