document.addEventListener('DOMContentLoaded', async () => {
    let checkToken = localStorage.getItem('token')
    if (!checkToken) {
        alert('Signin First')
        window.location.href = '/signin.html'
    }
    const rootElement = document.getElementById('root');
    const loadingElement = document.createElement('div');
    loadingElement.textContent = 'Loading...';
    rootElement.appendChild(loadingElement);

    try {
        const response = await fetch('http://localhost:3000/blog/myblogs/draft', {
            headers: {
                authorization: 'bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        rootElement.removeChild(loadingElement);

        const blogContainer = document.createElement('div');
        blogContainer.classList.add('blog-container');

        if (data.draftedBlogs) {
            data.draftedBlogs.forEach(blog => {
                const blogId = blog._id
                const blogItem = document.createElement('div');
                blogItem.classList.add('blog-item');

                const blogTitle = document.createElement('div');
                blogTitle.classList.add('blog-title');
                blogTitle.textContent = blog.title || 'No Content';
                blogItem.appendChild(blogTitle);
                blogTitle.addEventListener('click', function () {
                    window.location.href = `/previewPage.html?blogId=${blogId}`; 
                });

                const blogDetails = document.createElement('div');
                blogDetails.classList.add('blog-details');

                const blogDate = document.createElement('div');
                blogDate.classList.add('blog-date');
                blogDate.textContent = 'Created on ' + blog.createdAt.substring(0, 10);
                blogDetails.appendChild(blogDate);

                if (blog.published) {
                    const publishedStatus = document.createElement('div');
                    publishedStatus.classList.add('published');
                    publishedStatus.textContent = 'Published';
                    blogDetails.appendChild(publishedStatus);
                } else {
                    const notPublishedStatus = document.createElement('div');
                    notPublishedStatus.classList.add('not-published');
                    notPublishedStatus.textContent = 'Not Published';
                    blogDetails.appendChild(notPublishedStatus);
                }

                blogItem.appendChild(blogDetails);

                const blogDesc = document.createElement('div');
                blogDesc.classList.add('blog-desc');
                blogDesc.textContent = blog.description || 'No description';
                blogItem.appendChild(blogDesc);

                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update';
                updateBtn.classList.add('update-btn');
                updateBtn.id = blog._id;
                updateBtn.addEventListener('click', () => {
                    const blogId = updateBtn.id;
                    window.location.href = `/updateBlog.html?blogId=${blogId}`;
                });
                blogItem.appendChild(updateBtn);

                blogContainer.appendChild(blogItem);
            });
        } else {
            const noBlogsMessage = document.createElement('div');
            noBlogsMessage.textContent = 'No drafted blogs available.';
            blogContainer.appendChild(noBlogsMessage);
        }

        rootElement.appendChild(blogContainer);
    } catch (error) {
        console.error('Error fetching drafted blogs:', error);
        rootElement.removeChild(loadingElement);
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'There was an error fetching drafted blogs. Please try again later.';
        rootElement.appendChild(errorMessage);
    }
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
