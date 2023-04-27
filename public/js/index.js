const posts = document.getElementById('posts');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');
const commentContent = document.querySelector('#comment-content');
const logout = document.querySelector('#logout');
const photo = document.querySelector('#photo');
const signupBtn = document.querySelector('#signupBtn');
const post = document.querySelector('#post');

post.addEventListener('click', () => {
  // create post modal
  const div = document.createElement('div');
  div.classList.add('modal', 'fade');
  div.setAttribute('id', 'postModal');
  div.setAttribute('tabindex', '-1');
  div.setAttribute('aria-labelledby', 'postModalLabel');
  div.setAttribute('aria-hidden', 'true');

  const div1 = document.createElement('div');
  div1.classList.add('modal-dialog', 'modal-dialog-centered');
  div.appendChild(div1);

  const div2 = document.createElement('div');
  div2.classList.add('modal-content');
  div1.appendChild(div2);

  const div3 = document.createElement('div');
  div3.classList.add('modal-header');

  const h5 = document.createElement('h5');
  h5.classList.add('modal-title');
  h5.setAttribute('id', 'postModalLabel');
  h5.textContent = 'Create Post';
  div3.appendChild(h5);

  const button = document.createElement('button');
  button.classList.add('btn-close');
  button.setAttribute('type', 'button');
  button.setAttribute('data-bs-dismiss', 'modal');
  button.setAttribute('aria-label', 'Close');
  div3.appendChild(button);

  div2.appendChild(div3);

  const div4 = document.createElement('div');
  div4.classList.add('modal-body');

  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', '/api/v1/posts/new');
  div4.appendChild(form);

  const div5 = document.createElement('div');
  div5.classList.add('mb-3');

  const label = document.createElement('label');
  label.classList.add('form-label');
  label.setAttribute('for', 'post-content');
  label.textContent = 'Post Content';
  div5.appendChild(label);

  const textarea = document.createElement('textarea');
  textarea.classList.add('form-control');
  textarea.setAttribute('id', 'post-content');
  textarea.setAttribute('name', 'content');
  textarea.setAttribute('rows', '3');
  div5.appendChild(textarea);

  form.appendChild(div5);

  const div6 = document.createElement('div');
  div6.classList.add('modal-footer');

  const button1 = document.createElement('button');
  button1.classList.add('btn', 'btn-secondary');
  button1.setAttribute('type', 'button');
  button1.setAttribute('data-bs-dismiss', 'modal');
  button1.textContent = 'Close';
  div6.appendChild(button1);

  const button2 = document.createElement('button');
  button2.classList.add('btn', 'btn-primary');
  button2.setAttribute('type', 'submit');
  button2.textContent = 'Post';
  div6.appendChild(button2);

  div6.addEventListener('click', (e) => {
    e.preventDefault();
    const content = document.querySelector('#post-content').value;
    fetch('/api/v1/posts/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          window.location.href = '/';
        } else if (data.success === false) {
          alert(data.message);
        }
      })
      .catch((err) => alert(err.message));
  });
  form.appendChild(div6);
  div2.appendChild(form);

  document.body.appendChild(div);

  const postModal = new bootstrap.Modal(document.getElementById('postModal'), {
    keyboard: false,
  });
  postModal.show();
});

logout.addEventListener('click', () => {
  fetch('/api/v1/users/logout')
    .then((res) => res.json())
    .then((data) => {
      if (data.success === true) {
        window.location.href = '/html/signin.html';
      }
    })
    .catch((err) => alert(err.message));
});

// check if user is logged in
fetch('/api/v1/users/checklogin')
  .then((res) => res.json())
  .then((data) => {
    if (data.success === true) {
      signupBtn.style.display = 'none';
      photo.style.display = 'block';
      photo.src = 'https://www.seekpng.com/png/full/115-1150622_avatar-demo2x-man-avatar-icon-png.png'; // data.data.avatar;
      logout.style.display = 'block';
    } else {
      signupBtn.style.display = 'block';
      photo.style.display = 'none';
      logout.style.display = 'none';
    }
  })
  .catch((err) => alert(err.message));

const deleteVote = (postId) => fetch(`/api/v1/vote/${postId}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .catch((err) => console.log(err));

fetch('/api/v1/posts')
  .then((res) => res.json())
  .then((data) => {
    data.data.forEach((post) => {
      fetch(`/api/v1/vote/${post.id}`)
        .then((response) => response.json())
        .then((res) => {
          const voteCount = res.data[0].sum || 0;
          console.log(voteCount);
          const div = document.createElement('div');
          const div1 = document.createElement('div');
          div1.classList.add('bg-white', 'border-gray', 'mt-4');

          const div2 = document.createElement('div');
          div2.classList.add('d-flex', 'pt-2');

          const div3 = document.createElement('div');
          div3.classList.add('col', 'd-flex');

          const img = document.createElement('img');
          img.classList.add('post-profile', 'rounded-circle');
          img.src = post.avatar;
          div3.appendChild(img);

          const div4 = document.createElement('div');
          div4.classList.add('d-flex', 'flex-column');

          const span1 = document.createElement('span');
          span1.classList.add('fw-bold', 'fs-6');
          span1.textContent = post.username;
          div4.appendChild(span1);

//           const span2 = document.createElement('span');
//           span2.classList.add('text-gray-darker', 'fs-6');
//           span2.textContent = 'Job title and position';
//           div4.appendChild(span2);

          div3.appendChild(div4);
          div2.appendChild(div3);

          const div5 = document.createElement('div');
          div5.classList.add('p-2', 'text-gray-darker');

          const button = document.createElement('button');
          button.classList.add('btn', 'rounded-circle', 'hover-dark', 'p-1');

          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('height', '24px');
          svg.setAttribute('viewBox', '0 0 24 24');
          svg.setAttribute('width', '24px');
          svg.setAttribute('fill', 'currentColor');

          const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path1.setAttribute('d', 'M0 0h24v24H0V0z');
          path1.setAttribute('fill', 'none');
          svg.appendChild(path1);

          const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path2.setAttribute('d', 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z');
          svg.appendChild(path2);

          button.appendChild(svg);
          div5.appendChild(button);
          div2.appendChild(div5);
          div1.appendChild(div2);

          const div6 = document.createElement('div');
          div6.classList.add('post-body', 'pt-2', 'ps-3');

//           const div7 = document.createElement('div');
//           div7.classList.add('post-title', 'fw-bold');

//           const anchor = document.createElement('a');
//           anchor.classList.add('text-decoration-none', 'text-black');
//           anchor.href = '#';
//           anchor.textContent = 'We put the title of posts here';

//           div7.appendChild(anchor);
//           div6.appendChild(div7);

          const div8 = document.createElement('div');
          div8.classList.add('post-text', 'pt-1');
          div8.textContent = post.content;
          div6.appendChild(div8);

          div1.appendChild(div6);

          const div9 = document.createElement('div');
          div9.classList.add('post-image', 'pt-2');

          const img2 = document.createElement('img');
          img2.classList.add('img-fluid');
          img2.src = 'img/post_image.jpg';

          div9.appendChild(img2);
          div1.appendChild(div9);

          const div10 = document.createElement('div');
          div10.classList.add('post-footer', 'p-2');

          const div11 = document.createElement('div');
          div11.classList.add('btn-group');
          div11.setAttribute('role', 'group');
          div11.setAttribute('aria-label', 'Basic example');

          const button2 = document.createElement('button');
          button2.classList.add('left-button', 'post-button', 'bg-second-color', 'border-0', 'text-black', 'p-1');
          button2.value = post.id;
          const span3 = document.createElement('span');

          button2.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(`/api/v1/vote/${button2.value}/1`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((response) => response.json())
              .then((_res) => {
                if (_res.success) {
                  fetch(`/api/v1/vote/${post.id}`)
                    .then((response) => response.json())
                    .then((res) => {
                      span3.textContent = res.data[0].sum;
                    });
                } else if (_res.data.statusCode == 400) {
                  deleteVote(button2.value);
                  fetch(`/api/v1/vote/${post.id}`)
                    .then((response) => response.json())
                    .then((res) => {
                      span3.textContent = res.data[0].sum;
                    });
                } else {
                  alert('You must be logged in to vote');
                  window.location.href = '/html/signin.html';
                }
              });
          });
          const img3 = document.createElement('img');
          img3.src = 'img/up.png';
          img3.width = '20';
          img3.classList.add('ms-2');

          span3.textContent = voteCount;

          button2.appendChild(img3);
          button2.appendChild(span3);

          const button3 = document.createElement('button');
          button3.classList.add('right-button', 'post-button', 'bg-second-color', 'border-0', 'text-black', 'p-1');
          button3.value = post.id;

          button3.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(`/api/v1/vote/${button3.value}/-1`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((response) => response.json())
              .then((_res) => {
                if (_res.success) {
                  fetch(`/api/v1/vote/${post.id}`)
                    .then((response) => response.json())
                    .then((res) => {
                      span3.textContent = res.data[0].sum;
                    });
                } else if (_res.data.statusCode == 400) {
                  deleteVote(button2.value);
                  fetch(`/api/v1/vote/${post.id}`)
                    .then((response) => response.json())
                    .then((res) => {
                      span3.textContent = res.data[0].sum;
                    });
                } else {
                  alert('You must be logged in to vote');
                  window.location.href = '/html/signin.html';
                }
              });
          });
          const img4 = document.createElement('img');
          img4.src = 'img/down.png';
          img4.width = '20';
          img4.classList.add('me-2');

          button3.appendChild(img4);

          div11.appendChild(button2);
          div11.appendChild(button3);
          div10.appendChild(div11);

          const button4 = document.createElement('button');
          button4.classList.add('post-button', 'post-button-bg', 'border-0', 'rounded-circle', 'text-black', 'p-1');

          const img5 = document.createElement('img');
          const plus = document.createElement('i');
          plus.classList.add('fas', 'fa-plus');
          button4.appendChild(plus);

          const span4 = document.createElement('span');
          span4.textContent = 'add comment';

          button4.value = post.id;
          const div12 = document.createElement('div');

          button4.addEventListener('click', (e) => {
            // create comment input field
            div12.textContent = '';
            e.preventDefault();
            const postId = button4.value;
            const commentInput = document.createElement('input');
            commentInput.classList.add('form-control', 'mb-2');
            commentInput.setAttribute('type', 'text');
            commentInput.setAttribute('placeholder', 'Add comment');
            commentInput.setAttribute('id', 'comment-input');

            const commentButton = document.createElement('button');
            commentButton.classList.add('btn', 'btn-primary', 'mb-2');
            commentButton.setAttribute('id', 'comment-button');
            commentButton.textContent = 'Add';

            commentButton.addEventListener('click', (e) => {
              e.preventDefault();
              const commentData = commentInput.value;
              fetch(`/api/v1/comments/new/${postId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  comment: commentData,
                }),
              }).then((response) => response.json())
                .then((res) => {
                  if (res.success) {
                    alert('Comment added');
                  } else if (res.data.statusCode == 400) {
                    alert('add valid comment');
                  } else {
                    alert('You must be logged in to comment');
                    window.location.href = '/html/signin.html';
                  }
                });
            });

            div12.appendChild(commentInput);
            div12.appendChild(commentButton);

            div10.appendChild(div12);
          });

          button4.appendChild(img5);
          button4.appendChild(span4);

          div10.appendChild(button4);

          const button5 = document.createElement('button');
          button5.classList.add('post-button', 'post-button-bg', 'border-0', 'rounded-circle', 'text-black', 'p-1');
          button5.value = post.id;
          button5.setAttribute('id', 'comment');
          button5.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = button5.value;
            overlay.style.display = 'block';

            fetch(`api/v1/comments/${postId}`)
              .then((result) => result.json())
              .then((end) => {
                commentContent.innerHTML = '';
                end.data.forEach((comment) => {
                  const commentDiv = document.createElement('div');
                  commentDiv.innerHTML = `
                    <p>${comment.commentdata}</p>
                    <p><b>By:</b> ${comment.commenter}</p>
                  `;

                  // Apply some basic styles using CSS classes
                  commentDiv.classList.add('comment');
                  commentDiv.querySelector('p:first-of-type').classList.add('comment-text');
                  commentDiv.querySelector('p:last-of-type').classList.add('comment-author');

                  // Add the new comment div to the comment content container
                  commentContent.appendChild(commentDiv);
                });

                // add Scroll to the comment content container
                commentContent.classList.add('scroll');

                // window.location.href = `comments.html?${commentId}`;
              });
          });

          const img6 = document.createElement('img');
          img6.src = 'img/comment.png';
          img6.width = '25';
          img6.classList.add('p-1');

          const span5 = document.createElement('span');
          span5.textContent = 'comments';

          button5.appendChild(img6);
          button5.appendChild(span5);

          div10.appendChild(button5);
          div1.appendChild(div10);

          posts.appendChild(div1);
          posts.appendChild(div);
        }) // get vote count
        .catch((err) => {
          console.log(err);
        });
    }); // append data to the DOM
  })
  .catch((err) => {
    console.log(err);
  });
// eslint-disable-next-line no-plusplus

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});
