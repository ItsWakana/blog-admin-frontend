import { useParams } from "react-router-dom";
import useBlogPageInfo from "../hooks/useBlogPageInfo";
import { useEffect, useState } from "react";

import CommentSection from "./CommentSection";

const BlogPostPage = ({ validatePostEdit }) => {

    const { postId } = useParams();

    const { blogItem, error, isLoading, comments, setComments } = useBlogPageInfo(postId);

    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [publishState, setPublishState] = useState('');
    const [inputError, setInputError] = useState({for: '', error: ''});
    useEffect(() => {

        if (blogItem && blogItem.title && blogItem.content) {
            setBlogTitle(blogItem.title);
            setBlogContent(blogItem.content);
            setPublishState(blogItem.published.isPublished ? 'published' : 'unpublished');
        }
    },[blogItem])

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
        
        validatePostEdit(blogTitle, blogContent, formattedPublish, postId);
    }

    return (
        <div className="post-wrapper">
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                <form className="blog-post-form" onSubmit={handleSubmit}> 
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={blogTitle} 
                        onChange={(e) => setBlogTitle(e.target.value)}
                        className={inputError.for === 'title' ? 'input-error' : ''} />
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <textarea name="content" cols="30" rows="10" value={blogContent} onChange={(e) => setBlogContent(e.target.value)}
                        className={inputError.for === 'content' ? 'input-error' : ''}></textarea>
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
                    <button type="submit">Edit Post</button>
                    <p className="blog-error">{inputError.error}</p>
                </form>
            )}
        </div>
    );
}

export default BlogPostPage;