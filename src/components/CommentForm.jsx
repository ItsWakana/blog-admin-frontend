import { useState } from "react";

const CommentForm = ({ currentUser, validateUserComment, blogItem }) => {

    const [messageInput, setMessageInput] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();

        validateUserComment(messageInput, blogItem);
    }

    return (
        <form onSubmit={handleClick} action="" method="POST">
            <div>
            <label htmlFor="comment">{`Commenting as ${currentUser.name}`}</label>
            <textarea name="comment" cols="30" rows="2" required={true}
            onChange={(e) => setMessageInput(e.target.value)} value={messageInput}></textarea>
            </div>
            <button type="submit">Add comment</button>
        </form>
    )
}

export default CommentForm;