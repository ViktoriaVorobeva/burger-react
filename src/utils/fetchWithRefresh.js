import {
    getRefreshRequest
} from '../services/registers/actions';
import {
    request
} from './checkResponse'
import {
    setCookie
} from './cookie';


export const fetchWithRefresh = async (url, options) => {
    try {
        return await fetch(url, options).then((res) => res.ok
        ? (res.json())
        : res.json().then(error => Promise.reject(error)))
        .catch(error => Promise.reject(error))
    } catch (error) {
        if (error.message === "jwt expired") {
            const refreshData = await getRefreshRequest('https://norma.nomoreparties.space/api/auth/token');
            if (!refreshData.success) {
                Promise.reject(refreshData);
            }
            setCookie("accessToken", refreshData.accessToken);
            localStorage.setItem('token', refreshData.refreshToken)
            return await request(url, options);
        }
    }
}