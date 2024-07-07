document.addEventListener("DOMContentLoaded", function () {
    let checkToken = localStorage.getItem('token')
    if (!checkToken) {
        alert('Signin First')
        window.location.href = '/signin.html'
    }
    const updateBlogContainer = document.getElementById("updateBlog");

    // Initial state values
    let title = '';
    let desc = '';
    let content = '';
    let loading = true;
    let isChecked = false;
    let blogId = '';
    let publish = false;
    let isDisabled = true;
    let checkBoxDisabled = false;
    let imageLink = '';

    async function blogInit() {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            const blogId = queryParams.get('blogId');
            const res = await fetch(`http://localhost:3000/blog/myBlogs/${blogId}`, {
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                }
            });

            if (!res.ok) {
                throw new Error('Failed to fetch blog data');
            }

            const data = await res.json();
            const blogData = data.blog;

            if (blogData && blogData.length > 0) {
                title = blogData[0].title;
                desc = blogData[0].description;
                content = blogData[0].content;
                // blogId = blogData[0]._id;
                imageLink = blogData[0].imageLink;

                if (blogData[0].published) {
                    publish = true;
                    isChecked = true;
                } else {
                    publish = false;
                }
                loading = false;
                updateBlogForm();
            }
        } catch (error) {
            console.error(error);
            alert('Error fetching blog data');
        }
    }

    function updateBlogForm() {
        // Update blog form HTML
        const updateBlogFormHTML = `
            <div>
              <button id="updateBtn" class="update-btn" ${isDisabled ? 'disabled' : ''}>Update</button>
              <div class="publish-section">
                <input type="checkbox" id="publishCheck" class="publish-checkbox" ${isChecked ? 'checked' : ''} ${checkBoxDisabled  ? 'disabled' : ''}>
                <label for="publishCheck" class="publish-label">Publish</label>
                <p class="publish-message">!This Blog is not published. If you want to publish, please check the box before you update.</p>
              </div>
            </div>
            <p>Image link:</p>
            <textarea id="imageLinkArea" placeholder="Image Link" rows="2">${imageLink ? imageLink:""}</textarea>
            <p>Title:</p>
            <textarea id="titleTextarea" placeholder="Title.." rows="2">${title}</textarea>
            <p>Description:</p>
            <textarea id="descTextarea" placeholder="Description.." rows="2">${desc}</textarea>
            <hr>
            <p>Content:</p>
            <textarea id="contentTextarea" placeholder="Tell Your..." rows="30">${content}</textarea>
        `;

        
        // Render the update blog form
        updateBlogContainer.innerHTML = updateBlogFormHTML;

        // Update button event listener
        document.getElementById("updateBtn").addEventListener("click", updateBlog);
        // Event listener for image textarea
        document.getElementById("imageLinkArea").addEventListener("input", function (event) {
            imageLink = event.target.value;
            updateButtonState();
        });

        // Event listener for title textarea
        document.getElementById("titleTextarea").addEventListener("input", function (event) {
            title = event.target.value;
            updateButtonState();
        });

        // Event listener for description textarea
        document.getElementById("descTextarea").addEventListener("input", function (event) {
            desc = event.target.value;
            updateButtonState();
        });

        // Event listener for content textarea
        document.getElementById("contentTextarea").addEventListener("input", function (event) {
            content = event.target.value;
            updateButtonState();
        });

        // Event listener for publish checkbox
        document.getElementById("publishCheck").addEventListener("change", function (event) {
            isChecked = event.target.checked;
            updateButtonState();
        });

        // Function to update the button state
        function updateButtonState() {
            isDisabled = !(title.length > 0 && desc.length > 0 && content.length > 0 && imageLink.length>0);
            document.getElementById("updateBtn").disabled = isDisabled;
            checkBoxDisabled = !(title.length > 0 && desc.length > 0 && content.length > 0 && imageLink.length>0);
            document.getElementById("publishCheck").disabled = checkBoxDisabled;
        }
    }

    // Function to update the blog
    async function updateBlog() {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            const blogId = queryParams.get('blogId');
            const res = await fetch(`http://localhost:3000/blog/myBlogs/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    title,
                    description: desc,
                    content,
                    published: isChecked,
                    imageLink
                })
            });

            if (res.ok) {
                const data = await res.json();
                if (data) {
                    window.location.href = `/previewPage.html?blogId=${blogId}`;
                } else {
                    alert('Failed to update the blog');
                }
            } else {
                throw new Error('Failed to update the blog');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to update the blog');
        }
    }

    blogInit();
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
