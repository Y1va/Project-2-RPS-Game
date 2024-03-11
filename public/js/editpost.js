const updatePostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title").textContent.trim();
    const content = document.querySelector("#content").textContent.trim();
  
    if (title && content) {
      const id = event.target.getAttribute('data-id');    
      const response = await fetch(`/api/post/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${id}`); 
      } else {
        alert("Failed to update the post.");
      }
    }
  };
  
  document.querySelector("#editBtn").addEventListener("click", updatePostFormHandler);
  