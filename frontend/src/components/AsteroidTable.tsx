import { MouseEvent } from "react";
import { Asteroid } from "../@types/types";

type AsteroidTableProps = {
  asteroids: Asteroid[],
  handleActiveAsteroid: (id: string) => void,
  toggleFavorite: (e: MouseEvent, id: string) => void,
  favouriteAsteroids: {
    [key: string]: boolean
  },
  isOnlyFavoritesMode: boolean
}

export function AsteroidTable ({ 
  asteroids, 
  handleActiveAsteroid, 
  toggleFavorite, 
  favouriteAsteroids, 
  isOnlyFavoritesMode 
}: AsteroidTableProps) {
  const displayedAsteroids = asteroids.filter(asteroid => {
    if (isOnlyFavoritesMode) {
      return favouriteAsteroids[asteroid.id];
    }

    return asteroid;
  })
  
  if (displayedAsteroids.length === 0) return <h4>No Favourite Asteroids yet!</h4>

  return (
    <table className="asteroid-table">
      <caption>
        *In meters<br/>
        **Measure of the asteroid's brightness (lower values = brighter)
      </caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Official Name</th>
          <th>Estimated Diameter*</th>
          <th>Apparent Magnitude**</th>
          <th>Is Dangerous</th>
          <th>Favourite</th>
        </tr>
      </thead>
      <tbody>
        {displayedAsteroids.map(item => (
          <tr key={item.id} className="asteroid-table-row" onClick={() => handleActiveAsteroid(item.id)}>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.name}</td>
            <td>{item.estimatedDiameter || "N/A"}</td>
            <td>{item.absoluteMagnitude}</td>
            <td>{item.isDangerous ? "Yes" : "No"}</td>
            <td onClick={(e) => toggleFavorite(e, item.id)}>{favouriteAsteroids[item.id] && '⭐'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
