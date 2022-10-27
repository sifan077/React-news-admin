// IndexRouter.js
import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import Login from "../views/login/Login";
import News from "../views/news/News";
import Detail from "../views/news/Detail";
import Auth from "./Auth";

export default function IndexRouter() {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/detail/:id" element={<Detail/>}/>
                    <Route path="/*" element={<Auth/>}/>
                </Routes>
            </HashRouter>
        </div>

    );
};
