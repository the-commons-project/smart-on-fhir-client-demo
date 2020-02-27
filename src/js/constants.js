export const PATH_DETAILS = "details";

//export const API_URL = "https://r3.smarthealthit.org";
export const API_URL= "http://fhir-client-demo.tcpdev.org:4003/baseDstu3";

export const REQUEST_DELAY = 1000;

let baseurl = "/demo";

if (process.env.NODE_ENV) {
    baseurl = "";
}
export const baseUrl = baseurl;