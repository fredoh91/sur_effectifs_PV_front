import { useState } from 'react'


function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  

export function AddSurEffectif({ dataSurEff, updateDataSurEff }) {
    function genererNombreAleatoire(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      // Pour générer un nombre aléatoire entre 1 et 10 :
    //   let nombreAleatoire = genererNombreAleatoire(1, 10);
    const [formData, setFormData] = useState({
        dateSignalement: '',
        substance: '',
        effectifMax15Jours: '',
        qui: '',
        signale: true,
      });
    
    //   const handleChange = (event) => {
    //     setFormData({
    //       ...formData,
    //       [event.target.name]: event.target.value,
    //     });
    //   };
      const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        setFormData({
          ...formData,
          [name]: newValue,
        });
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
        // Ajouter les données du formulaire au tableau d'objets


        // const champsRemplis = (event.target.dateSignalement.value.trim())

        // console.log(champsRemplis)
        // console.log(event.target.dateSignalement.value)


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
                const newDataSurEff = [...dataSurEff];

                const newDate = new Date(event.target.dateSignalement.value.trim())
                const newDateFR = newDate.toLocaleDateString('fr-FR');


                newDataSurEff.push({ 

                    // dateSignalement: event.target.dateSignalement.value.trim(), 
                    dateSignalement: newDateFR, 
                    substance: event.target.substance.value.trim(),
                    effectifMax15Jours: event.target.effectifMax15Jours.value.trim(), 
                    qui: event.target.qui.value.trim(), 
                    signale: event.target.signale.checked
                    });

                updateDataSurEff(newDataSurEff);
                

                // Reset des champs de formulaire
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