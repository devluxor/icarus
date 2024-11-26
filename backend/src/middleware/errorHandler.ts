import { NextFunction, Request, Response } from "express";

import codes from '../utils/codes';

const errorHandler = (err: Error, req:Request, res:Response, next:NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const errorObject = {message: err.message, stackTrace: err.stack};
  switch (statusCode) {
    case codes.VALIDATION_ERROR:
      res.json({...errorObject, title: 'Invalid input'});
      break;
    case codes.NOT_FOUND:
      res.json({...errorObject, title: 'Not Found'});
      break;
    case codes.SERVER_ERROR:
      res.json({...errorObject, title: 'Server Error'});
      break;
  }
}

export default errorHandler;