const posts = [
  {
    title: "post one",
    body: "this is post one",
    createdAt: new Date().getTime(),
  },
  {
    title: "post two",
    body: "this is post two",
    createdAt: new Date().getTime(),
  },
];
let intervalId = 0;

function getPosts() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    let output = "";
    for (let i = 0; i < posts.length; i++) {
      output += `<li>${posts[i].title} last updated at ${
        (new Date().getTime() - posts[i].createdAt) / 1000
      } ago`;
    }
    document.body.innerHTML = output;
  }, 1000);
}
function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push({ ...post, createdAt: new Date().getTime() });
      const error = false;
      if (!error) {
        resolve();
      } else {
        reject("Error Something went wrong");
      }
    }, 2000);
  });
}
function deletePosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (posts.length > 0) {
        resolve(posts.pop());
      } else {
        reject("array is empty now");
      }
    }, 1000);
  });
}
createPost({ title: "post three", body: "this is post three" }).then(() => {
  getPosts();
  createPost({ title: "post four", body: "this is post four" }).then(() => {
    getPosts();
    deletePosts().then(() => {
      getPosts();
      deletePosts().then(() => {
        getPosts();
        deletePosts().then(() => {
          getPosts();
          deletePosts()
            .then(() => {})
            .catch((error) => {
              console.log("Inside Catch Block", error);
            });
        });
      });
    });
  });
});
