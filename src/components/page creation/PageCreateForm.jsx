import { useState } from "react";

const PageCreateForm = ({ validatePageCreation }) => {

    const [pageTitle, setPageTitle] = useState('');
    const [publishState, setPublishState] = useState('');
    const [inputError, setInputError] = useState({for: '', error: ''});

    const handleSubmit = (e) => {
        e.preventDefault();

        if (pageTitle === '') {
            setInputError({ for: 'title', error: 'Title is empty'});
            return;
        }

        setInputError({for: '', error: ''});

        const formattedPublish = publishState === 'published';
        
        // if (!validatePageCreation(pageTitle, formattedPublish)) {
        //     setInputError({ for: '', error: 'Post update failed. Please try again.'})
        // }
    }

    return (
        <div className="post-wrapper">
            <h1>Create new page</h1>
            <form className="blog-post-form" onSubmit={handleSubmit}> 
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={pageTitle} 
                    onChange={(e) => setPageTitle(e.target.value)}
                    className={inputError.for === 'title' ? 'input-error' : ''} />
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
                <button type="submit">Create page</button>
                <p className="blog-error">{inputError.error}</p>
            </form>
        </div>
    );
}

export default PageCreateForm;