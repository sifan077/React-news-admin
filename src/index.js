import React from 'react';
import ReactDOM from 'react-dom/client';
import zhCN from 'antd/es/locale/zh_CN';
import {App} from './App';
import './util/http';
import {ConfigProvider} from "antd";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
        <App/>
    </ConfigProvider>
);