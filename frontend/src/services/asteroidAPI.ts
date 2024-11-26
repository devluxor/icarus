import axios from "axios";
import config from "../ constants";
import { DateRange } from "../@types/types";

const axiosInstance = axios.create({
  baseURL: config.SERVER_URL
})

export const getAsteroids = async (range: DateRange) => {
  const {startDate, endDate}: DateRange = range
  
  try {
    const result = await axiosInstance.get(`?startDate=${startDate}&endDate=${endDate}`)
    return result.data
  } catch(error) {
    console.error(error)
  }
}