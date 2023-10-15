export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return false;
}

export function request(url, options = {}) {
    return fetch(url, options).then(checkResponse)
  }