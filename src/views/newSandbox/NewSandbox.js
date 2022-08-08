import React from 'react';
import TopHeader from "../../compoments/sandbox/topHeader/TopHeader";
import SideMenu from "../../compoments/sandbox/sideMenu/SideMenu";

import {Layout} from 'antd';
import NewsRouter from "../../compoments/sandbox/newsRouter/NewsRouter";

import 'nprogress/nprogress.css';
import './NewSandbox.css';

const {Content} = Layout;


function NewSandbox(props) {
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