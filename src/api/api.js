// api.js
export const fetchFromAPI_GetAll = async () => {
    const url = "http://localhost/sur_effectifs_PV_API/public/index.php/api/sur_effectifss";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erreur dans la réponse du serveur (ou pas de reponse)');
        }

        const data = await response.json();
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
            };
        });

        return dataAPI_reformat;
    } catch (error) {
        console.error('Probleme dans le fetch : ', error);
        throw new Error(`Erreur lors de la récupération des données : ${error.message}`);
    }
};
export const fetchFromAPI_CreateSurEff = async (data) => {
    const url = "http://localhost/sur_effectifs_PV_API/public/index.php/api/sur_effectifss";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erreur serveur');
        }

        return response.status;
    } catch (error) {
        console.error('Erreur de fetch pour creation de ligne :', error);
        throw new Error(`Erreur lors de la récupération des données : ${error.message}`);
        // return null;
    }
};