import React, {useEffect, useState} from 'react';
import {Button, Table, Modal, notification} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    UploadOutlined
} from '@ant-design/icons';
import axios from "axios";
import {useNavigate} from "react-router";

const {confirm} = Modal;

function NewsDraft(props) {
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState([]);
    const {username} = JSON.parse(localStorage.getItem("token"));
    useEffect(() => {
        axios.get("/news?author=" + username + "&auditState=0&_expand=category").then(res => {
            const list = res.data;
            setDataSource(list);
        });
    }, [username]);

    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除吗',
            okText: '确定',
            cancelText: '取消',
            icon: <ExclamationCircleOutlined/>,
            // content: 'Some descriptions',

            onOk() {
                // console.log('OK');
                deleteMethod(item);
            },

            onCancel() {
                // console.log('Cancel');
                console.log("取消删除了");
            },
        });
    }

    const deleteMethod = (item) => {
        // 当前页面同步状态 + 后端同步
        axios.delete(`/news/${item.id}`);
        setDataSource(dataSource.filter(data => data.id !== item.id));
    }

    const handleCheck = (value) => {
        axios.patch(`/news/${value}`, {auditState: 1}).then(res => {
            // 跳转到审核列表
            navigate("/audit-manage/list");
            // 通知用户
            notification.info({
                message: `通知`,
                description: `您可以到审核管理中查看新闻`,
                placement: "bottomRight",
            });
        });
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (title, item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
                // return <Button type="link" onClick={() => {
                //     navigate(`#/news-manage/preview/${item.id}`)
                // }}>{title}</Button>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
        },
        {
            title: "新闻分类",
            dataIndex: "category",
            render: (category) => {
                return category.title;
            }
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button type="primary" shape="circle"
                                onClick={() => {
                                    navigate(`/news-manage/update/${item.id}`);
                                }}
                                icon={<EditOutlined/>}/>
                        &nbsp;&nbsp;
                        <Button danger shape="circle" icon={<DeleteOutlined/>}
                                onClick={() => confirmMethod(item)}/>
                        &nbsp;&nbsp;
                        <Button type="primary" shape="circle"
                                onClick={() => handleCheck(item.id)}
                                icon={<UploadOutlined/>}/>
                    </div>
                )
            }
        }
    ];

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                   pagination={{pageSize: 5}}
                   rowKey={item => item.id}/>
        </div>
    );
}

export default NewsDraft;