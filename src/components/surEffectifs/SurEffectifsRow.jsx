import { Link } from "react-router-dom";

/**
 * 
 * @param {dateSignalement: Date, substance: string, effectifMax15Jours: integer, qui: string, signale: boolean} surEffectif 
 * @returns 
 */
export function SurEffectifsRow ({surEffectif, onDelete, onModif }) {

    const style = surEffectif.signale ? {color: 'red'}: {color: 'green'}

    return <tr>
        <td>{surEffectif.dateSignalement}</td>
        <td style={style}>{surEffectif.substance}</td>
        <td>{surEffectif.effectifMax15Jours}</td>
        <td>{surEffectif.qui}</td>
        <td>{surEffectif.signale ? 'Oui' : 'Non'}</td>
        {/* <td><button onClick={()=> onDelete()} type="button" className="btn btn-outline-danger btn-sm">Supp.</button></td> */}
        <td><button onClick={()=> onDelete(surEffectif.id)} type="button" className="btn btn-outline-danger btn-sm">Supp.</button></td>
        {/* <td><button onClick={()=> onModif(surEffectif.id)} type="button" className="btn btn-outline-primary btn-sm">Modif.</button></td> */}
        <td>
            <Link 
                to={`/modif/${surEffectif.id}`}
                className="btn btn-outline-primary btn-sm"
            >
                Modif.
            </Link>
        </td>
    </tr>
}