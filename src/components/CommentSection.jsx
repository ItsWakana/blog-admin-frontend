import { useState } from "react";
import { formatDistance, parseISO } from "date-fns";

const CommentSection = ({ 
    isLoggedIn, 
    currentUser, 
    validateUserComment, 
    blogItem,
    comments,
    setComments
}) => {

    const [messageInput, setMessageInput] = useState('');
    const [messageLoading, setMessageLoading] = useState(false);

    const handleClick = async (e) => {
        setMessageLoading(true);
        e.preventDefault();

        const newUserComment = await validateUserComment(messageInput, blogItem);
        setMessageLoading(false);

        setComments((prevComments) => {
            const newComments = [...prevComments, newUserComment];

            return newComments.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        });
    }

    return (
        <>
        {isLoggedIn ? (
            <form onSubmit={handleClick} action="" method="POST">
                <div>
                    <label htmlFor="comment">{`Commenting as ${currentUser.name}`}</label>
                    <textarea name="comment" cols="30" rows="2" required={true}
                    onChange={(e) => setMessageInput(e.target.value)} value={messageInput}></textarea>
                </div>
                <button type="submit">Add comment</button>
            </form>
        ) : (
            <div className="login-tooltip">Log in to leave a comment!</div>
        )}
        <h2>Comments</h2>
        <ul className="comment-list">
            {messageLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                comments.map((comment) => (
                    <li className="comment-list__comment" key={comment._id}>
                        <p>{comment.author.name}</p>
                        <p>{comment.content}</p>
                        <p>{formatDistance(parseISO(comment.createdAt), new Date())} ago</p>
                    </li>
                ))
            )}
        </ul>
        </>
    )
}

export default CommentSection;