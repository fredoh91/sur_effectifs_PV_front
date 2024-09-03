import { useState, useEffect } from "react";
import "./App.css";
// import { Input } from "./components/forms/Input"
import { AddSurEffectif } from "./components/forms/AddSurEffectif";
import { SurEffTable } from "./components/forms/SurEffTable";
import { SearchBar } from "./components/forms/SearchBar";

import { fetchFromAPI_GetAll } from "./api/api";
// import { fetchFromAPI } from "./api/api";
// import { fetchFromAPI } from './api/api_axios'

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function App() {
  const [search, setSearch] = useState("");
  const [dataSurEff, setDataSurEff] = useState([]);
  const [dataAPI, setDataAPI] = useState(null);
  const [load, setLoad] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const fetchSurEff = async () => {
    try {
      const dataAPI_reformat = await fetchFromAPI_GetAll();
      setDataAPI(dataAPI_reformat);
      setLoad(true);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      setLoadingError(true)
    }
  };


  useEffect(() => {
    fetchSurEff();
  }, []);

  useEffect(() => {
    if (dataAPI) {
      // console.log('useEffect déclenché car modif de dataAPI')
      // console.log('dataAPI : ' , dataAPI)
      setDataSurEff(dataAPI);
    }
  }, [dataAPI]);

  // console.log("dataAPI : ", dataAPI);

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
            setDataAPI={setDataAPI}
            setLoad={setLoad}

          />
        </>
      ) : (
        loadingError ? (
          <p>Erreur de chargement.</p>
        ) : (
          <p>Chargement en cours...</p>
        )
      )}
    </div>
  );
}

export default App;
