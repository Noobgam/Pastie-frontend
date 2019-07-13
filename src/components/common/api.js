
import { toast } from 'react-toastify';

const endpoint = 'http://localhost:228/api'

export function apiGet(url) {
    return wrapPromise(fetch(endpoint + url));
}

export function apiPost(url, value, customHeaders) {
    if (customHeaders) {
        return wrapPromise(fetch(endpoint + url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            body: value,
            headers: customHeaders,
            credentials: 'same-origin'
        }));
    } else {
        return wrapPromise(fetch(endpoint + url,
            {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: value
            }));
    }
}

function wrapPromise(promise) {
    return promise.then(
        res => res.json(),
        //undefined result is intended.
        e => {toast.error('Something went wrong.')}
    )
}