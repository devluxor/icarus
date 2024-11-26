import { Asteroid } from "../@types/types";

type AsteroidTableProps = {
  asteroids: Asteroid[]
}

export function AsteroidTable ({ asteroids }: AsteroidTableProps) {
  
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
        </tr>
      </thead>
      <tbody>
        {asteroids.map(item => (
          <tr key={item.id} className="asteroid-table-row">
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.name}</td>
            <td>{item.estimatedDiameter || "N/A"}</td>
            <td>{item.absoluteMagnitude}</td>
            <td>{item.isDangerous ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
