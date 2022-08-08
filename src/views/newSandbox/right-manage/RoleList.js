import React, {useEffect, useState} from 'react';
import {Table, Tree} from "antd";
import axios from "axios";
import {Button, Modal} from "antd";
import {
    DeleteOutlined,
    UnorderedListOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";

const {confirm} = Modal;

function RoleList(props) {
    // 页面数据源
    const [dataSource, setDataSource] = useState([]);
    // 数据源提供的权限
    const [rightList, setRightList] = useState([]);
    // 页面当前的权限
    const [currentRights, setCurrentRights] = useState([]);
    // 当前角色的id
    const [currentId, setCurrentId] = useState(0);
    // 是否显示树形对话框
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 显示删除对话框
    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除吗',
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
    // 删除对话框内的方法
    const deleteMethod = (item) => {
        // 当前页面同步状态 + 后端同步
        // 遍历过滤当前页面的数据
        setDataSource(dataSource.filter(data => data.id !== item.id));
        axios.delete(` /roles/${item.id}`);
    }

    // 表格的表头
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            // key: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        {/*编辑按钮*/}
                        <Button type="primary" shape="circle" icon={<UnorderedListOutlined/>}
                                onClick={() => {
                                    setIsModalVisible(true);
                                    setCurrentId(item.id);
                                    setCurrentRights(item.rights);
                                }}/>
                        &nbsp;&nbsp;
                        <Button danger shape="circle" icon={<DeleteOutlined/>}
                                onClick={() => confirmMethod(item)}
                        />
                    </div>
                )
            }
        }
    ];

    useEffect(() => {
        // 获取数据源
        axios.get("/roles").then(res => {
            const list = res.data;
            // console.log(list);
            setDataSource(list);
        });
    }, []);

    useEffect(() => {
        // 获取权限数据源
        axios.get("/rights?_embed=children").then(res => {
            const list = res.data;
            // console.log(list);
            setRightList(list);
        });
    }, []);

    const handleOk = () => {
        // 关闭树形对话框
        setIsModalVisible(false);
        // 同步dataSource
        setDataSource(dataSource.map(item => {
            if (item.id === currentId) {
                // 如果是当前角色的id，则更新权限
                return {
                    ...item,
                    rights: currentRights
                }
            }
            return item;
        }));
        // put 请求修改后端
        axios.patch(` /roles/${currentId}`, {
            rights: currentRights
        });
    }

    // 隐藏树形对话框
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    // 树形组件的渲染的数据源更新
    const onCheck = (checkKeys) => {
        setCurrentRights(checkKeys.checked);
    };

    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                   rowKey={(item) => item.id}/>
            <Modal title="权限分配" okText={"确定"} cancelText={"取消"}
                   visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    checkStrictly={true}
                    checkedKeys={currentRights}
                    onCheck={onCheck}
                    treeData={rightList}
                />
            </Modal>
        </div>
    );
}

export default RoleList;