import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchFromAPI_GetOne, fetchFromAPI_ReplaceSurEff } from "../api/api";
import { convDateFrancaiseEnISO, getSQLDatetime } from "../utils/utils";

export function Modifier() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataAPI, setDataAPI] = useState(null);
  const [load, setLoad] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const [formData, setFormData] = useState({
    dateSignalement: "",
    substance: "",
    effectifMax15Jours: "",
    qui: "",
    signale: true,
  });

  const formateDate = (dateEntree) => {
    const [day, month, year] = dateEntree.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const fetchGetOneSurEff = async (id) => {
    try {
      const dataAPI = await fetchFromAPI_GetOne(id);
      const dataAPI_reformat = {
        dateSignalement: formateDate(dataAPI.dateSignalement),
        substance: dataAPI.substance,
        effectifMax15Jours: dataAPI.effectifMax15Jours,
        qui: dataAPI.qui,
        signale: dataAPI.signale,
      };
      setDataAPI(dataAPI_reformat);
      setLoad(true);

      setFormData(dataAPI_reformat);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération des données :",
        error
      );
      setLoadingError(true);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGetOneSurEff(id);
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    const newSurEff = {
      ...formData,
      [name]: newValue,
    };
    setFormData(newSurEff);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const listeChamps = [
      "dateSignalement",
      "substance",
      "effectifMax15Jours",
      "qui",
    ];
    let auMoinsUnChpVide = false;
    let listeChampsARemplir = "";
    for (let chp of listeChamps) {
      if (!event.target[chp].value.trim()) {
        auMoinsUnChpVide = true;
        listeChampsARemplir =
          listeChampsARemplir === ""
            ? " - " + chp
            : listeChampsARemplir + "\n - " + chp;
      }
    }

    if (!auMoinsUnChpVide) {
      const newDate = new Date(event.target.dateSignalement.value.trim());
      const newDateFR = newDate.toLocaleDateString("fr-FR");
      // const currentDate = new Date().toISOString()
      const currentDate = getSQLDatetime();

      const newline = {
        dateSignalement: convDateFrancaiseEnISO(newDateFR),
        substance: event.target.substance.value.trim(),
        effectifMax15Jours: Number(
          event.target.effectifMax15Jours.value.trim()
        ),
        qui: event.target.qui.value.trim(),
        signale: event.target.signale.checked,
        updatedAt: currentDate,
      };

      const fetchModifSurEff = async () => {
        try {
          const dataAPI_reformat = await fetchFromAPI_ReplaceSurEff(
            id,
            newline
          );

          if (dataAPI_reformat === 200) {
            // la création a bien fonctionné
            // on redirige vers la page avec le tableau des médicaments
            navigate("/");
          }
        } catch (error) {
          console.error(
            "Une erreur s'est produite lors de la récupération des données :",
            error
          );
          setLoadingError(true);
        }
      };

      fetchModifSurEff(newline);
    } else {
      alert(
        "Tous les champs suivants doivent etre remplis : \n" +
          listeChampsARemplir
      );
    }
  };

  return (
    <div>
      <h1>Modification de l'enregistrement ayant l'id {id}</h1>
      {loadingError && <div>Erreur de chargement</div>}
      {load ? (
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
            onChange={handleChange}
          />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <div>
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
          <p>Chargement en cours...</p>
        </div>
      )}
      <Link to="/">Retour</Link>
    </div>
  );
}
