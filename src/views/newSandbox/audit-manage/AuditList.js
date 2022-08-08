import React, {useEffect} from 'react';
import {Button, notification, Table, Tag} from "antd";
import axios from "axios";
import {useNavigate} from "react-router";

function AuditList(props) {
    const navigate = useNavigate();
    const {username} = JSON.parse(localStorage.getItem('token'));
    const [dataSource, setDataSource] = React.useState([]);
    useEffect(() => {
        axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`)
            .then(res => {
                // console.log(res.data);
                setDataSource(res.data);
            });

    }, [username]);
    const handleCancel = (item) => {
        // 前端页面的删除
        setDataSource(dataSource.filter(data => data.id !== item.id));
        axios.patch(`/news/${item.id}`, {auditState: 0}).then(res => {
            navigate('/news-manage/draft');
            notification.info({
                message: `通知`,
                description: `您可以到草稿箱中查看新闻`,
                placement: "bottomRight",
            });
        });

    }
    const handleUpdate = (item) => {
        navigate(`/news-manage/update/${item.id}`);
        // props.history.push(`/news-manage/update/${item.id}`);
    }
    const handleRelease = (item) => {
        axios.patch(`/news/${item.id}`, {
            publishState: 2,
            publishTime: Date.now()
        }).then(res => {
            navigate('/publish-manage/published');
            notification.info({
                message: `通知`,
                description: `您可以到发布管理/已发布中查看新闻`,
                placement: "bottomRight",
            });
        });

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
            title: '审核状态',
            dataIndex: 'auditState',
            render: (auditState) => {
                const colorList = ["", "orange", "green", "red"];
                const auditList = ["草稿箱", "审核中", "已通过", "未通过"];
                return <Tag color={colorList[auditState]}>
                    {auditList[auditState]}
                </Tag>

            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    {
                        item.auditState === 1 && <Button onClick={() => handleCancel(item)}>撤销</Button>
                    }
                    {
                        item.auditState === 2 && <Button danger onClick={() => handleRelease(item)}>发布</Button>
                    }
                    {
                        item.auditState === 3 && <Button type={"primary"} onClick={() => handleUpdate(item)}>修改</Button>
                    }
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

export default AuditList;