const axios = require('axios'); //bibliothèque permettant de faire des requêtes HTTP
const express = require('express'); //framework web pour NodeJs
const path = require('path'); //Module relié à NodeJS permettant de manipuler les chemins plus facilement

const app = express(); //Création d'une instance express
const port = 3000; //Définition du port d'écoute
const ApiKEY = "8c16e98a8deb42ba9d4132859242703"; //Stock de la clé API obtenu depuis le site weather api pour récupérer les données API

//Définition du chemin pour l'affichage de la page index.html à la racine du projet
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//On utilise la requête GET, lorsque qu'une requête est faite avec un paramètre ville
app.get('/:ville', async(req, res) => { //fonction assynchrone
    const ville = req.params.ville; //On stock le nom de la ville inscrite dans les paramètres dans une constante
    //Dans l'URL de l'API, nous utilisons la documentation de l'API, définition de la clé API, de la langue et de la ville
    const ApiURL = `http://api.weatherapi.com/v1/current.json?lang=fr&key=${ApiKEY}&q=${ville}`; //On stocke l'URL de l'API dans une constante

    try {
        const response = await axios.get(ApiURL); //On execute, grâce à axios, la requête get afin de récupérer les données avec notre clé API

        //Dans une variable, je stocke les données que je souhaite afficher notamment : ville, région, pays, température, temps, description, icon et température ressentie
        const weather_data = {
            ville: response.data.location.name, //les noms sont définis dans la documentation de l'API
            temp: response.data.current.temp_c,
            pays: response.data.location.country,
            region: response.data.location.region,
            time: response.data.location.localtime,
            feelslike: response.data.current.feelslike_c,
            description: response.data.current.condition.text,
            icon: response.data.current.condition.icon,
        }

        res.json(weather_data); //J'exporte au format json que je récupérerai côté front
    } catch (error) { //s'il y a une erreur alors j'execute le code Erreur
        console.log("Erreur lors de la récupération des données");
    }
});

//Lancement du serveur sur le port défini au début, le port 3000
app.listen(port, () => {
    console.log('listening on port: 3000');
});