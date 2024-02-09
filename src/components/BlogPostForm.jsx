import { useState, useRef } from "react";
import ContentControl from "./page creation/ContentControl";
import Placeholder from "./page creation/Placeholder";

const BlogPostForm = ({ validatePostCreation }) => {

    const [blogTitle, setBlogTitle] = useState('');
    // const [placeholders, setPlaceholders] = useState([]);
    const [publishState, setPublishState] = useState('');
    const [inputError, setInputError] = useState({for: '', error: ''});

    const editorRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (blogTitle === '') {
            setInputError({ for: 'title', error: 'Title is empty'});
            return;
        }

        // if (blogContent === '') {
        //     setInputError({for: 'content', error: 'Post content is empty'});
        //     return;
        // }

        setInputError({for: '', error: ''});

        const formattedPublish = publishState === 'published';
        
        validatePostCreation(blogTitle, formattedPublish);
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
                <div className="row">
                    <div className="page__placeholder-full-width">
                        <Placeholder />
                    </div>
                </div>
                <div className="row">
                    <div className="page__placeholder-full-width">
                        <Placeholder />
                    </div>
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