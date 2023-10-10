import useBlogPosts from "../hooks/useBlogPosts"
import BlogPostCard from "./BlogPostCard";

const BlogList = ({ currentUser, isLoggedIn, validatePostRemoval }) => {

    const [blogPosts, error, isLoading] = useBlogPosts();
    
    return (
        <>
        {isLoggedIn && (
            <h1 className="welcome-header">Welcome, {currentUser.name}</h1>
        )}
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <div className="main-blog">
                <ul className="blog-list">
                    {blogPosts.map((post) => (
                        <BlogPostCard key={post._id} post={post}
                        currentUser={currentUser} isLoggedIn={isLoggedIn} validatePostRemoval={validatePostRemoval}/>
                    ))}
                </ul>
            </div>
        )}
        </>
    )
}

export default BlogList;