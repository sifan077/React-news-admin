// IndexRouter.js
import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import Login from "../views/login/Login";
import NewSandbox from "../views/newSandbox/NewSandbox";
import News from "../views/news/News";
import Detail from "../views/news/Detail";
import {Navigate} from "react-router";

export default function IndexRouter() {
    const isLogin = localStorage.getItem("token") === null ? <Navigate to="/login"/> : <NewSandbox/>;
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/detail/:id" element={<Detail/>}/>
                    <Route path="/*" element={isLogin}/>
                </Routes>
            </HashRouter>
        </div>

    );
};
