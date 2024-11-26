import { useState, useEffect } from "react"
import { Asteroid } from "../@types/types"
import { getAsteroidDetails } from "../services/asteroidAPI"

type AsteroidDetailsProps = {
  asteroid: Asteroid,
  toggleOverlay: () => void,
}

export function AsteroidDetails({asteroid, toggleOverlay}: AsteroidDetailsProps) {
  const [asteroidDetails, setAsteroidDetails] = useState<any>(null)

  useEffect(() => {
    const loadAsteroidDetails = async () => {
      const asteroidDetails = await getAsteroidDetails(asteroid.id)
      setAsteroidDetails(asteroidDetails)
    }
    loadAsteroidDetails()
  }, [])

  return (
    <div className="asteroid-details" onClick={(e) => e.stopPropagation()}>
      <h2>{asteroid.id}</h2>

      {(
        asteroidDetails &&
        <>
          <p>{asteroidDetails.name}</p>
          <p>🌠</p>
          <a href={asteroidDetails.nasaURL} target="_blank">Link to NASA detailed page</a>
        </> 
       ) || <p>Asteroid loading...</p>}

      <button onClick={toggleOverlay}>Close</button>
    </div>
  )
}