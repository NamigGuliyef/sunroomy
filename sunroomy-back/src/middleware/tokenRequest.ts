import { Request } from 'express'
import { Admin } from 'src/admin/schema/admin.schema'

export interface tokenRequestType extends Request {
  admin: Admin
}
