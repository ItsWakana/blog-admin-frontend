import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const BlogPostForm = ({ validatePostCreation }) => {

    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [publishState, setPublishState] = useState('');
    const [inputError, setInputError] = useState({for: '', error: ''});

    const editorRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (blogTitle === '') {
            setInputError({ for: 'title', error: 'Title is empty'});
            return;
        }

        if (blogContent === '') {
            setInputError({for: 'content', error: 'Post content is empty'});
            return;
        }

        setInputError({for: '', error: ''});

        const formattedPublish = publishState === 'published';
        
        validatePostCreation(blogTitle, blogContent, formattedPublish);
    }

    return (
        <div className="post-wrapper">
            <h1>Create post</h1>
            <form className="blog-post-form" onSubmit={handleSubmit}> 
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={blogTitle} 
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className={inputError.for === 'title' ? 'input-error' : ''} />
                </div>
                <div>
                    <label htmlFor="content">Content</label>
                    {/* <textarea name="content" cols="30" rows="10" value={blogContent} onChange={(e) => setBlogContent(e.target.value)}
                    className={inputError.for === 'content' ? 'input-error' : ''}></textarea> */}
                    <Editor
                        apiKey='9co21oru5yksr9rwycxaaw02543pyof3bnomvhipsg5ghl91'
                        onInit={(evt, editor) => editorRef.current = editor}
                        value={blogContent}
                        onEditorChange={(newValue, editor) => {
                            // setBlogContent(editor.getContent({ format: 'text'}));
                            setBlogContent(newValue);
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
                </div>
                <div>
                <label htmlFor="published">Published</label>
                <input type="radio" id="published" name="published_state" value="published" 
                checked={publishState === "published"}
                onChange={(e) => setPublishState(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="unpublish">Unpublished</label>
                <input type="radio" id="unpublish" name="published_state" value="unpublished"
                checked={publishState === "unpublished"} 
                onChange={(e) => setPublishState(e.target.value)}/>
                </div>
                <button type="submit">Create post</button>
                <p className="blog-error">{inputError.error}</p>
            </form>
        </div>
    );
}

export default BlogPostForm;