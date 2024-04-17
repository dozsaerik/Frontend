import {useState} from "react";
import {LocalStorageID} from "../enum/LocalStorageID";

interface UserDataType {
    email: string;
    roles: string[];
}

const initialState: UserDataType = {
    email: '',
    roles: []
}

function useLocalStorage() {

    const [userData, setUserData] = useState<UserDataType>(() => {
        const data = localStorage.getItem(LocalStorageID.USER_DATA);
        return data ? JSON.parse(data) : initialState
    })

    const _setUserData = (email: string, roles: string[]) => {
        const data: UserDataType = {email: email, roles: roles}
        localStorage.setItem(LocalStorageID.USER_DATA, JSON.stringify(data));
        setUserData(data);
    }

    const _clear = () => {
        localStorage.removeItem(LocalStorageID.USER_DATA);
        setUserData(initialState);
    }

    const _isLoggedIn = () => {
        const token = localStorage.getItem(LocalStorageID.TOKEN);
        const refresh_token = localStorage.getItem(LocalStorageID.REFRESH_TOKEN);
        return token != null && refresh_token != null && userData.email != '';
    }

    return {
        email: userData.email,
        roles: userData.roles,
        isLoggedIn: _isLoggedIn,
        setUserData: _setUserData,
        clear: _clear
    }

}

export default useLocalStorage;