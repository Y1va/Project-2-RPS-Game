const addPostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      try {
        const response = await fetch('/api/communityforum', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        const responseData = await response.json(); 
  
        if (response.ok) {
         
          document.location.replace('/communityforum');
        } else {
          alert(responseData.error || 'Failed to create post!');
        }
      } catch (error) {
        console.error('Failed to create post:', error);
        alert('An error occurred while creating the post. Please try again.');
      }
    } else {
      alert('Please enter both title and content for the post.');
    }
  };
  
document.querySelector('#add-post-form').addEventListener('submit', addPostFormHandler);
  