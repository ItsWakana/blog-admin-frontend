import { useParams } from "react-router-dom";
import useBlogPageInfo from "../hooks/useBlogPageInfo";
import { useEffect, useState } from "react";

import CommentSection from "./CommentSection";

const BlogPostPage = ({ isLoggedIn, currentUser, validateUserComment }) => {

    const { postId } = useParams();

    const { blogItem, error, isLoading, comments, setComments } = useBlogPageInfo(postId);

    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [publishState, setPublishState] = useState('');

    useEffect(() => {

        if (blogItem && blogItem.title && blogItem.content) {
            setBlogTitle(blogItem.title);
            setBlogContent(blogItem.content);
            setPublishState(blogItem.published.isPublished ? 'published' : 'unpublished');
        }
    },[blogItem])

    return (
        <div className="post-wrapper">
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                <form className="blog-post-form"> 
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={blogTitle} 
                        onChange={(e) => setBlogTitle(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <textarea name="content" cols="30" rows="10" value={blogContent} onChange={(e) => setBlogContent(e.target.value)}></textarea>
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
                    {/* <CommentSection isLoggedIn={isLoggedIn} currentUser={currentUser} validateUserComment={validateUserComment} blogItem={blogItem} comments={comments} setComments={setComments}/> */}
                </form>
            )}
        </div>
    );
}

export default BlogPostPage;