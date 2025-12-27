import React from 'react';
import {Table} from "antd";

function NewsPublish(props) {
    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
            render: (text, record) => {
                return (
                    <a href={`#/news-manage/preview/${record.id}`}>{text}</a>
                );
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
                        {props.button(item.id)}
                    </div>
                )
            }
        }
    ];
    return (
        <div>
            <Table
                rowKey={item => item.id}
                pagination={{pageSize: 5}}
                columns={columns}
                dataSource={props.dataSource}/>
        </div>
    );
}

export default NewsPublish;