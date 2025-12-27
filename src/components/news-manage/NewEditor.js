import React, {useEffect, useState} from "react";
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import {Editor} from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function NewEditor(props) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    useEffect(() => {
        const html = props.content;
        if (html === undefined) return;

        const contentBlock = htmlToDraft(html);
        if (!contentBlock) return;

        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
    }, [props.content]);

    return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={(nextEditorState) => setEditorState(nextEditorState)}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onBlur={() => {
                    props.getContext(draftToHtml(convertToRaw(editorState.getCurrentContent())));
                }}
            />
        </div>
    );
}

export default NewEditor;