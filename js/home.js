document.addEventListener('DOMContentLoaded', async () => {
    const rootElement = document.getElementById('root');

    try {
        const response = await fetch('http://localhost:3000/blog');
        const data = await response.json();

        if (data.blogs && data.blogs.length > 0) {
            const blogContainer = document.createElement('div');
            blogContainer.classList.add('blog-container');

            data.blogs.forEach(blog => {
                const blogElement = document.createElement('div');
                blogElement.classList.add('blog-item');
                blogElement.innerHTML = `
                 <div class="card-container">
    <div class="title-date-image-container">
        <div class="title-date-container" id=${blog._id}>
            <div>
                <h4 class="title">Title: ${blog.title}</h4>
            </div>
            <div style="text-align: right;">
                <p class="date">Created on: ${blog.createdAt.substring(0, 10)}</p>
            </div>
        </div>
        <img src="${blog.imageLink}" alt="Blog Image" class="blog-image">
    </div>
    <hr />
    <p class="description">Description: ${blog.description}</p>
</div>
                `;
                blogContainer.appendChild(blogElement);
            });

            rootElement.appendChild(blogContainer);
        } else {
            rootElement.innerHTML = '<div>There is no such blog.</div>';
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
        rootElement.innerHTML = '<div>There was an error fetching blogs. Please try again later.</div>';
    }
  const titleDateContainers = document.querySelectorAll(".title-date-container");


  titleDateContainers.forEach(container => {
    container.addEventListener("click", function () {
      
      const blogId = container.id;

      
      window.location.href = `detailedBlog.html?blogId=${blogId}`;
    });
  });
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

