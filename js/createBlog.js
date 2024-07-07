document.addEventListener('DOMContentLoaded', () => {
    let checkToken = localStorage.getItem('token')
    if(!checkToken)
    {
        alert('Signin First')
        window.location.href = '/signin.html'
    }
    const rootElement = document.getElementById('root');

    // Create elements
    const container = document.createElement('div');
    container.style.width = '95%';
    container.style.padding = '1rem';
    container.style.position = 'absolute';
    container.style.minHeight = '100vh';

    const imageLinkInput = document.createElement('textarea');
    imageLinkInput.rows = 2;
    imageLinkInput.placeholder = 'Image Link..'; // Placeholder text
    imageLinkInput.style.fontSize = '1rem';
    imageLinkInput.style.fontWeight = '700';
    imageLinkInput.style.border = 'none';
    imageLinkInput.style.outline = 'none';
    imageLinkInput.style.resize = 'none';
    imageLinkInput.style.width = '100%';
    imageLinkInput.style.marginTop = '1rem'; // Add margin-top property
    imageLinkInput.addEventListener('input', checkInputs);
    const titleInput = document.createElement('textarea');
    titleInput.rows = 2;
    // titleInput.maxLength = 20;
    titleInput.placeholder = 'Title..';
    titleInput.style.fontSize = '1.5rem';
    titleInput.style.fontWeight = '700';
    titleInput.style.border = 'none';
    titleInput.style.outline = 'none';
    titleInput.style.resize = 'none';
    titleInput.style.width = '100%';
    titleInput.addEventListener('input', checkInputs); // Listen for input events

    const descInput = document.createElement('textarea');
    descInput.rows = 2;
    // descInput.maxLength = 20;
    descInput.placeholder = 'Description..';
    descInput.style.fontSize = '1.3rem';
    descInput.style.fontWeight = '500';
    descInput.style.border = 'none';
    descInput.style.outline = 'none';
    descInput.style.resize = 'none';
    descInput.addEventListener('input', checkInputs); // Listen for input events

    const contentInput = document.createElement('textarea');
    contentInput.rows =30;
    contentInput.placeholder = 'Tell Your Story..';
    contentInput.style.fontSize = '1rem';
    contentInput.style.fontWeight = '300';
    contentInput.style.border = 'none';
    contentInput.style.outline = 'none';
    contentInput.style.resize = 'none';
    contentInput.rows = 18; // Set initial rows to 1

    // Event listener to adjust the textarea height and rows when input changes
    contentInput.addEventListener('input', checkInputs); // Listen for input events

    const draftButton = document.createElement('button');
    draftButton.textContent = 'Save as Draft';
    draftButton.style.fontSize = '12px';
    draftButton.style.borderRadius = '1rem';
    draftButton.style.padding = '10px 20px'; // Adjust padding as needed
    draftButton.style.backgroundColor = 'orange'; // Set background color to orange
    draftButton.style.color = '#fff'; // Set text color to white
    draftButton.addEventListener('click', draftbuttonHandler);

    const publishButton = document.createElement('button');
    publishButton.textContent = 'Publish now';
    publishButton.style.fontSize = '12px';
    publishButton.style.borderRadius = '1rem';
    publishButton.style.padding = '10px 20px'; // Adjust padding as needed
    publishButton.style.backgroundColor = 'green'; // Set background color to green
    publishButton.style.color = '#fff'; // Set text color to white
    publishButton.disabled = true;
    publishButton.addEventListener('click', publishbuttonHandler);

    function checkInputs() {
        const title = titleInput.value.trim();
        const desc = descInput.value.trim();
        const content = contentInput.value.trim();

        if (title && desc && content) {
            publishButton.disabled = false; // Enable the publish button if all fields have content
        } else {
            publishButton.disabled = true; // Disable the publish button if any field is empty
        }
    }


    // Append elements to container
    container.appendChild(draftButton);
    container.appendChild(publishButton);
    container.appendChild(imageLinkInput)
    container.appendChild(titleInput);
    container.appendChild(descInput);
    container.appendChild(document.createElement('hr'));
    container.appendChild(contentInput);

    // Append container to root
    rootElement.appendChild(container);

    // Button handler function
    async function draftbuttonHandler() {
        try {
            const response = await fetch('http://localhost:3000/blog/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    title: titleInput.value.trim(),
                    description: descInput.value.trim(),
                    content: contentInput.value.trim(),
                    imageLink:imageLinkInput.value.trim()
                })
            });
            const data = await response.json();
            if (data.blogId) {
                window.location.href = `/previewPage.html?blogId=${data.blogId}`;
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error('Draft button handler error:', error);
            alert('An error occurred while saving as draft. Please try again later.');
        }
    }

    async function publishbuttonHandler() {
        try {
            const response = await fetch('http://localhost:3000/blog/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    title: titleInput.value.trim(),
                    description: descInput.value.trim(),
                    content: contentInput.value.trim(),
                    imageLink: imageLinkInput.value.trim(),
                    published: true
                })
            });
            const data = await response.json();
            if (data.blogId) {
                window.location.href = `/previewPage.html?blogId=${data.blogId}`;
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error('Publish button handler error:', error);
            alert('An error occurred while publishing the blog. Please try again later.');
        }
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