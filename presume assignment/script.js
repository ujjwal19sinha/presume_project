// Simulated user authentication
let isLoggedIn = false;
let posts = []; // Array to store posts

// Function to toggle between views based on user authentication
function toggleViews() {
    const loginLink = document.querySelector('a[href="#login"]');
    const logoutLink = document.querySelector('a[href="#logout"]');
    const newPostLink = document.querySelector('a[href="#new-post"]');
    const viewPostsLink = document.querySelector('a[href="#view-posts"]');

    if (isLoggedIn) {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'inline';
        newPostLink.style.display = 'inline';
        viewPostsLink.style.display = 'inline';
    } else {
        loginLink.style.display = 'inline';
        logoutLink.style.display = 'none';
        newPostLink.style.display = 'none';
        viewPostsLink.style.display = 'none';
    }
}

// Function to simulate logging in
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulated hardcoded username and password
    const correctUsername = "user";
    const correctPassword = "password";

    if (username === correctUsername && password === correctPassword) {
        isLoggedIn = true;
        toggleViews();
        loadContent('home');
    } else {
        alert('Incorrect username or password');
    }
}

// Function to simulate logging out
function logout() {
    isLoggedIn = false;
    toggleViews();
    loadContent('home');
}

// Event listeners for login, logout, new post, and view posts links
document.querySelector('a[href="#login"]').addEventListener('click', function () {
    loadContent('login');
});
document.querySelector('a[href="#logout"]').addEventListener('click', logout);
document.querySelector('a[href="#new-post"]').addEventListener('click', function () {
    if (isLoggedIn) {
        loadContent('new-post');
    } else {
        alert('Please login to create a new post');
        loadContent('login');
    }
});
document.querySelector('a[href="#view-posts"]').addEventListener('click', function () {
    if (isLoggedIn) {
        loadContent('view-posts');
    } else {
        alert('Please login to view posts');
        loadContent('login');
    }
});

function loadContent(view) {
    const content = document.getElementById('content');
    let dynamicContent = '';
    switch (view) {
        case 'home':
            dynamicContent = '<h2>Welcome to the Blogging Platform!</h2>';
            if (posts.length === 0) {
                dynamicContent += '<p>No posts available.</p>';
            } else {
                dynamicContent += '<ul>';
                posts.slice(0, 5).forEach(post => {
                    dynamicContent += `<li><strong>${post.title}</strong>: ${post.content}</li>`;
                });
                dynamicContent += '</ul>';
            }
            break;
        case 'new-post':
            if (isLoggedIn) {
                dynamicContent = `
                    <h2>Create New Post</h2>
                    <form id="new-post-form">
                        <label for="title">Title:</label><br>
                        <input type="text" id="title" name="title" required><br><br>
                        <label for="content">Content:</label><br>
                        <textarea id="content" name="content" rows="4" required></textarea><br><br>
                        <button type="button" onclick="submitPost()">Submit</button>
                    </form>
                `;
            } else {
                alert('Please login to create a new post');
                loadContent('login');
            }
            break;
        case 'view-posts':
            dynamicContent = '<h2>View Posts</h2>';
            if (posts.length === 0) {
                dynamicContent += '<p>No posts available.</p>';
            } else {
                dynamicContent += '<ul>';
                posts.forEach((post, index) => {
                    dynamicContent += `
                            <li>
                                <strong>${post.title}</strong>: ${post.content}
                                <button onclick="editPost(${index})">Edit</button>
                                <button onclick="deletePost(${index})">Delete</button>
                            </li>
                        `;
                });
                dynamicContent += '</ul>';
            }

            break;
        case 'login':
            dynamicContent = `
                <h2>Login</h2>
                <form>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required><br><br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required><br><br>
                    <button type="button" onclick="login()">Login</button>
                </form>
            `;
            break;
        case 'logout':
            dynamicContent = '<h2>Logout</h2><p>Logout confirmation message would go here.</p>';
            break;
        default:
            dynamicContent = '<h2>404 Not Found</h2><p>The requested page does not exist.</p>';
    }
    content.innerHTML = dynamicContent;
}

// Initial view when the page loads
loadContent('home');

// Function to handle form submission for new blog post
function submitPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Simulated post submission (replace with actual logic to store posts)
    posts.push({ title, content });
    alert('Post created successfully');
    loadContent('home');

}
// Function to edit a post by index
function editPost(index) {
    const post = posts[index];
    const updatedTitle = prompt('Enter updated title:', post.title);
    const updatedContent = prompt('Enter updated content:', post.content);

    if (updatedTitle !== null && updatedContent !== null) {
        posts[index] = { title: updatedTitle, content: updatedContent };
        alert('Post updated successfully');
        loadContent('view-posts');
    }
}
// Function to delete a post by index
function deletePost(index) {
    if (confirm("Are you sure you want to delete this post?")) {
        posts.splice(index, 1);
        alert('Post deleted successfully');
        loadContent('view-posts');
    }
}
