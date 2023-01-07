import axios from 'axios';
import { setAuthorizationHeader } from './httpconstants';
import API from '@/utils/httputils';
import config from '../config.json';

export const authenticateUser = (credentails, colln, env) => {
    const url = config.apiUrlData.login[API.getSysEnv()].part_url;

    let userData = {};
    userData.username = credentails.username;
    userData.password = credentails.password;
    userData.searchEnv = env;
    userData.collection = colln;
    //userData.sourceApp = 'ADMIN';
    return new Promise((resolve, reject) => {
        //let base_url = ADMIN_BASE_URL
        let base_url = "http://192.168.15.27:8080/desauth/"
        let full_url = base_url + 'users/external/authenticate';
        axios
            .post(full_url, userData, setAuthorizationHeader(undefined))
            .then(response => {
                resolve({ users: response.data });
            })
            .catch(response => {
                reject('Invalid Username or Password');
            });
    });
};