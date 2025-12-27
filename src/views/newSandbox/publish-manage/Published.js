import React from 'react';
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";
import {Button} from "antd";

function Published() {
    const {dataSource, handleSunset} = usePublish(2);
    return (
        <div>
            <NewsPublish
                button={(id) => <Button type="primary" onClick={() => handleSunset(id)}>下线</Button>}
                dataSource={dataSource}/>
        </div>
    );
}

export default Published;