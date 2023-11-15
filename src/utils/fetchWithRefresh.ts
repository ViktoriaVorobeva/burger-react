import { request } from "./checkResponse";
import { getCookie, setCookie } from "./cookie";
import { BASE_URL } from "./url";
import { urls } from "./urls";

type TUser = {
  email: string,
  password: string,
}

type TRegister = {
  email: string,
  password: string,
  name: string
}

type TUpUser = {
  email: string,
  password?: string,
  name: string
}

export type TUserResponce = TServerResponce<{ user: TUser}>

export type TRegisterResponce = TServerResponce<{ user: TRegister}>

export type TUpdateResponce = TServerResponce<{ user: TUpUser}>

export type TOutResponce = TServerResponce<{ message: string}>

export type TServerResponce<T> = {
  success: boolean;
} & T;

type TRefreshRespone = TServerResponce<{
  refreshToken: string;
  accessToken: string;
}>;

const USERDATA = `${BASE_URL}${urls.user}`;
const REFRESHDATA = `${BASE_URL}${urls.token}`;
const REGISTERDATA = `${BASE_URL}${urls.register}`;
const LOGINDATA = `${BASE_URL}${urls.login}`;
const LOGOUTDATA = `${BASE_URL}${urls.logout}`;

export const getRefreshRequest = async (): Promise<TRefreshRespone> => {
  return request<TRefreshRespone>(REFRESHDATA, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("token") }),
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  //       .then((data) => {
  //         const authToken = data.accessToken?.split('Bearer ')[1];
  //         if (authToken) {
  //             setCookie('token', authToken);
  //             localStorage.setItem('token', data.refreshToken)
  //         }
  // })
};

export const fetchWithRefresh = async <T,>() => {
  try {
    return await request<T>(USERDATA, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token") }),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }).catch((error) => Promise.reject(error));
  } catch (error) {
    if (
      (error as { message: string }).message === "jwt expired" &&
      localStorage.getItem("token")
    ) {
      const refreshData = await getRefreshRequest();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      setCookie("accessToken", refreshData.accessToken);
      localStorage.setItem("token", refreshData.refreshToken);
      return await request<T>(USERDATA, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Authorization: "Bearer " + getCookie("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
    } else {
        Promise.reject(error);
    }
  }
};

export const getRegist = async (form: TRegister): Promise<TRegisterResponce> => {
  return request<TRegisterResponce>(REGISTERDATA, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
})
}

export const login = async (form: TUser): Promise<TUserResponce> => {
  return request<TUserResponce>(LOGINDATA, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
})
}

export const update = async (form:TUpUser): Promise<TUpdateResponce> => {
  return request<TUpdateResponce>(USERDATA, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
})
}

export const logout = async (): Promise<TOutResponce> => {
  return request<TOutResponce>(LOGOUTDATA, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token: localStorage.getItem('token')})
})
}
