document.addEventListener("DOMContentLoaded", function () {
    let checkToken = localStorage.getItem('token')
    if (!checkToken) {
        alert('Signin First')
        window.location.href = '/signin.html'
    }
    const blogDisplay = document.getElementById('blogDisplay');
    const updateBtn = document.getElementById('updateBtn');
    const deleteBtn = document.getElementById('deleteBtn');

    // Fetch blog data
    async function fetchBlogData() {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            const blogId = queryParams.get('blogId');
            if (!blogId) {
                throw new Error('Error fetching blog data');
            }
            const res = await fetch(`http://localhost:3000/blog/myBlogs/${blogId}`, {
                headers: {
                    authorization: "bearer " + localStorage.getItem("token")
                }
            });
            if (!res.ok) {
                throw new Error('Error fetching blog data');
            }
            const data = await res.json();
            const blog = data.blog;
            displayBlog(blog);
        } catch (error) {
            console.error(error);
            alert('Error fetching blog data');
        }
    }

    // Display blog data
    function displayBlog(blog) {
        if (!blog || blog.length === 0) {
            blogDisplay.innerHTML = '<div>There is no such blog.</div>';
            return;
        }
        const blogHTML = blog.map(b => `
  <div class="blog-card">
  <div class="display-blog-container">
    <div class="blog-details">
      <h3 class="blog-title">${b.title}</h3>
      <div class="blog-created-info">
        <p class="created-date">Created on:</p>
        <p>${b.createdAt.substring(0, 10)}</p>
      </div>
      <br />
      <h4 class="blog-description">${b.description}</h4>
      <br />
      <p class="blog-content">${b.content}</p>
      ${b.published ? '<p class="published-info">Published</p>' : '<p class="not-published-info" style="color: red;">Not Published</p>'}
      <hr class="hr-divider" />
    </div>
  </div>
  <div class="blog-image-container">
    <img src="${b.imageLink}" alt="Blog Image" class="blog-image">
  </div>
</div>
`).join('');


        blogDisplay.innerHTML = blogHTML;

        // Enable buttons if blog exists
        updateBtn.disabled = false;
        deleteBtn.disabled = false;
    }

    updateBtn.addEventListener('click', function () {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('blogId');
        if (blogId) {
            window.location.href = `/updateBlog.html?blogId=${blogId}`;
        } else {
            alert('Blog ID not found in URL parameters');
            
        }
    });

    // Delete blog button click handler
    deleteBtn.addEventListener('click', async function () {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('blogId');
        try {
            const res = await fetch(`http://localhost:3000/blog/myBlogs/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                }
            });

            if (res.ok) {
                const data = await res.json();
                if (data) {
                    alert('Blog Deleted successfully');
                    window.location.href = `/home.html`;
                } else {
                    alert('Error deleting blog');
                }
            } else {
                alert('Error deleting blog');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting blog');
        }
    });

    // Initial fetch blog data
    fetchBlogData();
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