import { Asteroid } from "../@types/types"

type AsteroidDetailsProps = {
  asteroid: Asteroid,
  toggleOverlay: () => void,
}

export function AsteroidDetails({asteroid, toggleOverlay}: AsteroidDetailsProps) {


  return (
    <div className="asteroid-details" onClick={(e) => e.stopPropagation()}>
      <h2>{asteroid.id}</h2>
      <button onClick={toggleOverlay}>Close</button>
    </div>
  )
}