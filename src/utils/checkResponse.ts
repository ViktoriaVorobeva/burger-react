function checkResponse<T>(res: Response): Promise<T> | boolean {
  if (res.ok) {
    return res.json();
  }
  return false;
}

export function request<T>(url: RequestInfo, options = {}): Promise<T> {
  return fetch(url, options)
  .then((res) => res.ok ? res.json() : res.json().then((error) => Promise.reject(error)));
}
