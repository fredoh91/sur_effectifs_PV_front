export function convDateFrancaiseEnISO(dateFrancaise) {
  const [jour, mois, annee] = dateFrancaise.split("/");
  //const date = new Date(annee, mois - 1, jour);
  const date = new Date(`${annee}-${mois}-${jour}T00:00:00.000Z`);
  // console.log ('dateFrancaise : ', dateFrancaise)
  
  // Formatage en chaîne ISO 8601
  const dateISO = date.toISOString();

  // console.log ('dateISO : ', dateISO)
  return dateISO;
}

export function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function getSQLDatetime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Mois commence à 0
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
