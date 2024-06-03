const { VITE_SERVER_URI, VITE_MAIN_APP_URL } = import.meta.env;

export const config = {
    baseURL: VITE_SERVER_URI,
    mainWebApp: VITE_MAIN_APP_URL
};
