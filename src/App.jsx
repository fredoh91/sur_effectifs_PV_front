import { useState, useEffect } from "react"
import "./App.css"
// import { Input } from "./components/forms/Input"
import { AddSurEffectif } from "./components/forms/AddSurEffectif"
import { SurEffTable } from "./components/forms/SurEffTable"
import { SearchBar } from "./components/forms/SearchBar"

// import { fetchFromAPI } from "./api/api";
// import { fetchFromAPI } from './api/api_axios'

// const SUR_EFFECTIFS = [
// 	{dateSignalement: "01/08/2024", substance : "DENOSUMAB", effectifMax15Jours: 4, qui: "Serge", signale: true},
// 	{dateSignalement: "01/08/2024", substance : "IOHEXOL", effectifMax15Jours: 4, qui: "Serge", signale: true},
// 	{dateSignalement: "01/08/2024", substance : "VENLAFAXINE", effectifMax15Jours: 5, qui: "Serge", signale: true},
// 	{dateSignalement: "01/08/2024", substance : "CARBOXYMALTOSE FERRIQUE", effectifMax15Jours: 10, qui: "Serge", signale: true},
// 	{dateSignalement: "05/08/2024", substance : "ATOVAQUONE", effectifMax15Jours: 4, qui: "Fred", signale: true},
// 	{dateSignalement: "05/08/2024", substance : "TENOFOVIR ALAFENAMID", effectifMax15Jours: 4, qui: "Fred", signale: true},
// 	{dateSignalement: "05/08/2024", substance : "LENALIDOMIDE", effectifMax15Jours: 6, qui: "Fred", signale: true},
// 	{dateSignalement: "06/08/2024", substance : "METHYLPREDNISOLONE", effectifMax15Jours: 6, qui: "Prisci", signale: true},
// 	{dateSignalement: "06/08/2024", substance : "LEVOFLOXACINE", effectifMax15Jours: 14, qui: "Prisci", signale: true},
// 	{dateSignalement: "06/08/2024", substance : "BORAX", effectifMax15Jours: 7, qui: "Prisci", signale: true},
// 	{dateSignalement: "09/08/2024", substance : "CLAVULANATE POTASSIQUE", effectifMax15Jours: 14, qui: "Fred", signale: true},
// ]

const SUR_EFFECTIFS = [
  {
    id: 1,
    dateSignalement: "01/08/2024",
    substance: "DENOSUMAB",
    effectifMax15Jours: 4,
    qui: "Serge",
    signale: true,
  },
  {
    id: 2,
    dateSignalement: "01/08/2024",
    substance: "IOHEXOL",
    effectifMax15Jours: 4,
    qui: "Serge",
    signale: true,
  },
  {
    id: 3,
    dateSignalement: "01/08/2024",
    substance: "VENLAFAXINE",
    effectifMax15Jours: 5,
    qui: "Serge",
    signale: true,
  },
  {
    id: 4,
    dateSignalement: "01/08/2024",
    substance: "CARBOXYMALTOSE FERRIQUE",
    effectifMax15Jours: 10,
    qui: "Serge",
    signale: true,
  },
  {
    id: 5,
    dateSignalement: "05/08/2024",
    substance: "ATOVAQUONE",
    effectifMax15Jours: 4,
    qui: "Fred",
    signale: true,
  },
  {
    id: 6,
    dateSignalement: "05/08/2024",
    substance: "TENOFOVIR ALAFENAMID",
    effectifMax15Jours: 4,
    qui: "Fred",
    signale: true,
  },
  {
    id: 7,
    dateSignalement: "05/08/2024",
    substance: "LENALIDOMIDE",
    effectifMax15Jours: 6,
    qui: "Fred",
    signale: true,
  },
  {
    id: 8,
    dateSignalement: "06/08/2024",
    substance: "METHYLPREDNISOLONE",
    effectifMax15Jours: 6,
    qui: "Prisci",
    signale: true,
  },
  {
    id: 9,
    dateSignalement: "06/08/2024",
    substance: "LEVOFLOXACINE",
    effectifMax15Jours: 14,
    qui: "Prisci",
    signale: true,
  },
  {
    id: 10,
    dateSignalement: "06/08/2024",
    substance: "BORAX",
    effectifMax15Jours: 7,
    qui: "Prisci",
    signale: true,
  },
  {
    id: 11,
    dateSignalement: "07/08/2024",
    substance: "Pas de sur-effectif",
    effectifMax15Jours: undefined,
    qui: "Prisci",
    signale: false,
  },
  {
    id: 12,
    dateSignalement: "08/08/2024",
    substance: "Pas de sur-effectif : bug du rapport PV",
    effectifMax15Jours: undefined,
    qui: "Fred",
    signale: false,
  },
  {
    id: 13,
    dateSignalement: "09/08/2024",
    substance: "CLAVULANATE POTASSIQUE",
    effectifMax15Jours: 14,
    qui: "Fred",
    signale: true,
  },
];

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function App() {

  const [search, setSearch] = useState("");
  const [dataSurEff, setDataSurEff] = useState(SUR_EFFECTIFS);
  const [dataAPI, setDataAPI] = useState(null);
  const [load, setLoad] = useState(false);

  const fetchSurEff = async () => {
    const res = await fetch(
      "http://localhost/sur_effectifs_PV_API/public/index.php/api/sur_effectifss"
    );
    const data = await res.json();
    const dataAPI_reformat = data["hydra:member"].map((obj) => {
      const date = new Date(obj.dateSignalement);
      const date_refor = date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return {
        id: obj.id,
        dateSignalement: date_refor,
        substance: obj.substance,
        effectifMax15Jours: obj.effectifMax15Jours,
        qui: obj.qui,
        signale: obj.signale,
      }
    })


    setDataAPI(dataAPI_reformat);
    setLoad(true);
  };

  useEffect(() => {
    fetchSurEff();
  }, []);

  console.log("dataAPI : ", dataAPI);


  const visibleSurEffectifs = dataSurEff.filter((surEff) => {
    if (
      search &&
      !normalizeString(surEff.substance.toLowerCase()).includes(
        normalizeString(search.toLowerCase())
      )
    ) {
      return false;
    }
    return true;
  });

  const handleUpdateDataSurEff = (newDataSurEff) => {
    setDataSurEff(newDataSurEff);
  };

  return (
    <div className="container my-3">
      {load ? (
        <>
          <SearchBar search={search} onSearchChange={setSearch} />
          <SurEffTable surEffectifs={visibleSurEffectifs} />
          <AddSurEffectif
            dataSurEff={dataSurEff}
            updateDataSurEff={handleUpdateDataSurEff}
          />
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  )
}

export default App;
