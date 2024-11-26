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
      <div className="details-title">
        <h1 className="name">{asteroid.name}</h1>
        <p className="logo">🌠</p>
      </div>
      {(
        asteroidDetails &&
        <>
          <ul>
            <li className="id">ID: {asteroid.id}</li>
            <li className="last-seen">First time seen: {asteroidDetails.firstTimeSeen}</li>
            <li className="last-seen">Last time seen: {asteroid.date}</li>
            <li className="diameter" >Estimated diameter: {asteroid.estimatedDiameter}m</li>
            <li className="magnitude">Absolute magnitude: {asteroid.absoluteMagnitude}</li>
            <li className="dangerous">Is it dangerous?: {asteroid.isDangerous ? 'Yes' : 'No'}</li>
          <li><a href={asteroidDetails.nasaURL} target="_blank">Link to NASA detailed page</a></li>
          </ul>
        </> 
       ) || <p>Details loading...</p>}

       <button className="details-close" onClick={toggleOverlay}>Close</button>
    </div>
  )
}