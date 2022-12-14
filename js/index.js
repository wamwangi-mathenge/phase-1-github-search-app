const githubForm = document.querySelector("form#github-form");
const inputSearch = document.querySelector("input#search");


githubForm.addEventListener("submit", (e) => {
  e.preventDefault();
  clear(); 
  const searchResult = inputSearch.value; 
  getUser(searchResult);
});

function clear() {
  const clear = document.querySelector("ul#user-list");
  clear.innerHTML = "";
}

function getUser(user) {
  fetch(`https://api.github.com/search/users?q=${user}`, {
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
  })
    .then((promise) => promise.json())
    .then(showUser) 
    .catch((error) => console.log(error));
}

function showUser(objectUsers) {
  const userArray = objectUsers.items;
  userArray.forEach(showUserCard); 
}

const userList = document.querySelector("ul#user-list");
function showUserCard(user) {
  const profile = document.createElement("div");
  profile.className = "profile";
  profile.addEventListener("click", () => {
    const username = profile.querySelector(".username").textContent;
    getRepos(username, profile); 
    profile.style.cursor = "pointer";
  });
  userList.appendChild(profile);

  const profilePic = document.createElement("div");
  profilePic.className = "profile-pic";
  const dp = document.createElement("img");
  dp.className = "avatar";
  dp.src = `${user["avatar_url"]}`;
  profilePic.appendChild(dp);
  profile.appendChild(profilePic);

  const description = document.createElement("div");
  description.className = "profile-description";
  const name = document.createElement("p");
  name.className = "username";
  name.textContent = user["login"];
  description.appendChild(name);
  const url = document.createElement("a");
  url.className = "git-url";
  url.href = `${user["html_url"]}`;
  url.textContent = `${user["html_url"]}`;
  description.appendChild(url);
  profile.appendChild(description);

  const repoList = document.createElement("ul");
  repoList.id = "repos-list";
  profile.appendChild(repoList);
}

function getRepos(username, profile) {
    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((promise) => promise.json())
      .then((repositories) => {
        showRepo(repositories, profile);
      })
      .catch((error) => console.log(error));
  }

function showRepo(repositories, profile) {
    repositories.forEach((repository) => {
      showRepoCard(repository, profile);
    });
  }

function showRepoCard(repository, profile) {
  const repoList = profile.querySelector("ul#repos-list");
  const repoLink = document.createElement("a");
  repoLink.className = "repo-url";
  repoLink.href = repository["html_url"];
  repoLink.textContent = repository["full_name"];
  repoList.appendChild(repoLink);
}