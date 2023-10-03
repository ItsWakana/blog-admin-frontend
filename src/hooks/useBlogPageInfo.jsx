import { useEffect, useState } from "react"

const useBlogPageInfo = (postId) => {

    const [blogItem, setBlogItem] = useState(null);
    const [comments, setComments] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {

        const fetchBlogItem = async () => {

            try {
                const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                    method: "GET",
                });
    
                const blogData = await response.json();
                setIsLoading(false);
                setBlogItem(blogData);
                const sortedComments = blogData.comments.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setComments(sortedComments);
            } catch(err) {
                setError(err);
            }

        }

        fetchBlogItem();

    },[]);

    return { blogItem, error, isLoading, comments, setComments };

}

export default useBlogPageInfo;