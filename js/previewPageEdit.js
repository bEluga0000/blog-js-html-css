document.addEventListener("DOMContentLoaded", function () {
    const titleInput = document.getElementById('title');
    const descInput = document.getElementById('desc');
    const topicSelect = document.getElementById('topic');
    const publishBtn = document.getElementById('publishBtn');

    // Function to enable/disable publish button based on input fields
    function togglePublishButton() {
        const title = titleInput.value.trim();
        const desc = descInput.value.trim();
        const topic = topicSelect.value.trim();
        publishBtn.disabled = !(title.length > 0 && desc.length > 0 && topic.length > 0);
    }

    // Add event listeners to input fields
    titleInput.addEventListener('input', togglePublishButton);
    descInput.addEventListener('input', togglePublishButton);
    topicSelect.addEventListener('change', togglePublishButton);

    // Function to handle publish button click
    publishBtn.addEventListener('click', async () => {
        const title = titleInput.value.trim();
        const desc = descInput.value.trim();
        const topic = topicSelect.value.trim();

        try {
            const response = await axios.post('http://localhost:3000/blog/write', {
                title,
                description: desc,
                content: scontent,
                published: true
            }, {
                headers: {
                    authorization: 'bearer ' + localStorage.getItem('token')
                }
            });

            const data = response.data;
            if (data.blogId) {
                window.location.href = `/u/myblogs`;
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    });
});
