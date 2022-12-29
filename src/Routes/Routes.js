import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Addtask from "../Pages/Addtask/Addtask";
import Completed from "../Pages/Completed/Completed";
import Login from "../Pages/Login/Login";
import Mytask from "../Pages/Mytask/Mytask";
import Signup from "../Pages/Signup/Signup";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Mytask></Mytask>
            },
            {
                path: "/addtask",
                element: <Addtask></Addtask>
            },
            {
                path: "/completed",
                element: <Completed></Completed>
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