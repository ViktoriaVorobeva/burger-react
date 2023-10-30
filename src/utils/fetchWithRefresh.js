import {
    getRefreshRequest
} from '../services/registers/actions';
import {
    request
} from './checkResponse'
import {
    getCookie,
    setCookie
} from './cookie';
import { BASE_URL } from './url';
import { urls } from './urls';

const USERDATA = `${BASE_URL}${urls.user}`;

const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Authorization": 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
}

export const fetchWithRefresh = async () => {
    try {
        return await fetch(USERDATA, options).then((res) => res.ok
        ? (res.json())
        : res.json().then(error => Promise.reject(error)))
        .catch(error => Promise.reject(error))
    } catch (error) {
        if (error.message === "jwt expired" && localStorage.getItem('token')) {
            const refreshData = await getRefreshRequest();
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            setCookie("accessToken", refreshData.accessToken);
            localStorage.setItem('token', refreshData.refreshToken)
            return await request(USERDATA, options);
        }
    }
}