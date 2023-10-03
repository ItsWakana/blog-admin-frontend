import { useEffect, useState } from "react";

const useBlogPosts = () => {

    const [blogPosts, setBlogPosts] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/posts", {
                  method: "GET",
                });
          
                const fetchedPosts = await response.json();
                setIsLoading(false);
                setBlogPosts(fetchedPosts);
            } catch(err) {
                setError(err);
            }
        }

        getPosts();
    },[]);

    return [blogPosts, error, isLoading];
}

export default useBlogPosts;