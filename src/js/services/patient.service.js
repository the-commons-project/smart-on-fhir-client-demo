import { clientSMART as FHIR } from './fhir.client';

export default class PatientService {
    
    getPatients() {
        return new Promise((resolve, reject) => {
            FHIR.request("Patient")
                .then(response => resolve(response.entry))
                .catch(error => reject(error) );
        });
    }

    getPatient(patientId) {
        return new Promise((resolve, reject) => {
            FHIR.request(`Patient/${patientId}`)
                .then(response => resolve(response))
                .catch(error => reject(error) );
        });
    }
}