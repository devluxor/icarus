import { NextFunction, Request, Response } from "express";
import { currentDate, isValidDateFormat, isValidDateRange, isDateRangeWithinAWeek } from "../utils/helpers";

const validateDateRange = (req:Request, res:Response, next: NextFunction) => {
  const startDate = req.query.startDate as string || currentDate();
  const endDate = req.query.endDate as string || currentDate();

  if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
    res.status(400);
    throw new Error('Invalid format date: must be YYYY-MM-DD');
  }

  if (!isValidDateRange(startDate, endDate)) {
    res.status(400);
    throw new Error('Start date must be earlier or equal to the end date!');
  }

  if (!isDateRangeWithinAWeek(startDate, endDate)) {
    res.status(400);
    throw new Error('Date ranges greater than a week are not allowed!');
  }

  req.headers['startDate'] = startDate;
  req.headers['endDate'] = endDate;

  next();
};

export default validateDateRange;