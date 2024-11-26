import { useEffect, useState } from "react"
import { Asteroid, DateRange, FavouriteAsteroids } from "./@types/types";
import { currentDate, sortAsteroidsByName } from "./helpers/helpers";
import { getAsteroids } from "./services/asteroidAPI";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { AsteroidTable } from "./components/AsteroidTable";
import { TableControls } from "./components/TableControls";
import { AsteroidDetails } from "./components/AsteroidDetails";

function App() {
  const [asteroids, setAsteroids] = useState<Asteroid[] | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({startDate: currentDate(), endDate: currentDate() })
  const [activeAsteroid, setActiveAsteroid] = useState<Asteroid | undefined>(undefined)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [favouriteAsteroids, setFavouriteAsteroids] = useLocalStorage<FavouriteAsteroids>('icarus-favourite-asteroids', {})


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

  const toggleOverlay = () => {
    if (activeAsteroid) {
      setActiveAsteroid(undefined)
    }

    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleActiveAsteroid = (id: string) => {
    const clickedAsteroid = asteroids?.find(asteroid => asteroid.id === id)
    if (!clickedAsteroid) return

    setActiveAsteroid(clickedAsteroid)
    toggleOverlay()
  }


  return (
    <div className="main-container">
      <h1 className="title">🌠Icarus</h1>
      <h2 className="subtitle">Find your favourite asteroids!</h2>

      
      <TableControls 
        handleDateRange={handleDateRange}
        handleSortAsteroids={() => sortAsteroidsByName(asteroids as Asteroid[], setAsteroids)} 
      />

      {
        (
          asteroids && 
            <AsteroidTable 
              asteroids={asteroids}
              handleActiveAsteroid={handleActiveAsteroid}
            />
        ) || <h3>Loading asteroids...</h3>
      }

      {isOverlayVisible && activeAsteroid && <Overlay activeAsteroid={activeAsteroid} toggleOverlay={toggleOverlay}/>}
    </div>
  )
}

type OverlayProps = {
  activeAsteroid: Asteroid,
  toggleOverlay: () => void,
}

function Overlay({activeAsteroid, toggleOverlay}:OverlayProps) {
  return (
    <div className='overlay' onClick={toggleOverlay}>
      <AsteroidDetails asteroid={activeAsteroid} toggleOverlay={toggleOverlay} />
    </div>
  )
}

export default App
