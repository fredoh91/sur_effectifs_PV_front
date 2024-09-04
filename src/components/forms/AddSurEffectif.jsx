import { useState } from 'react'
import { fetchFromAPI_GetAll,fetchFromAPI_CreateSurEff } from '../../api/api';
import { convDateFrancaiseEnISO, normalizeString } from '../../utils/utils'

export function AddSurEffectif({ dataSurEff, updateDataSurEff, setDataAPI, setLoad }) {
    // function genererNombreAleatoire(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    //   }
      
      // Pour générer un nombre aléatoire entre 1 et 10 :
    //   let nombreAleatoire = genererNombreAleatoire(1, 10);
    const [formData, setFormData] = useState({
        dateSignalement: '',
        substance: '',
        effectifMax15Jours: '',
        qui: '',
        signale: true,
      });
    

      const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        const newSurEff = {
          ...formData,
          [name]: newValue,
        }

        setFormData(newSurEff);

      };

      const handleReset = () => {
        setFormData({
          dateSignalement: '',
          substance: '',
          effectifMax15Jours: '',
          qui: '',
          signale: true,
        });
      };

      const handleSubmit = (event) => {
        event.preventDefault();

        const listeChamps = ["dateSignalement","substance","effectifMax15Jours","qui"]
        let auMoinsUnChpVide = false
        let listeChampsARemplir = ""
        for (let chp of listeChamps) {
            // console.log(chp)
            if (!event.target[chp].value.trim()) {
                auMoinsUnChpVide = true
                listeChampsARemplir = listeChampsARemplir === "" ? " - " + chp : listeChampsARemplir + "\n - " + chp 
            }
        }
        
        const substanceDejaSignalee = dataSurEff.some(item => normalizeString(item.substance.toLowerCase()) === normalizeString(event.target.substance.value.trim().toLowerCase()));


        if (!auMoinsUnChpVide) {
            if (!substanceDejaSignalee) {

                const newDate = new Date(event.target.dateSignalement.value.trim())
                const newDateFR = newDate.toLocaleDateString('fr-FR');
                const currentDate = new Date().toISOString()


                const newline = {  
                    dateSignalement: convDateFrancaiseEnISO(newDateFR), 
                    substance: event.target.substance.value.trim(),
                    effectifMax15Jours: Number(event.target.effectifMax15Jours.value.trim()), 
                    qui: event.target.qui.value.trim(), 
                    signale: event.target.signale.checked,
                    createdAt: currentDate,
                    updatedAt: currentDate
                  }
                
                const fetchAddSurEff = async (newline) => {

                  // console.log("newLine : " , newline)
                  try {
                    const dataAPI_reformat = await fetchFromAPI_CreateSurEff(newline);

                    if (dataAPI_reformat===201) {
                      // la création a bien fonctionné
                      setLoad(false);

                      // On recharge 
                      try {
                        const dataAPI_reformat = await fetchFromAPI_GetAll();
                        setDataAPI(dataAPI_reformat);
                        setLoad(true);
                      } catch (error) {
                        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
                        setLoadingError(true)
                      }
                      
                    }
                  } catch (error) {
                    console.error('Une erreur s\'est produite lors de la récupération des données :', error);
                    setLoadingError(true)
                  }
                };
        
                fetchAddSurEff(newline)

                handleReset()

            } else {
                alert("Cette substance a déjà été signalée.")
            }
        } else {
            alert("Tous les champs suivants doivent etre remplis : \n" + listeChampsARemplir)
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="dateSignalement"
            value={formData.dateSignalement}
            onChange={handleChange}
          />
          <input
            type="text"
            name="substance"
            value={formData.substance}
            onChange={handleChange}
          />
          <input
            type="number"
            name="effectifMax15Jours"
            value={formData.effectifMax15Jours}
            onChange={handleChange}
          />

        <select name="qui" value={formData.qui} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="Anne-Marine">Anne-Marine</option>
            <option value="Priscilla">Priscilla</option>
            <option value="Serge">Serge</option>
            <option value="Fred">Fred</option>
        </select>          
          <input
            type="checkbox"
            name="signale"
            checked={formData.signale}
            // value={if (formData.signale) {checked} else {undefined}}
            onChange={handleChange}
          />
          <button type="submit">Valider</button>
        </form>
      );

}