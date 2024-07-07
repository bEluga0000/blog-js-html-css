document.addEventListener("DOMContentLoaded", function () {
    let checkToken = localStorage.getItem('token')
    if (!checkToken) {
        alert('Signin First')
        window.location.href = '/signin.html'
    }
    const publishedBlogsContainer = document.getElementById("publishedBlogs");

    // Fetch published blogs
    async function fetchPublishedBlogs() {
        try {
            const res = await fetch('http://localhost:3000/blog/myblogs/published', {
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('token')
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch published blogs');
            }

            const data = await res.json();
            const publishedBlogs = data.publishedBLogs;
            displayPublishedBlogs(publishedBlogs);
        } catch (error) {
            console.error(error);
            alert('Something went wrong while fetching published blogs');
        }
    }

    // Display published blogs
    function displayPublishedBlogs(publishedBlogs) {
        publishedBlogsContainer.innerHTML = "";
        publishedBlogs.forEach(blog => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");

            const title = document.createElement("div");
            title.classList.add("blog-title");
            title.textContent = blog.title;

            const info = document.createElement("div");
            info.classList.add("blog-info");

            const createdAt = document.createElement("div");
            createdAt.textContent = "Created on: " + blog.createdAt.substring(0, 10);

            const publishedBadge = document.createElement("span");
            publishedBadge.classList.add(blog.published ? "published-badge" : "not-published-badge");
            publishedBadge.textContent = blog.published ? "Published" : "Not Published";

            info.appendChild(createdAt);
            info.appendChild(publishedBadge);

            const description = document.createElement("div");
            description.classList.add("blog-description");
            description.textContent = blog.description;

            const actionButtons = document.createElement("div");
            actionButtons.classList.add("action-buttons");

            const updateButton = document.createElement("button");
            updateButton.classList.add("button", "update-button");
            updateButton.textContent = "Update";
            updateButton.addEventListener("click", () => {
                window.location.href = `/updateBlog.html?blogId=${blog._id}`;
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("button", "delete-button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", async () => {
                await deleteBlog(blog._id);
            });

            actionButtons.appendChild(updateButton);
            actionButtons.appendChild(deleteButton);

            blogCard.appendChild(title);
            blogCard.appendChild(info);
            blogCard.appendChild(description);
            blogCard.appendChild(actionButtons);

            publishedBlogsContainer.appendChild(blogCard);
        });
    }

    // Function to delete blog
    async function deleteBlog(blogId) {
        try {
            const response = await fetch(`http://localhost:3000/blog/myBlogs/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    alert('Blog deleted successfully');
                    // Refresh published blogs after deletion
                    fetchPublishedBlogs();
                } else {
                    alert('Error deleting blog');
                }
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Error deleting blog');
        }

    }

    // Initial fetch of published blogs
    fetchPublishedBlogs();
});
function createAppBar() {
    const appbarDiv = document.getElementById('appbar');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const html = `
    <div class="appbar-logo" onclick="window.location.href = 'home.html'">
      <h3>BloGoo</h3>
    </div>
    <div class="appbar-btns">
      ${token ? `
        <button onclick="window.location.href = 'createBlog.html'" style="cursor: pointer;">
          Write Blog
        </button>
        <button onclick="logout()">Logout</button>
        <button onclick="window.location.href = 'userOptions.html'">Welcome, ${username}</button>
      ` : `
        <button><a href="/signin.html">Signin</a></button>
        <button><a href="/signup.html">Signup</a></button>
      `}
    </div>
  `;
    appbarDiv.innerHTML = html;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    window.location.href = '/index.html';
}

// Call createAppBar function when the page loads
window.onload = createAppBar;
