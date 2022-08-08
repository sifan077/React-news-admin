import React, {useEffect, useState} from "react";
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import {Editor} from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function NewEditor(props) {
    // 编辑器状态，初始化为空，输入后可以刷新
    const [editorState, setEditorState] = useState(null);

    useEffect(() => {
        // console.log(props.content);
        const html = props.content;
        if (html === undefined) return;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        }
    }, [props.content])

    return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={(editorState) => setEditorState(editorState)}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onBlur={() => {
                    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
                    //失去焦点后，给父组件传递编辑器的内容
                    props.getContext(draftToHtml(convertToRaw(editorState.getCurrentContent())));
                }}/>
        </div>
    );
}

export default NewEditor;