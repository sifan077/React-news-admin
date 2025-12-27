import React from 'react';
import {Navigate} from "react-router-dom";
import NewSandbox from "../views/newSandbox/NewSandbox";

const Auth = () => {
    return localStorage.getItem("token") === null ? <Navigate to="/login"/> : <NewSandbox/>;
};

export default Auth;
