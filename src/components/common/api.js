
import { toast } from 'react-toastify';

const endpoint = 'https://paste.noobgam.me/api'

export function apiGet(url) {
    return wrapPromise(fetch(endpoint + url, {
        mode: 'cors',
        credentials: 'include',
    }));
}

export function apiPost(url, value, customHeaders) {
    if (customHeaders) {
        return wrapPromise(fetch(endpoint + url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            cache: 'no-cache',
            body: value,
            headers: customHeaders
        }));
    } else {
        return wrapPromise(fetch(endpoint + url,
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                cache: 'no-cache',
                body: value
            }));
    }
}

function wrapPromise(promise) {
    return promise.then(
        res => res.json(),
        //undefined result is intended.
        e => {
            toast.error('Something went wrong.')
        }
    )
}