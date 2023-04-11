import Cookie from 'js-cookie';

export const AUTH_TOKEN_KEY = 'access_token';

export const AUTH_TOKEN_TTL = 24 * 60 * 60 * 1000;

export const getAuthToken = () => Cookie.get(AUTH_TOKEN_KEY);

export const registerAuthToken = (token: any) => {
    Cookie.set(AUTH_TOKEN_KEY, token, {
        expires: new Date(new Date().getTime() + AUTH_TOKEN_TTL),
    });
};

export const unregisterAuthToken = () => Cookie.remove(AUTH_TOKEN_KEY);
