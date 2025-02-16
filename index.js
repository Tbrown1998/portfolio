document.addEventListener("DOMContentLoaded", function () {
    const username = "OluwatosinAmosu"; // Replace with your GitHub username
    const repoList = document.getElementById("repo-list");

    async function fetchRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);

            if (!response.ok) {
                throw new Error(`GitHub API returned status: ${response.status}`);
            }

            const repos = await response.json();

            if (repos.length === 0) {
                repoList.innerHTML = "<p>No repositories found.</p>";
                return;
            }

            repos.forEach(repo => {
                const repoItem = document.createElement("div");
                repoItem.classList.add("work__box");

                repoItem.innerHTML = `
                    <div class="work__text">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || "No description available."}</p>
                        <ul class="work__list">
                            <li>${repo.language || "Not specified"}</li>
                        </ul>
                        <div class="work__links">
                            <a href="${repo.html_url}" target="_blank" class="link__text">
                                View Repository <span>&rarr;</span>
                            </a>
                        </div>
                    </div>
                `;

                repoList.appendChild(repoItem);
            });
        } catch (error) {
            console.error("Error fetching repositories:", error);
            repoList.innerHTML = `<p style="color: red;">Error loading repositories. Check console for details.</p>`;
        }
    }

    fetchRepos();
});
