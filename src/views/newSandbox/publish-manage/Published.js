import React from 'react';
import NewsPublish from "../../../compoments/publish-manage/NewsPublish";
import usePublish from "../../../compoments/publish-manage/usePublish";
import {Button} from "antd";

function Published(props) {
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