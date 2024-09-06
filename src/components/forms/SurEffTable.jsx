import { SurEffectifsRow } from "../surEffectifs/SurEffectifsRow";

export function SurEffTable({ surEffectifs, onDelete, onModif }) {
  const rows = [];
  for (let surEffectif of surEffectifs) {
    rows.push(
      <SurEffectifsRow
        surEffectif={surEffectif}
        onDelete={onDelete}
        onModif={onModif}
        key={surEffectif.id}
      />
    );
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
          <th>Supp.</th>
          <th>Modif.</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
