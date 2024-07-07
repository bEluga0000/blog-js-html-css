document.addEventListener('DOMContentLoaded', () => {
    const showPasswordHandle = () => {
        const passwordInput = document.getElementById('password');
        const passwordToggle = document.getElementById('password-toggle');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.textContent = '👁️‍🗨️';
        } else {
            passwordInput.type = 'password';
            passwordToggle.textContent = '👁️';
        }
    };

    const handleSignIn = async () => {
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;
        // Validate username and password if needed
        // Example validation:
        if (usernameInput.length < 1 || passwordInput.length < 1) {
            alert('Please enter valid credentials.');
            return;
        }

        // Perform sign-in logic
        try {
            const response = await fetch('http://localhost:3000/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernameInput,
                    password: passwordInput
                })
            });
            const data = await response.json();
            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username',data.username)
                    localStorage.setItem('userId',data.userId)
                    window.location.href = '/home.html';
                } else {
                    alert(data.message);
                }
            } else {
                // Handle non-2xx response
                alert(data.message || 'An error occurred during sign-in. Please try again later.');
            }
        } catch (error) {
            console.error('Sign-in error:', error);
            alert('An error occurred during sign-in. Please try again later.');
        }
    };


    // Attach event listeners
    document.getElementById('password-toggle').addEventListener('click', showPasswordHandle);
    document.getElementById('sign-in-btn').addEventListener('click', handleSignIn);
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

// Function to handle navigation
function navigate(path) {
    // Implement navigation logic here
}

// Function to handle logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    window.location.href = '/index.html';
}
// Call createAppBar function when the page loads
window.onload = createAppBar;