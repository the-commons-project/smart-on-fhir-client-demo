import FHIR from 'fhirclient';
import { API_URL, HG_API_URL } from "./../constants";

export const clientSMART = FHIR.client(HG_API_URL);