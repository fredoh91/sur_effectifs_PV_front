
import { SurEffectifsRow } from "../surEffectifs/SurEffectifsRow";

export function SurEffTable({ surEffectifs }) {
    const rows = [];
    for (let surEffectif of surEffectifs) {
      rows.push(
        <SurEffectifsRow surEffectif={surEffectif} key={surEffectif.id} />
      )
    }
  
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date signalement</th>
            <th>Substance</th>
            <th>Effectif max. sur 15 jours</th>
            <th>Qui ?</th>
            <th>Signalé</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }