import { useEffect, useState } from "react"
import { Asteroid, DateRange } from "./@types/types";
import { currentDate, sortAsteroidsByName } from "./helpers/helpers";
import { getAsteroids } from "./services/asteroidAPI";

import { AsteroidTable } from "./components/AsteroidTable";
import { TableControls } from "./components/TableControls";

function App() {
  const [asteroids, setAsteroids] = useState<Asteroid[] | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({startDate: currentDate(), endDate: currentDate() })

  useEffect(() => {
    const loadAsteroids = async () => {
      if (asteroids) {
        setAsteroids(null)
      }
      const asteroidsRaw = await getAsteroids(dateRange)
      setAsteroids(asteroidsRaw)
    }

    loadAsteroids()
  }, [dateRange])

  const handleDateRange = ({startDate, endDate}: DateRange) => {
    setDateRange({startDate, endDate})
  }

  return (
    <div className="main-container">
      <h1 className="title">🌠Icarus</h1>
      <h2 className="subtitle">Find your favourite asteroids!</h2>

      
      <TableControls 
        handleDateRange={handleDateRange}
        handleSortAsteroids={() => sortAsteroidsByName(asteroids as Asteroid[], setAsteroids)} 
      />

      {(asteroids && 
          <AsteroidTable 
            asteroids={asteroids}
        />) 
        || <h3>Loading asteroids...</h3>}

    </div>
  )
}




export default App
