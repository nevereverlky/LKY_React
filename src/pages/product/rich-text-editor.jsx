import React from 'react'
import PropTypes from 'prop-types'
import {EditorState, convertToRaw} from 'draft-js'
import {ContentState, Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

//用于指定商品详情的富文本编辑器组件
class RichTextEditor extends React.Component {

    static propTypes = {
        detail: PropTypes.string
    }

    state = {
      editorState: EditorState.createEmpty(), //创建一个没有内容的编辑对象
    };

    constructor(props) {
        super(props);
        const html = this.props.detail;
        if(html) { //如果有值，根据html格式字符串创建一个对应的编辑对象
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty(), //创建一个没有内容的编辑对象
            }
        } 
    }

    //输入过程中实时回调
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }

    getDetail = () => {
        //返回输入数据对应的html格式文本
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', '/manage/img/upload')
            const data = new FormData()
            data.append('image', file)
            xhr.send(data)
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText)
                const url = response.data.url //得到图片的url
                resolve({data: {link: url}})
            })
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText)
                reject(error)
            })
        })
    }
    
    render() {

        const {editorState} = this.state;
        
        return(
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName='demp-editor'
                    editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        image: {uploadCallback: this.uploadImageCallBack, alt: {present: true, mandatory: true}},
                    }}
                />
                {/* <textarea
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                /> //内容转换为html标签*/}
            </div>
        );
    }
}
export default RichTextEditor;