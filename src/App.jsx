import { useState, useEffect } from "react";
import "./App.css";
import { AddSurEffectif } from "./components/forms/AddSurEffectif";
import { SurEffTable } from "./components/forms/SurEffTable";
import { SearchBar } from "./components/forms/SearchBar";

import { normalizeString } from './utils/utils'
import { fetchFromAPI_GetAll, fetchFromAPI_DeleteSurEff } from "./api/api";





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

  const handleModifSurEff = (id) => {
    console.log ('test : ',id);
  }

  const handleDeleteSurEff = (id) => {
    // console.log ('test : ',id);

    const fetchDeleteSurEff = async (id) => {

      try {
        const dataAPI_reformat = await fetchFromAPI_DeleteSurEff(id);

        if (dataAPI_reformat===204) {
          // l'effacement a bien fonctionné
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
        console.error('Une erreur s\'est produite lors de l\'effacement de la donnée :', error);
        setLoadingError(true)
      }
    };

    fetchDeleteSurEff(id)
  };

  return (
    <div className="container my-3">
      {load ? (
        <>
          <SearchBar search={search} onSearchChange={setSearch} />
          <SurEffTable 
            surEffectifs={visibleSurEffectifs} 
            onDelete = {handleDeleteSurEff}
            onModif = {handleModifSurEff}
          />
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
          <div>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">
              </span>
            </div>
            <p>Chargement en cours...</p>
          </div>
        )
      )}
    </div>
  );
}

export default App;
