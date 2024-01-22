import { Request } from 'express'
import { Admin } from '../admin/schema/admin.schema'

export interface tokenRequestType extends Request {
  admin: Admin
}
