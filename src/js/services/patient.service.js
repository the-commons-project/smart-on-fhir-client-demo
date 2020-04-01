import cookie from "react-cookie";

export default class PatientService {

    buildOptions() {
        access_token = cookie.load("access_token");
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
                'Access-Control-Allow-Origin': '*'
            }
        };
    }

    getPatients() {
        return new Promise((resolve, reject) => {
            fetch('https://sandbox.healthgorilla.com/fhir/Patient', this.buildOptions())
            .then(response => {
                console.log('response:' + JSON.stringify(response));
                resolve(response.entry);
            })
            .catch(error => {
                console.log('error:' + JSON.stringify(error))
                reject(error);
            });
        });
    }

    /* getPatients(client) {
        return new Promise((resolve, reject) => {
            client.request("/fhir/Patient")
                .then(response => resolve(response.entry))
                .catch(error => reject(error));
        });
    } */

    getPatientByFamilyName(familyName) {
        return new Promise((resolve, reject) => {
            fetch(`https://sandbox.healthgorilla.com/fhir/Patient?family=${familyName}`, this.buildOptions())
            .then(response => {
                console.log('response:' + JSON.stringify(response));
                resolve(response);
            })
            .catch(error => {
                console.log('error:' + JSON.stringify(error))
                reject(error);
            });
        });
    }

/* 
    getPatientByFamilyName(client, familyName) {
        return new Promise((resolve, reject) => {
            client.request(`/fhir/Patient?family=${familyName}`)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    } */
}