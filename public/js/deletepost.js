const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      
      console.log('Deleting post with ID:', id)

      try {
        const response = await fetch(`/api/post/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.replace('/communityforum');
        } else {
          alert('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post');
      }
    }
  };
  
  document.querySelector('.posts').addEventListener('click', delButtonHandler);
  