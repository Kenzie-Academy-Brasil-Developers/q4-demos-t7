import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import Lazy from "yup/lib/Lazy";

const validateShape =
  (shape: AnySchema | Lazy<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await shape.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.validated = validated;

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
  };

export default validateShape;
