export const PATH_DETAILS = "details";

export const API_URL = "https://r3.smarthealthit.org";
export const HG_API_URL = "https://sandbox.healthgorilla.com";
export const PROXY_URI = "http://localhost:9000/";

export const  TOKEN_ENDPOINT = "/oauth/token";
export const  PATIENTS_ENDPOINT = "/fhir/Patient";

export const ASSERTION = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3d3dy50aGVjb21tb25zcHJvamVjdC5vcmciLCJhdWQiOiJodHRwczovL3NhbmRib3guaGVhbHRoZ29yaWxsYS5jb20vb2F1dGgvdG9rZW4iLCJzdWIiOiJ2ZW5reS5yYXZpcmFsYSIsImV4cCI6MTU4ODI3MTc0OCwibmJmIjoxNTg1NjM0NDQ4LCJpYXQiOjE1ODU2MzQ0NDh9.QeQNh3rG8YyOhQ6-Sm00A3_AM3OhlkR2O7ge_2W26C8";
export const CLIENT_ID = "C2nK7gcQYGtxPRUSX9dzVH8QXMEUe6scugtkPEHe";
export const SCOPE = "user/*.* patient360";
export const GRANT_TYPE = "urn:ietf:params:oauth:grant-type:jwt-bearer";

export const REQUEST_DELAY = 1000;

let baseurl = "/demo";

if (process.env.NODE_ENV) {
    baseurl = "";
}
export const baseUrl = baseurl;