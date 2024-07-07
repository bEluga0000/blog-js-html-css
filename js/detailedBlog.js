document.addEventListener('DOMContentLoaded', async () => {
    const rootElement = document.getElementById('root');
    const blogId = window.location.pathname.split('/').pop();
    const isLoading = false;

    try {
        const queryParams = new URLSearchParams(window.location.search);
        const blogId = queryParams.get('blogId');

        const response = await fetch(`http://localhost:3000/blog/${blogId}`);
        const data = await response.json();

        if (data.blog) {
            let blogs = data.blog
            const detailedBlogShowElement = document.createElement('div');
            detailedBlogShowElement.classList.add('detailed-blog-container');

            // Add the provided JSX code to the container element
            detailedBlogShowElement.innerHTML = `
      <div>
        ${blogs.title.length > 0 ?
                `<h1>${blogs.title}</h1>` :
                `<h3 class='no-content'>No content</h3>`}
        <img src="${blogs.imageLink}" alt="Blog Image" class="blog-image">
        <hr />
    </div>
    <div>
        ${blogs.description.length > 0 ?
                `<h2>${blogs.description}</h2>` :
                `<h6 class='no-content'>No description</h6>`}
        <h3> 
            <span class='bullet'>&bull;</span>
            Created on: ${blogs.createdAt.substring(0, 10)}
        </h3>
    </div>
    <div>
        ${blogs.content.length > 0 ?
                `<p>${blogs.content}</p>` :
                `<p class='no-content'>No content</p>`}
    </div>
`;
            rootElement.appendChild(detailedBlogShowElement);
        } else {
            rootElement.innerHTML = '<div>Something went wrong.</div>';
        }
    } catch (error) {
        console.error('Error fetching detailed blog:', error);
        rootElement.innerHTML = '<div>There was an error fetching the detailed blog. Please try again later.</div>';
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

