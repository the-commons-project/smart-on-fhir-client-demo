import { PROXY_URI, HG_API_URL, TOKEN_ENDPOINT, ASSERTION, CLIENT_ID, SCOPE, GRANT_TYPE } from '../constants';
import superagent from 'superagent';

export default class AuthService {

    getToken() {
       return new Promise((resolve, reject) => {
        const url = PROXY_URI + HG_API_URL + TOKEN_ENDPOINT;
        const body = {
            grant_type: GRANT_TYPE,
            assertion: ASSERTION,
            client_id: CLIENT_ID,
            scope: SCOPE
        }
        superagent
            .post(url)
            .send(body) // sends a JSON post body
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Accept', 'application/json')
            .end((err, res) => {
                var token = JSON.parse(res.text).access_token;
                localStorage.setItem('access_token', token);
                if (err) reject(err);
                resolve(token);
            });
        });
    }
}