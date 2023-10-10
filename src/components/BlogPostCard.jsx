import { Link } from "react-router-dom";

const BlogPostCard = ({ post: {_id, title, content }, validatePostRemoval }) => {

    
    const contentSliced = content.slice(0, 120);

    return (
        <>
        <li className="blog-list__post"key={_id}>
            <p className="blog-post__heading">
                {title}</p>
            <p className="blog-post__content">
            {content.length > 120 ? `${contentSliced}...` : content}
            </p>
            <Link className="blog-post__link" to={`/posts/${_id}`}>
                Edit
            </Link>
            <button onClick={() => validatePostRemoval(_id)}className="blog-post__delete">Delete</button>
        </li>
        </>
    )
}

export default BlogPostCard;