document.addEventListener("DOMContentLoaded", function () {
    let checkToken = localStorage.getItem('token')
    if (!checkToken) {
        alert('Signin First')
        window.location.href = '/signin.html'
    }
    const root = document.getElementById('root');

    // Function to fetch blogs from the backend
    function fetchBlogs() {
        isLoading(true); // Show loading indicator

        // Make a GET request to fetch blogs
        fetch('http://localhost:3000/blog/myblogs/all', {
            method: 'GET',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                return response.json();
            })
            .then(data => {
                if (data.blogs) {
                    renderBlogs(data.blogs);
                } else {
                    throw new Error('No blogs found');
                }
            })
            .catch(error => {
                console.error(error);
                alert(error.message);
            })
            .finally(() => {
                isLoading(false); // Hide loading indicator
            });
    }

    // Function to toggle loading indicator
    function isLoading(status) {
        // Add your loading indicator logic here
        // For example, show/hide a spinner or update UI text
    }

    // Function to render fetched blogs to the UI
    function renderBlogs(blogs) {
        root.innerHTML = ''; // Clear previous content

        // Iterate through each blog and create UI elements
        blogs.forEach(blog => {
            const blogElement = document.createElement('div');
            blogElement.textContent = blog.title;
            root.appendChild(blogElement);
        });
    }

    // Call the fetchBlogs function when the page loads
    fetchBlogs();
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
