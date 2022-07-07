let username = document.querySelector(".profile__operation input");
let requri = "https://api.github.com/users/";
let repouri = "https://api.github.com/users/";

const content = document.querySelector(".profile__content");
const searchBtn = document.querySelector(".profile__operation button");

async function getUserInfo() {
  let resp = await fetch(requri + username.value);
  let data = await resp.json();
  console.log(data);
  return data;
}

async function getUserRepos() {
  let resp = await fetch(repouri + username.value + "/repos");
  let data = await resp.json();
  return data;
}

async function renderRepos(container) {
  let data = await getUserRepos();
  data.forEach((repo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${repo.html_url}">${repo.name}</a>
    `;
    container.appendChild(li);
  });
}

async function render() {
  let data = await getUserInfo();
  content.innerHTML = "";
  if ("login" in data) {
    let div = document.createElement("div");
    div.innerHTML = `
      <header class="profile__info">
      <h2>
        ${data.name} <i>(@<a href="${data.html_url}">${data.login}</a>)</i>
      </h2>
    </header>
    <div class="profile__details">
      <div class="profile__cover">
        <img
          src="${data.avatar_url}"
          alt=""
        />
      </div>
      <div class="profile__follow">
        <p>Followers: ${data.followers} - Following: ${data.following}</p>
        <p>Public Repos: ${data.public_repos}</p>
      </div>
    </div>
    <div class="profile__repos">
      <h3>Repos List:</h3>
      <ul>
        
      </ul>
    </div>
    `;
    content.appendChild(div);
    const ul = div.querySelector(".profile__repos ul");
    renderRepos(ul);
  } else {
    alert("User not found");
  }
}

searchBtn.addEventListener("click", () => {
  render();
});
