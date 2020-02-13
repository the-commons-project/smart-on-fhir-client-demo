import FHIR from 'fhirclient';
import { API_URL } from "./../constants";

export const clientSMART = FHIR.client(API_URL);