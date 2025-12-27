import React from 'react';
import TopHeader from "../../components/sandbox/topHeader/TopHeader";
import SideMenu from "../../components/sandbox/sideMenu/SideMenu";

import {Layout} from 'antd';
import NewsRouter from "../../components/sandbox/newsRouter/NewsRouter";

import 'nprogress/nprogress.css';
import './NewSandbox.css';

const {Content} = Layout;


function NewSandbox() {
    return (
        <Layout>
            <SideMenu/>
            <Layout className="site-layout">
                <TopHeader/>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto',
                    }}>
                    <NewsRouter/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default NewSandbox;