import React, {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {
    UserOutlined,
    HomeOutlined,
    CrownOutlined,
} from '@ant-design/icons';
import {useNavigate, useLocation} from "react-router";

import './SideMenu.css'
import axios from "axios";

const {Sider} = Layout;
const {SubMenu} = Menu;


function SideMenu(props) {
    const location = useLocation();
    const selectKeys = [location.pathname];
    const openKeys = ["/" + location.pathname.split("/")[1]];
    const [menu, setMenu] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/rights?_embed=children").then(res => {
                // console.log(res.data);
                setMenu(res.data);
            }
        );
    }, [navigate]);

    const users = localStorage.getItem("token");

    const {role: {rights}} = JSON.parse(users);
    const iconList = {
        "/home": <HomeOutlined/>,
        "/user-manage": <UserOutlined/>,
        "/right-manage": <CrownOutlined/>,
        "/right-manage/role/list": <CrownOutlined/>,
        "/right-manage/right/list": <CrownOutlined/>,
        "/user-manage/list": <UserOutlined/>
    }


    const renderMenu = (menuList) => {

        const checkPagePermission = (item) => {
            return item.pagepermisson && rights.includes(item.key);
        }

        return menuList.map((item) => {
            if (item.children?.length > 0 && checkPagePermission(item)) {
                return (
                    <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
                        {renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return (checkPagePermission(item) &&
                <Menu.Item
                    key={item.key}
                    icon={iconList[item.key]}
                    onClick={() => navigate(item.key)}>
                    {item.title}
                </Menu.Item>
            );
        });
    };

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div style={{display: "flex", height: "100%", "flexDirection": "column"}}>
                <div className="logo" onClick={() => {
                    setCollapsed(!collapsed)
                }}>全球新闻发布管理系统
                </div>
                <div style={{flex: 1, "overflow": "auto"}}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={selectKeys}
                        defaultOpenKeys={openKeys}>
                        {renderMenu(menu)}
                    </Menu>
                </div>

            </div>
        </Sider>

    );
}

export default SideMenu;