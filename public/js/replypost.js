const postReply = async (postId, content) => {
    try {
        const response = await fetch(`/api/post/${postId}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });

        if (response.ok) {
            const reply = await response.json();
            console.log('Reply posted successfully:', reply);
        } else {
            console.error('Failed to post reply:', response.statusText);
        }
    } catch (error) {
        console.error('Error posting reply:', error.message);
    }
};

const replyForm = document.querySelector('#replyForm');

replyForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const postId = replyForm.dataset.forumPostId;
    const content = replyForm.querySelector('#replyContent').value.trim();

    if (content) {
        await postReply(postId, content); 
    } else {
        alert('Reply content cannot be empty');
    }
});
