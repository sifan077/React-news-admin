import React from 'react';


function NoPermission(props) {
    return (
        <div>
            <h1 style={{color: "red"}}>访问到了未知位置或者权限不够</h1>
        </div>
    );
}

export default NoPermission;