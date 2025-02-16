/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

const alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered ? "scale(1)" : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Fetch and Display GitHub Repositories 
 ---------------------------------------- */

// Fetch GitHub Repositories
const fetchGitHubRepos = async () => {
  const username = "your-github-username"; // Replace with your GitHub username
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;

  try {
    const response = await fetch(apiUrl);
    const repos = await response.json();

    const repoList = document.getElementById("repo-list");

    repos.forEach((repo) => {
      const repoBox = document.createElement("div");
      repoBox.classList.add("work__box");

      repoBox.innerHTML = `
        <div class="work__text">
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available."}</p>
          <ul class="work__list">
            <li>${repo.language || "Not specified"}</li>
          </ul>
          <div class="work__links">
            <a href="${repo.html_url}" target="_blank" class="link__text">
              View on GitHub <span>&rarr;</span>
            </a>
          </div>
        </div>
      `;

      repoList.appendChild(repoBox);
    });
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
  }
};

fetchGitHubRepos();
