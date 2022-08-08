import React, {useEffect, useState, useRef} from 'react';
import {PageHeader, Steps, Button, Form, Input, Select, message, notification} from 'antd';

import style from './NewsAdd.module.css';
import axios from "axios";
import NewEditor from "../../../../compoments/news-manage/NewEditor";
import {useNavigate} from "react-router";

const {Step} = Steps;
const {Option} = Select;

function NewsAdd(props) {
    // 路由跳转
    const navigate = useNavigate();
    // 当前是第几部的状态
    const [current, setCurrent] = useState(0);
    // 新闻标题列表
    const [categoryList, setCategoryList] = useState([]);
    // 设置当前表单
    const [formInfo, setFormInfo] = useState({});
    // 获取编辑器的内容
    const [content, setContent] = useState("");
    // 使用ref获取表单
    const NewsForm = useRef(null);

    //本地获取用户
    const User = JSON.parse(localStorage.getItem("token"));

    // 到下一步
    const handleNext = () => {
        if (current === 0) {
            // 检查表单时否填写完整
            NewsForm.current.validateFields().then(res => {
                // console.log(res);
                setFormInfo(res);
                setCurrent(current + 1);
            }).catch(err => {
                console.log(err);
            });
        } else {
            // console.log(formInfo, content);
            if (content === "") {
                //如果未输入
                message.error("请输入新闻内容");
            } else {
                setCurrent(current + 1);
            }
        }
    }
    const handlePrevious = () => {
        setCurrent(current - 1);
    }

    const handleSave = (auditState) => {
        // 通过axios发送请求，auditState决定是否审核或者存草稿
        axios.post('/news', {
            ...formInfo,
            "content": content,
            "region": User.region ? User.region : "全球",
            "author": User.username,
            "roleId": User.roleId,
            "auditState": auditState,
            "publishState": 0,
            "createTime": Date.now(),
            "star": 0,
            "view": 0,
            // "publishTime": 0
        }).then(res => {
            // 跳转到草稿箱或者审核列表
            navigate(auditState === 0 ? "/news-manage/draft" : "/audit-manage/list");
            // 通知用户
            notification.info({
                message: `通知`,
                description: `您可以到${auditState === 0 ? "草稿箱" : "审核管理"}中查看新闻`,
                placement: "bottomRight",
            });
        });
    }

    // 获取新闻类型列表
    useEffect(() => {
        axios.get("/categories").then(res => {
            // console.log(res.data);
            setCategoryList(res.data);
        });
    }, []);

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="撰写新闻"
                // subTitle="子标题"
            />
            <Steps current={current}>
                <Step title="基本信息" description="新闻标题,新闻分类"/>
                <Step title="新闻内容" description="新闻主体内容"/>
                <Step title="新闻提交" description="保存草稿或者提交审核"/>
            </Steps>
            <div style={{marginTop: "50px"}}>
                <div className={current === 0 ? "" : style.activate}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        ref={NewsForm}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off">
                        <Form.Item
                            label="新闻标题"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新闻标题',
                                },
                            ]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="新闻分类"
                            name="categoryId"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择新闻分类',
                                },
                            ]}>
                            <Select>
                                {
                                    categoryList.map(item => {
                                        return <Option key={item.id} value={item.id}>{item.value}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </div>
                <div className={current === 1 ? "" : style.activate}>
                    <NewEditor getContext={(value) => {
                        // 通过回调获取编辑器的内容
                        // console.log(value);
                        setContent(value);
                    }}/>
                </div>
                <div className={current === 2 ? "" : style.activate}>

                </div>
            </div>
            <div style={{marginTop: "50px"}}>
                {current === 2 &&
                    <span><Button type="primary" onClick={() => handleSave(0)}>保存草稿</Button><Button
                        onClick={() => handleSave(1)} danger>提交审核</Button></span>}
                {current < 2 && <Button type="primary" onClick={() => {
                    handleNext();
                }}>下一步</Button>}

                {current > 0 && <Button onClick={() => {
                    handlePrevious();
                }}>上一步</Button>}
            </div>
        </div>
    );
}

export default NewsAdd;