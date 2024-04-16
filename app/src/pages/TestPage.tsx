import {UserState} from "../core/redux/reducer/UserReducer";
import {useSelector} from "react-redux";
import {RootState} from "../core/redux/Store";

function TestPage() {
    const user: UserState = useSelector((state: RootState) => state.user);
    return (
        <div>
            Test {user.data.roles}
        </div>
    )
}

export default TestPage;