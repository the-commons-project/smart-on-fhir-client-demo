import { assertion, clientId, scope, grantType } from '../constants';
import cookie from "react-cookie";

export default class AuthService {

    buildOptions(data) {
        return {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            }
        };
    }

    getToken() {
        return new Promise((resolve, reject) => {
            var data = {
                "grant_type": grantType,
                "assertion": assertion,
                "client_id": clientId,
                "scope": scope
            };

            fetch('https://sandbox.healthgorilla.com/oauth/token', this.buildOptions(data))
            .then(response => {
                console.log('response:' + JSON.stringify(response));
                cookie.save("access_token", response.access_token, {path: "/"});
                resolve();
            })
            .catch(error => {
                console.log('error:' + JSON.stringify(error))
                reject();
            });
        });
    }
}