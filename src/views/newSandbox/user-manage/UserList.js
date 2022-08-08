import React, {useEffect, useRef, useState} from 'react';
import {Button, Table, Modal, Switch} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from "axios";
import UserForm from "../../../compoments/user-manage/UserForm";

const {confirm} = Modal;

function UserList(props) {
    // 数据源，渲染前端
    const [dataSource, setDataSource] = useState([]);
    // 是否显示增加用户的弹窗
    const [isAddVisible, setIsAddVisible] = useState(false);
    // 角色列表
    const [roleList, setRoleList] = useState([]);
    // 区域列表
    const [regionList, setRegionList] = useState([]);
    // 是否显示修改用户的弹窗
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    // 用户是否被禁用
    const [isUpdateDisable, setIsUpdateDisable] = useState(false);
    // 当前的用户信息
    const [current, setCurrent] = useState(null);
    // ref，用于获取表单数据
    const addForm = useRef(null);
    const updateForm = useRef(null);

    // roleId  1 超级管理员 2 区域 管理员 3 区域编辑
    const {roleId, region, username} = JSON.parse(localStorage.getItem("token"));

    // 获取区域列表
    useEffect(() => {
        axios.get("/regions").then(res => {
            const list = res.data;
            setRegionList(list);
        });
    }, [roleId, region, username]);
    // 获取角色列表
    useEffect(() => {
        axios.get("/roles").then(res => {
            const list = res.data;
            setRoleList(list);
        });
    }, [roleId, region, username]);
    // 获取用渲染数据源
    useEffect(() => {
        axios.get("/users?_expand=role").then(res => {
            const list = res.data;
            // 去除children是空的数据
            for (let i = 0; i < list.length; i++) {
                if (list[i].role.length === 0) {
                    list[i].role = null;
                }
            }
            // 设置数据源，渲染
            // roleId  1 超级管理员 2 区域 管理员 3 区域编辑
            setDataSource(roleId === 1 ? list : [
                // 如果是超级管理员全部返回
                // 如果是区域管理员只返回自己和自己区域的编辑
                ...list.filter(item => item.username === username),
                ...list.filter(item => item.region === region && item.roleId === 3)
            ]);
        });
    }, [roleId, region, username]);

    // 删除弹窗
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
    // 删除用户的方法
    const deleteMethod = (item) => {
        // 当前页面同步状态 + 后端同步
        axios.delete(`/users/${item.id}`);
        setDataSource(dataSource.filter(data => data.id !== item.id));
    }
    // 增加用户点击确定事件
    const addFormOk = () => {
        // 获取表单数据
        addForm.current.validateFields().then(values => {
            console.log(values);
            // post到后端，生成id，在设置dataSource,方便后面的删除和更新
            axios.post('/users', {
                // 展开数据
                ...values,
                "roleState": true,
                "default": false,
            }).then(res => {
                // console.log(res.data);
                setDataSource([...dataSource, {
                    // 展开数据，刷新页面
                    ...res.data,
                    role: roleList.filter((item) => item.id === res.data.roleId)[0]
                }]);
            });
            // 重置表单
            addForm.current.resetFields();
            // 关闭增加弹窗
            setIsAddVisible(false);
        });
    }
    // 更新用户当前的状态，是否被禁用
    const handleChange = (item) => {
        // console.log(item);
        item.roleState = !item.roleState;
        setDataSource([...dataSource]);
        axios.patch("/users/" + item.id, {
            roleState: item.roleState
        });
    }
    // 更新用户点击事件
    const handleUpdate = (item) => {
        // 显示修改弹窗
        setIsUpdateVisible(true);
        // 异步获取当前用户的信息，设置是否可以编辑
        setTimeout(() => {
            if (item.roleId === 1) {
                // 禁用
                setIsUpdateDisable(true);
            } else {
                setIsUpdateDisable(false);
            }
            // 设置当前用户的信息到表单
            updateForm.current.setFieldsValue(item);
        }, 0);
        // 设置当前用户的信息
        setCurrent(item);
    }
    // 修改用户点击确定事件
    const updateFormOk = (item) => {
        // 获取表单数据
        updateForm.current.validateFields().then(value => {
            // console.log(value);
            // 发送到后端
            axios.patch("/users/" + current.id, {
                ...value
            });
            // 更新前端数据源
            setDataSource(dataSource.map(data => {
                if (data.id === current.id) {
                    return {
                        // 展开数据，刷新页面
                        ...data,
                        ...value,
                        role: roleList.filter((item) => item.id === value.roleId)[0]
                    }
                }
                return data;
            }));
            // 设置修改弹窗为不可见
            setIsUpdateVisible(false);
            // 设置是否禁用更新取反
            setIsUpdateDisable(!isUpdateDisable);
        });
    }

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            filters: [
                {
                    text: '全球',
                    value: '全球'
                },
                ...regionList.map(item => {
                    return {
                        text: item.title,
                        value: item.value
                    }
                }),
            ],
            filterSearch: true,
            onFilter: (value, item) => {
                if (value === '全球') {
                    return item.region === "";
                } else {
                    return item.region === value;
                }
            },
            render: (region) => {
                return <b>{region === "" ? "全球" : region}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'role',
            render: (role) => {
                return role.roleName
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '用户名状态',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={roleState} disabled={item.default}
                               onChange={(checked) => handleChange(item)}/>
            }

        },
        {
            title: '操作',
            render: (item) => {
                return (
                    <div>
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}
                                onClick={() => handleUpdate(item)}/>
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
            <Button type={"primary"} onClick={() => setIsAddVisible(true)}>添加用户</Button>
            <Table dataSource={dataSource} columns={columns}
                   pagination={{pageSize: 5}}
                   rowKey={(item) => item.id}/>

            <Modal
                visible={isAddVisible}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                onCancel={() => setIsAddVisible(false)}
                onOk={() => addFormOk()}>
                <UserForm regionList={regionList} roleList={roleList} ref={addForm}/>
            </Modal>

            <Modal
                visible={isUpdateVisible}
                title="更新用户"
                okText="确定"
                cancelText="取消"
                onCancel={
                    () => {
                        setIsUpdateVisible(false)
                        setIsUpdateDisable(!isUpdateDisable)
                    }
                }
                onOk={() => updateFormOk()}>
                <UserForm regionList={regionList} roleList={roleList}
                          isUpdateVisible={isUpdateDisable} ref={updateForm}
                          isUpdate={true}/>
            </Modal>
        </div>
    );
}

export default UserList;