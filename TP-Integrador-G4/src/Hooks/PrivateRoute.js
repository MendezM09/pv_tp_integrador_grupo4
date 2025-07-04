import { Navigate } from "react-router";
import { isLogin } from "../middleware/auth";

const PrivateRoute =({component : Component}) => (
    isLogin() ? <Component/>: <Navigate to ="/"/>
)
export default PrivateRoute;