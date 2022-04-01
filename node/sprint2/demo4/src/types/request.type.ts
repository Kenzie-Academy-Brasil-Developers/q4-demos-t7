import { Request } from "express";

interface IRequest extends Request {
  validated: any
}

export default IRequest
