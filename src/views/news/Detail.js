import React from 'react';
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Descriptions, PageHeader} from "antd";
import moment from "moment";
import {HeartTwoTone} from '@ant-design/icons';

function Detail(props) {
    const navigate = useNavigate();
    const [newsInfo, setNewsInfo] = useState(null);
    const params = useParams();
    useEffect(() => {
        // console.log(params.id);
        axios.get(`/news/${params.id}?_expand=category&_expand=role`).then(res => {
            // console.log(res.data);
            setNewsInfo({
                ...res.data,
                view: res.data.view + 1,
            });
            return res.data;
        }).then(res => {
            axios.patch(`/news/${params.id}`, {
                view: res.view + 1,
            });
        });
    }, [params])

    const handleStar = () => {
        setNewsInfo({
            ...newsInfo,
            star: newsInfo.star + 1,
        });
        axios.patch(`/news/${params.id}`, {
            star: newsInfo.star + 1,
        });
    }
    return (
        <div>
            <PageHeader
                onBack={() => navigate(-1)}
                title={newsInfo?.title}
                subTitle={<div>
                    <span>{newsInfo?.category.title}</span>
                    <HeartTwoTone
                        onClick={() => {
                            handleStar();
                        }}
                        twoToneColor="#eb2f96"/>
                </div>}>
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="创建者">{newsInfo?.author}</Descriptions.Item>
                    <Descriptions.Item
                        label="发布时间">{newsInfo?.publishTime ? moment(newsInfo?.createTime).format("YYYY/MM/DD HH:mm:ss") : "-"}</Descriptions.Item>
                    <Descriptions.Item label="区域">{newsInfo?.region}</Descriptions.Item>
                    <Descriptions.Item label="访问数量">{newsInfo?.view}</Descriptions.Item>
                    <Descriptions.Item label="点赞数量">{newsInfo?.star}</Descriptions.Item>
                    <Descriptions.Item label="评论数量">0</Descriptions.Item>
                </Descriptions>
            </PageHeader>
            <div dangerouslySetInnerHTML={{
                __html: newsInfo?.content
            }} style={{border: "1px solid gray", margin: "0 24px"}}>
            </div>
        </div>
    );
}

export default Detail;