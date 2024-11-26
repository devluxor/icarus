export type DestructuredAsteroid = {
  id: string, 
  name: string, 
  nasa_jpl_url: string, 
  absolute_magnitude_h: string, 
  estimated_diameter: {
    [key: string]: {[key: string]: number}
  }, 
  is_potentially_hazardous_asteroid: boolean,
  orbital_data: {
    [key: string]: string | number | {}
  }
}

type SimplifiedAsteroid = {
  id: string, 
  name: string, 
  date: string,
  estimatedDiameter: number, 
  absoluteMagnitude: string,
  isDangerous: boolean
}

export const processAsteroids = (asteroidDates: any) => {
  const asteroids: SimplifiedAsteroid[] = [];
  const dates = Object.keys(asteroidDates);

  dates.forEach((dateKey: string) => {
    asteroidDates[dateKey].forEach(
      ({id, 
        name, 
        absolute_magnitude_h, 
        estimated_diameter,
        is_potentially_hazardous_asteroid
      }:DestructuredAsteroid) => {
      asteroids.push(
        {
          id, 
          name: name.replace(/[\(\)]/g, ''), 
          date: dateKey,
          estimatedDiameter: averageDiameter(estimated_diameter.meters),
          absoluteMagnitude: absolute_magnitude_h, 
          isDangerous: is_potentially_hazardous_asteroid 
        })
    });

  });

  return asteroids;
}

export const currentDate = () => {
  const date = new Date();
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate;
}

export const averageDiameter = (estimated_diameter: any) => {
  const {estimated_diameter_min, estimated_diameter_max} = estimated_diameter;

  return (estimated_diameter_min + estimated_diameter_max / 2).toFixed(2);
}

export const isValidDateFormat = (dateString: string) => {

  // Regular expression to check the format YYYY-MM-DD
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
  if (!dateRegex.test(dateString)) {
      return false
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
      return false;
  }
  
  // Check if the day is valid for the month and year
  const daysInMonth = new Date(year, month, 0).getDate(); // Get the last day of the month
  if (day > daysInMonth) {
      return false;
  }

  return true;
}

export const isValidDateRange = (startDate:string, endDate:string) => {
  const epochStartDate = new Date(startDate).getTime();
  const epochEndDate = new Date(endDate).getTime();

  return epochStartDate <= epochEndDate;
}

export const isDateRangeWithinAWeek = (startDate: string, endDate: string) => {
  const daysInAWeek = 7;
  let daysOfDifference =(new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000;
  // converts from milliseconds to days
  daysOfDifference /= (60 * 60 * 24); 
  return Math.abs(Math.round(daysOfDifference)) <= daysInAWeek;
}

export const fetchWithTimeout = async (url: string, timeout = 8000):Promise<any> => {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), timeout)
  )

  return Promise.race([fetch(url), timeoutPromise]);
}

export const processAsteroidDetails = (asteroid: DestructuredAsteroid) => {
  const {id, name, estimated_diameter, is_potentially_hazardous_asteroid, nasa_jpl_url, orbital_data} = asteroid;

  return {
    id,
    name: name.replace(/[\(\)]/g, ''),
    estimatedDiameter: averageDiameter(estimated_diameter.meters),
    nasaURL: nasa_jpl_url, 
    isDangerous: is_potentially_hazardous_asteroid,
    firstTimeSeen: orbital_data.first_observation_date, 
  }
}
