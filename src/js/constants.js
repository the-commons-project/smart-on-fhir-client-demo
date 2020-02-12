export const PATH_DETAILS = "details";

export const API_URL = "https://r3.smarthealthit.org";

export const REQUEST_DELAY = 1000;

let baseurl = "/demo";

if (process.env.NODE_ENV) {
    baseurl = "";
}
export const baseUrl = baseurl;