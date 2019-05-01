import React , {Component} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Editor.css';

const EditFile = () =>  {
    return(
        <div className="E-Container">
            <Editor
                initialValue="<p>This is the initial content of the editor</p>"
                init={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                }}
            />
        </div>
    )
            }


export default EditFile;