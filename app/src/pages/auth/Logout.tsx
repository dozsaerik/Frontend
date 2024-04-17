import {Navigate} from "react-router-dom";
import useLocalStorage from "../../core/hook/useLocalStorage";
import {LocalStorageID} from "../../core/enum/LocalStorageID";

const Logout = () => {

    localStorage.removeItem(LocalStorageID.TOKEN);
    localStorage.removeItem(LocalStorageID.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageID.USER_DATA)

    return <Navigate to='/login'/>

}

export default Logout;