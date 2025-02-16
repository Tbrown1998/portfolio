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

const GITHUB_USERNAME = "Tbrown1998"; // Replace with your GitHub username
const REPOS_CONTAINER = document.querySelector(".work__boxes");

const fetchGitHubRepos = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    const repos = await response.json();
    displayRepos(repos);
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
};

const displayRepos = (repos) => {
  REPOS_CONTAINER.innerHTML = ""; // Clear existing content

  repos.forEach(repo => {
    const repoElement = document.createElement("div");
    repoElement.classList.add("work__box");
    repoElement.innerHTML = `
      <div class="work__text">
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description available."}</p>
        <ul class="work__list">
          <li>JavaScript</li>
          <li>HTML</li>
          <li>CSS</li>
        </ul>
        <div class="work__links">
          <a href="${repo.html_url}" target="_blank" class="link__text">
            View on GitHub <span>&rarr;</span>
          </a>
        </div>
      </div>
    `;
    REPOS_CONTAINER.appendChild(repoElement);
  });
};

// Fetch repositories on page load
document.addEventListener("DOMContentLoaded", fetchGitHubRepos);
