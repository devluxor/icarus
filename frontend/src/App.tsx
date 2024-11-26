import { useEffect, useState } from "react"
import { Asteroid, DateRange } from "./@types/types";
import { currentDate } from "./helpers/helpers";
import { getAsteroids } from "./services/asteroidAPI";


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

  return (
    <div className="main-container">
      <h1 className="title">🌠Icarus</h1>
      <h2 className="subtitle">Find your favourite asteroids!</h2>
    </div>
  )
}




export default App
