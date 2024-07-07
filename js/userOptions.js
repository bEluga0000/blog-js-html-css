document.addEventListener("DOMContentLoaded", function () {
  let checkToken = localStorage.getItem('token')
  if (!checkToken) {
    alert('Signin First')
    window.location.href = '/signin.html'
  }
    const userOptionsContainer = document.getElementById("userOptions");
    const navigate = function (path) {
        console.log(`Navigating to ${path}`);
        // Implement navigation to the specified path
    };

    // User options HTML
    const userOptionsHTML = `
    <div class="user-option" id="draftedBlogsOption">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M16 2v4.587l-6 6.001-6-6.001v-4.587l6 5.999 6-5.999zm0 15.413l-6-6.001 6-6.001 6 6.001-6 6.001z"/>
      </svg>
      Drafted Blogs
    </div>
    <hr>
    <div class="user-option" id="publishedBlogsOption">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M16 2v4.587l-6 6.001-6-6.001v-4.587l6 5.999 6-5.999zm0 15.413l-6-6.001 6-6.001 6 6.001-6 6.001z"/>
      </svg>
      Published Blogs
    </div>
    <hr>
    <div class="user-option" id="logoutOption" onclick="logout()">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M16 2v4.587l-6 6.001-6-6.001v-4.587l6 5.999 6-5.999zm0 15.413l-6-6.001 6-6.001 6 6.001-6 6.001z"/>
      </svg>
      Log Out
    </div>
  `;

    // Render user options
    userOptionsContainer.innerHTML = userOptionsHTML;

    document.getElementById("draftedBlogsOption").addEventListener("click", function () {
      window.location.href = "/draftedBlog.html";
    });

    document.getElementById("publishedBlogsOption").addEventListener("click", function () {
      window.location.href = "/publishedBlogs.html";
    });

    document.getElementById("logoutOption").addEventListener("click", function () {
      localStorage.setItem('token', '');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      navigate('/');
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