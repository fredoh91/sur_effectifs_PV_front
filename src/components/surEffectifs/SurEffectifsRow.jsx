/**
 * 
 * @param {dateSignalement: Date, substance: string, effectifMax15Jours: integer, qui: string, signale: boolean} surEffectif 
 * @returns 
 */
export function SurEffectifsRow ({surEffectif}) {

    const style = surEffectif.signale ? {color: 'red'}: {color: 'green'}

    return <tr>
        <td>{surEffectif.dateSignalement}</td>
        <td style={style}>{surEffectif.substance}</td>
        <td>{surEffectif.effectifMax15Jours}</td>
        <td>{surEffectif.qui}</td>
        <td>{surEffectif.signale ? 'Oui' : 'Non'}</td>
    </tr>
}