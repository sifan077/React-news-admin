import React, {forwardRef, useEffect, useState} from 'react';
import {Form, Input, Select} from "antd";

const {Option} = Select;
// 将表单数据使用ref传输到父组件
const UserForm = forwardRef((props, ref) => {

        // 设置是否可以选择，如果是超级管理员就不可以选择，默认可以选择
        const [idDisabled, setIsDisabled] = useState(false);
        // 从本地token获取角色类型和地区
        const {roleId, region} = JSON.parse(localStorage.getItem("token"));


        // roleId  1 超级管理员 2 区域 管理员 3 区域编辑
        // 区域是否禁用
        const checkRegionDisabled = (item) => {
            if (props.isUpdate) {
                // 如果是表单更新
                if (roleId === 1) {
                    // 如果是超级管理员，直接不禁用
                    return false;
                } else {
                    // 反之则禁用
                    return true;
                }
            } else {
                // 增加表单
                if (roleId === 1) {
                    // 如果是超级管理员，直接不禁用
                    return false;
                } else {
                    // 只能选择自己当前管理的区域
                    return region !== item;
                }
            }
        }
        // roleId  1 超级管理员 2 区域 管理员 3 区域编辑
        // 选择角色类型是否禁用
        const checkRoleDisabled = (item) => {
            if (props.isUpdate) {
                // 如果是表单更新
                if (roleId === 1) {
                    // 如果是超级管理员，直接不禁用
                    return false;
                } else {
                    // 反之则禁用
                    return true;
                }
            } else {
                // 增加表单
                if (roleId === 1) {
                    // 如果是超级管理员，直接不禁用
                    return false;
                } else {
                    // 只能选择自区域编辑
                    return item.id !== 3;
                }
            }
        }

        // 获取传来的参数设置
        useEffect(() => {
            setIsDisabled(props.isUpdateVisible)
        }, [props.isUpdateVisible, roleId, region]);

        return (
            <Form
                ref={ref}
                layout="vertical">
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{required: true, message: '请输入用户名'}]}>
                    <Input/>
                </Form.Item>

                <Form.Item name="password" label="密码"
                           rrules={[{required: true, message: '请输入密码'}]}>
                    <Input type="password"/>
                </Form.Item>
                {/*通过禁用状态设置是否可选中*/}
                <Form.Item name="region" label={"区域"}
                           rules={idDisabled ? [] : [{required: true, message: '请选择区域'}]}>
                    <Select style={{width: 120}} disabled={idDisabled}>
                        {
                            props.regionList.map((item, index) => {
                                return <Option key={index} value={item.value}
                                               disabled={checkRegionDisabled(item.value)}>{item.tittle}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="roleId" label={"角色"}
                           rules={[{required: true, message: '请选择角色'}]}>
                    <Select style={{width: 120}}
                            onChange={(value) => {
                                // console.log(value);
                                // console.log(typeof value);
                                // console.log(value === 1);
                                if (value === 1) {
                                    //如果是超级管理员，就不可以选择
                                    setIsDisabled(true);
                                    // 给表单设置默认值
                                    ref.current.setFieldsValue({
                                        region: ""
                                    });
                                } else {
                                    // 如果不是超级管理员，就可以选择
                                    setIsDisabled(false);
                                }
                            }}>
                        {
                            props.roleList.map((item, index) => {
                                // 用index当key，因为是数组，所以不会有重复的key
                                // 使用id作为value，用来确定是哪个角色
                                return <Option key={index} value={item.id}
                                               disabled={checkRoleDisabled(item)}>{item.roleName}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>
        );
    })
;

export default UserForm;