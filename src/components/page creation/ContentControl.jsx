import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const ContentControl = ({ valueSetter, innerContent }) => {

    const editorRef = useRef(null);

    return <Editor
    apiKey='9co21oru5yksr9rwycxaaw02543pyof3bnomvhipsg5ghl91'
    onInit={(evt, editor) => editorRef.current = editor}
    value={innerContent}
    onEditorChange={(newValue, editor) => {
        valueSetter(newValue);
    }}
    init={{
    height: 500,
    menubar: false,
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
    />
}

export default ContentControl;