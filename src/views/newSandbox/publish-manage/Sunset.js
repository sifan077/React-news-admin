import React from 'react';
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";
import {Button} from "antd";

function Sunset() {
    const {dataSource, handleDelete} = usePublish(3);
    return (
        <div>
            <NewsPublish
                button={(id)=><Button danger onClick={() => handleDelete(id)}>删除</Button>}
                dataSource={dataSource}/>
        </div>
    );
}

export default Sunset;