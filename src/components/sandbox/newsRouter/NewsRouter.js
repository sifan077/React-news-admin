import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../../../views/newSandbox/home/Home";
import UserList from "../../../views/newSandbox/user-manage/UserList";
import RoleList from "../../../views/newSandbox/right-manage/RoleList";
import RightList from "../../../views/newSandbox/right-manage/RightList";
import NoPermission from "../../../views/newSandbox/noPermission/NoPermission";
import NewsAdd from "../../../views/newSandbox/news-manage/newsAdd/NewsAdd";
import NewsDraft from "../../../views/newSandbox/news-manage/NewsDraft";
import NewsCategory from "../../../views/newSandbox/news-manage/NewsCategory";
import Audit from "../../../views/newSandbox/audit-manage/Audit";
import AuditList from "../../../views/newSandbox/audit-manage/AuditList";
import Unpublished from "../../../views/newSandbox/publish-manage/Unpublished";
import Published from "../../../views/newSandbox/publish-manage/Published";
import Sunset from "../../../views/newSandbox/publish-manage/Sunset";
import axios from "axios";
import NewsPreview from "../../../views/newSandbox/news-manage/newsPreview/NewsPreview";
import NewsUpdate from "../../../views/newSandbox/news-manage/newsUpdate/NewsUpdate";

const LocalRouterMap = {
    "/home": <Home/>,
    "/user-manage/list": <UserList/>,
    "/right-manage/role/list": <RoleList/>,
    "/right-manage/right/list": <RightList/>,
    "/news-manage/add": <NewsAdd/>,
    "/news-manage/draft": <NewsDraft/>,
    "/news-manage/category": <NewsCategory/>,
    "/news-manage/preview/:id": <NewsPreview/>,
    "/news-manage/update/:id": <NewsUpdate/>,
    "/audit-manage/audit": <Audit/>,
    "/audit-manage/list": <AuditList/>,
    "/publish-manage/unpublished": <Unpublished/>,
    "/publish-manage/published": <Published/>,
    "/publish-manage/sunset": <Sunset/>,
};

function NewsRouter() {
    // 设置状态，可以访问的路由
    const [backRouteList, setbackRouteList] = useState([]);

    // 发送请求获取可以访问的路由
    useEffect(() => {
        Promise.all([
            axios.get("/rights"),
            axios.get("/children"),
        ]).then((res) => {
            setbackRouteList([...res[0].data, ...res[1].data]);
        });
    }, []);


    const checkRoute = (item) => {
        return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson);
    };

    const {role: {rights}} = JSON.parse(localStorage.getItem("token"));

    const checkUser = (item) => {
        return rights?.includes(item.key);
    };

    return (
        <Routes>
            {backRouteList.map((item) => {
                if (checkRoute(item) && checkUser(item)) {
                    return (
                        <Route
                            path={item.key}
                            key={item.key}
                            element={LocalRouterMap[item.key]}
                        />
                    );
                }
                return null;
            })}
            <Route path="/" element={<Navigate replace to="/home"/>}/>
            <Route path="*" element={<NoPermission/>}/>
        </Routes>
    );
}

export default NewsRouter;