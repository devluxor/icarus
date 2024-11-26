import { MouseEvent, useState } from "react"
import { currentDate, isValidDateRange, isDateRangeWithinAWeek } from "../helpers/helpers"
import { DateRange } from "../@types/types"

type TableControlsProps = {
  handleDateRange: (range: DateRange) => void
  handleSortAsteroids: () => void
  handleToggleFavouriteAsteroids: () => void
  isOnlyFavoritesMode: boolean
}

export function TableControls({isOnlyFavoritesMode, handleDateRange, handleSortAsteroids, handleToggleFavouriteAsteroids}:TableControlsProps) {
  const [startDate, setStartDate] = useState(currentDate());
  const [endDate, setEndDate] = useState(currentDate());
  const minDate = "1900-01-01"; // NASA does not have records before this day
  const maxDate = currentDate();

  const handleStartDate = (start: string) => {
    setStartDate(start);
  }

  const handleEndDate = (end: string) => {
    setEndDate(end);
  }

  const handleDateRangeSubmission = (e: MouseEvent) => {
    e.preventDefault();

    if (!isValidDateRange({startDate, endDate})) {
      alert('The start date of the range must be earlier or equal to the end date!');
      return;
    } else if (!isDateRangeWithinAWeek({startDate, endDate})) {
      alert('The range must be equal or shorter than a week!');
      return;
    }

    handleDateRange({startDate, endDate});
  }

  return (
    <div className="table-controls">
      <form>
        <label htmlFor="start-date">Start date:</label>
        <input 
          type="date" 
          id="start-date" 
          name="start-date" 
          value={startDate} 
          min={minDate} 
          max={maxDate} 
          onChange={(e) => handleStartDate(e.target.value)}
        />

        <label htmlFor="end-date">End date:</label>
        <input 
          type="date" 
          id="end-date" 
          name="end-date" 
          value={endDate} 
          min={minDate} 
          max={maxDate}
          onChange={(e) => handleEndDate(e.target.value)}
        />
        <button 
          type="submit"
          onClick={(e) => handleDateRangeSubmission(e)}
          >Search by date</button>
      </form>
      <button className='sort-button' onClick={handleSortAsteroids}>Sort by name</button>
      <button className='show-favourites-button' onClick={handleToggleFavouriteAsteroids}>
        {isOnlyFavoritesMode? 'Display All Asteroids': 'Show Only Favourite Asteroids'}
      </button>
    </div>
  )
}


