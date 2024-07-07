document.addEventListener("DOMContentLoaded", function () {
    const topicBlogsContainer = document.getElementById("topicBlogs");

    // Fetch blogs based on the topic
    async function fetchTopicBlogs() {
        const topic = window.location.pathname.split("/").pop();
        try {
            const res = await axios.get(`http://localhost:3000/blog/t/${topic}`);
            const blogs = res.data.blogs;
            displayTopicBlogs(blogs);
        } catch (error) {
            console.error(error);
            alert('Something went wrong while fetching topic blogs');
        }
    }

    // Display blogs based on the topic
    function displayTopicBlogs(blogs) {
        topicBlogsContainer.innerHTML = "";
        if (blogs && blogs.length > 0) {
            blogs.forEach(blog => {
                const card = document.createElement("div");
                card.classList.add("card");

                const info = document.createElement("div");
                info.classList.add("card-info");

                const title = document.createElement("div");
                title.classList.add("card-title");
                title.textContent = blog.title;

                const created = document.createElement("div");
                created.classList.add("card-created");
                created.textContent = "Created: " + blog.createdAt.substring(0, 10);

                info.appendChild(title);
                info.appendChild(created);

                const desc = document.createElement("div");
                desc.classList.add("card-desc");
                desc.textContent = blog.description;

                card.appendChild(info);
                card.appendChild(document.createElement("hr"));
                card.appendChild(desc);

                card.addEventListener("click", () => {
                    navigateToDetailedBlog(blog._id);
                });

                topicBlogsContainer.appendChild(card);
            });
        } else {
            const noBlogMessage = document.createElement("div");
            noBlogMessage.textContent = "There are no blogs for this topic.";
            topicBlogsContainer.appendChild(noBlogMessage);
        }
    }

    // Function to navigate to detailed blog page
    function navigateToDetailedBlog(blogId) {
        console.log(`Navigating to detailed blog page for blog ID: ${blogId}`);
        // Implement navigation to the detailed blog page
    }

    // Initial fetch of blogs based on the topic
    fetchTopicBlogs();
});
