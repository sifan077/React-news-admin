import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, notification, Table} from "antd";

function Audit(props) {

    // roleId  1 超级管理员 2 区域 管理员 3 区域编辑
    const {roleId, region, username} = JSON.parse(localStorage.getItem("token"));
    // 数据源，渲染前端
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const roleObj = {
            "1": "superAdmin",
            "2": "admin",
            "3": "editor",
        }
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            const list = res.data;
            setDataSource(
                roleObj[roleId] === "superAdmin" ? list : [
                    ...list.filter((item) => item.username === username),
                    ...list.filter(
                        (item) =>
                            item.region === region &&
                            roleObj[item.roleId] === "editor" &&
                            item.username !== username
                    )
                ]
            );
        });
    }, [roleId, region, username]);

    const handlePass = (item) => {
        axios.patch(`/news/${item.id}`, {auditState: 2, publishState: 1}).then(
            res => {
                setDataSource(dataSource.filter(data => data.id !== item.id));
                notification.info({
                    message: `通知`,
                    description: `您已审核通过此新闻`,
                    placement: "bottomRight",
                });
            }
        )
    }

    const handleFail = (item) => {
        axios.patch(`/news/${item.id}`, {auditState: 3}).then(
            res => {
                setDataSource(dataSource.filter(data => data.id !== item.id));
                notification.info({
                    message: `通知`,
                    description: `您已审核驳回此新闻`,
                    placement: "bottomRight",
                });
            }
        )
    }


    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (title, item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: '新闻分类',
            dataIndex: 'category',
            render: (category) => {
                return category.value;
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type="primary" onClick={() => handlePass(item)}>通过</Button>
                    &nbsp;&nbsp;
                    <Button danger onClick={() => handleFail(item)}>驳回</Button>
                </div>
            }
        }
    ];

    return (
        <div>
            <Table dataSource={dataSource}
                   rowKey={item => item.id}
                   pagination={{pageSize: 5}}
                   columns={columns}/>
        </div>
    );
}

export default Audit;