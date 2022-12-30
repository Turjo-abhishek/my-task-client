import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Addtask from "../Pages/Addtask/Addtask";
import Completed from "../Pages/Completed/Completed";
import Login from "../Pages/Login/Login";
import Mytask from "../Pages/Mytask/Mytask";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Mytask></Mytask></PrivateRoute>
            },
            {
                path: "/addtask",
                element: <Addtask></Addtask>
            },
            {
                path: "/completed",
                element: <PrivateRoute><Completed></Completed></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            }
        ]
    }
])

export default Routes;