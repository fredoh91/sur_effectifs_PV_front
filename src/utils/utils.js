export function convDateFrancaiseEnISO(dateFrancaise) {

    const [jour, mois, annee] = dateFrancaise.split('/');
    const date = new Date(annee, mois - 1, jour);
  
    // Formatage en chaîne ISO 8601
    const dateISO = date.toISOString();
  
    return dateISO;
  }

  export function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }