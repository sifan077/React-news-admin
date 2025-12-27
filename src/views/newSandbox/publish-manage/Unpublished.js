import React from 'react';
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";
import {Button} from "antd";

function Unpublished() {
    const {dataSource, handlePublish} = usePublish(1);

    return (
        <div>
            <NewsPublish
                button={(id)=><Button type="primary" onClick={() => handlePublish(id)}>发布</Button>}
                dataSource={dataSource}/>
        </div>
    );
}

export default Unpublished;