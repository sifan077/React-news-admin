import React from 'react';
import NewsPublish from "../../../compoments/publish-manage/NewsPublish";
import usePublish from "../../../compoments/publish-manage/usePublish";
import {Button} from "antd";

function Sunset(props) {
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