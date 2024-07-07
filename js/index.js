document.addEventListener("DOMContentLoaded", function () {
    const navigate = function (path) {
        // You need to implement the navigation logic here
        console.log("Navigating to:", path);
    };

  const username = localStorage.getItem('username'); // Set username value accordingly

    const root = document.getElementById("root");

    const container = document.createElement("div");
    container.classList.add("container");

    const heading = document.createElement("h3");
    heading.textContent = "Publish Your passions, your Way";
    container.appendChild(heading);

    const paragraph = document.createElement("p");
    paragraph.textContent = "Create a unique and beautiful blog easily.";
    container.appendChild(paragraph);

    if (username) {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const createButton = document.createElement("button");
        createButton.textContent = "Create";
        createButton.classList.add("button");
        createButton.addEventListener("click", function () {
          window.location.href = '/createBlog.html'
        });
        buttonContainer.appendChild(createButton);

        const exploreButton = document.createElement("button");
        exploreButton.textContent = "Explore";
        exploreButton.classList.add("button");
        exploreButton.addEventListener("click", function () {
          window.location.href = '/home.html'
        });
        buttonContainer.appendChild(exploreButton);

        container.appendChild(buttonContainer);
    } else {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const signinButton = document.createElement("button");
        signinButton.textContent = "Signin";
        signinButton.classList.add("button");
        signinButton.addEventListener("click", function () {
          window.location.href = '/signin.html'
        });
        buttonContainer.appendChild(signinButton);

        const exploreButton = document.createElement("button");
        exploreButton.textContent = "Explore";
        exploreButton.classList.add("button");
        exploreButton.addEventListener("click", function () {
          window.location.href = '/home.html'
        });
        buttonContainer.appendChild(exploreButton);

        container.appendChild(buttonContainer);
    }

    root.appendChild(container);
});
// Function to create AppBar
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
        <button onclick="window.location.href = '/createBlog.html'" style="cursor: pointer;">
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
