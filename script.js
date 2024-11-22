document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const captionInput = document.getElementById('caption-input');

    if (fileInput.files.length === 0) {
        alert('Please select an image to upload.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageUrl = e.target.result;
        const caption = captionInput.value;

        const post = document.createElement('div');
        post.classList.add('post');

        const img = document.createElement('img');
        img.src = imageUrl;
        post.appendChild(img);

        const captionElem = document.createElement('div');
        captionElem.classList.add('caption');
        captionElem.textContent = caption;
        post.appendChild(captionElem);

        const actions = document.createElement('div');
        actions.classList.add('actions');

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', function() {
            const likes = likeButton.textContent.split(' ')[1] || 0;
            likeButton.textContent = `Like ${parseInt(likes) + 1}`;
        });
        actions.appendChild(likeButton);

        post.appendChild(actions);

        const comments = document.createElement('div');
        comments.classList.add('comments');

        const commentForm = document.createElement('form');
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Post';
        commentButton.type = 'submit';

        commentForm.appendChild(commentInput);
        commentForm.appendChild(commentButton);

        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const commentText = commentInput.value.trim();
            if (commentText) {
                const comment = document.createElement('div');
                comment.textContent = commentText;
                comments.appendChild(comment);
                commentInput.value = '';
            }
        });

        comments.appendChild(commentForm);
        post.appendChild(comments);

        document.getElementById('post-list').prepend(post);

        fileInput.value = '';
        captionInput.value = '';
    };

    reader.readAsDataURL(file);
});
