import { userKey } from "../../constants/storageKey";
import {
    setToLocalStorage,
    getFromLocalStorage,
} from "../../utils/local-storage";

export const storeUserInfo = (payload: string) => {
    return setToLocalStorage(userKey, payload);
};

export const getUserInfo = () => {
    const user = getFromLocalStorage(userKey);

    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
};

export const removeUserInfo = () => {
    return localStorage.removeItem(userKey);
};
