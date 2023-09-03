import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import FilteredRooms from "../pages/FilteredRooms/FilteredRooms";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import SignUp from "../pages/SignUp/SignUp";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/filtered-rooms',
          element: <FilteredRooms></FilteredRooms>
        },
        {
          path: '/room/:id',
          element: <RoomDetails></RoomDetails>
        }
      ]
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/signup',
      element: <SignUp></SignUp>
    }
  ]);