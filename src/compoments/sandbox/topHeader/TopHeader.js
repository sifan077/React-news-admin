import React from 'react';
import {Avatar, Dropdown, Layout, Menu} from "antd";
import {
    UserOutlined,
} from '@ant-design/icons';
import {useNavigate} from "react-router";

const {Header} = Layout;

function TopHeader(props) {
    const navigate = useNavigate();
    // 获取存储的token
    const users = localStorage.getItem("token");

    // 获取用户角色类型和用户名
    const {role: {roleName}, username} = JSON.parse(users);

    const menu = (
        <Menu>
            <Menu.Item key={"1"}>
                {roleName}
            </Menu.Item>
            <Menu.Item danger key={"2"}
                       onClick={() => {
                           // 删除token
                           localStorage.removeItem("token");
                           // 跳转到登陆页面
                           navigate("/login");
                       }}>
                退出
            </Menu.Item>
        </Menu>
    );
    return (
        <Header className="site-layout-background"
                style={{padding: '0 16px'}}>

            <div style={{float: "right"}}>
                <span>欢迎<b style={{color: "#597eb2"}}>{username}</b>回来</span>&nbsp;&nbsp;
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined/>}/>
                </Dropdown>
            </div>
        </Header>
    );
}


export default TopHeader;