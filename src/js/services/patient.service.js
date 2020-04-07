import { PROXY_URI, HG_API_URL, PATIENTS_ENDPOINT } from '../constants';
import superagent from 'superagent';


export default class PatientService {

    getPatients() {
        return new Promise((resolve, reject) => {
            const url = PROXY_URI + HG_API_URL + PATIENTS_ENDPOINT;
            const access_token = localStorage.getItem('access_token');
            superagent
                .get(url)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + access_token)
                .end((err, res) => {
                    var patients = JSON.parse(res.text).entry;
                    if (err) reject(err);
                    resolve(patients);
                });
            });
        }

    getPatientById(patientId) {
        return new Promise((resolve, reject) => {
            const url = PROXY_URI + HG_API_URL + PATIENTS_ENDPOINT + "/" + patientId;
            const access_token = localStorage.getItem('access_token');
            superagent
                .get(url)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + access_token)
                .end((err, res) => {
                    var patients = JSON.parse(res.text);
                    if (err) reject(err);
                    resolve(patients);
                });
            });
    }
}