import React, {useEffect} from 'react';
import {Button, Table, Tag, Modal, Popover, Switch} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from "axios";

const {confirm} = Modal;

function RightList(props) {
    const [dataSource, setDataSource] = React.useState([]);
    useEffect(() => {
        axios.get("/rights?_embed=children").then(res => {
            const list = res.data;
            // 去除children是空的数据
            for (let i = 0; i < list.length; i++) {
                if (list[i].children.length === 0) {
                    list[i].children = null;
                }
            }
            // 设置数据源，渲染
            setDataSource(list);
        });
    }, []);

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

        if (item.grade === 1) {
            // 遍历过滤当前页面的数据
            setDataSource(dataSource.filter(data => data.id !== item.id));
            axios.delete(` /rights/${item.id}`);
        } else {
            // 获取删除的父级
            let list = dataSource.filter(data => data.id === item.rightId);
            // 删除子集的目标数据
            list[0].children = list[0].children.filter(data => data.id !== item.id);
            // 重新展开设置当前页面数据源，重新渲染页面
            setDataSource([...dataSource]);

            axios.delete(` /children/${item.id}`);
        }

    }

    const switchMethod = (item) => {
        // 重新赋值
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1;
        // 刷新页面数据源
        setDataSource([...dataSource]);
        // 后端同步
        if (item.grade === 1) {
            axios.put(` /rights/${item.id}`, item);
        } else {
            axios.put(` /children/${item.id}`, item);
        }

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
            title: '权限名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            key: 'key',
            render: (key) => {
                return <Tag color={"orange"}>{key}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Popover content={<div style={{textAlign: "center"}}>
                            <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}/>
                        </div>} title="配置项"
                                 trigger={item.pagepermisson === undefined ? "" : "click"}>
                            <Button type="primary" shape="circle" icon={<EditOutlined/>}
                                    disabled={item.pagepermisson === undefined}/>
                        </Popover>
                        &nbsp;&nbsp;
                        <Button danger shape="circle" icon={<DeleteOutlined/>}
                                onClick={() => confirmMethod(item)}/>
                    </div>
                )
            }
        }
    ];

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                   pagination={{pageSize: 5}}/>
        </div>
    );
}

export default RightList;