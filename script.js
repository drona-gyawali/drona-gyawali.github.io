function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const yearSpan = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

window.onload = async function() {
    const username = 'drona-gyawali';
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    const closeBtn = document.getElementById('close-btn');
  
    let mergedPRs = [];
    let openPRs = [];
    let commits = [];
  
    try {
      // Fetch merged PRs
      const mergedResponse = await fetch(`https://api.github.com/search/issues?q=type:pr+author:${username}+is:merged&sort=updated&order=desc`);
      const mergedData = await mergedResponse.json();
      if (!mergedData.items) {
        throw new Error(`GitHub API error (merged PRs): ${mergedData.message || 'No items returned'}`);
      }
      mergedPRs = mergedData.items.map(pr => pr.title);

  
      // Fetch open PRs
      const openResponse = await fetch(`https://api.github.com/search/issues?q=type:pr+author:${username}+is:open&sort=updated&order=desc`);
      const openData = await openResponse.json();
      openPRs = openData.items.map(pr => pr.title);
  
      // Fetch commits (latest push events)
      const commitResponse = await fetch(`https://api.github.com/users/${username}/events`);
      const commitData = await commitResponse.json();
      commits = commitData.filter(event => event.type === 'PushEvent')
                          .map(event => event.payload.commits[0].message);
  
      // Function to show popup message and store already shown
      function showMessage(message, key) {
        // Check if the message has already been shown using localStorage
        if (localStorage.getItem(key)) {
          return; // If it's already shown, don't display it again
        }
  
        // Mark the message as shown by storing in localStorage
        localStorage.setItem(key, 'true');
  
        notificationText.textContent = message;
        notification.style.display = 'block';
  
        setTimeout(() => {
          notification.style.display = 'none';
        }, 8000); // Hide after 8 seconds
      }
  
      // Show merged PRs first for 50 seconds
      let index = 0;
      if (mergedPRs.length > 0) {
        showMessage(`Merged PR: "${mergedPRs[index]}"`, `mergedPR-${index}`);
        index++;
  
        setInterval(() => {
          if (index < mergedPRs.length) {
            showMessage(`Merged PR: "${mergedPRs[index]}"`, `mergedPR-${index}`);
            index++;
          }
        }, 50000); // Show merged PRs every 50 seconds
      }
  
      // After 20 seconds, show open PRs one by one with 20-second gaps
      setTimeout(() => {
        let openIndex = 0;
        if (openPRs.length > 0) {
          showMessage(`Open PR: "${openPRs[openIndex]}"`, `openPR-${openIndex}`);
          openIndex++;
  
          setInterval(() => {
            if (openIndex < openPRs.length) {
              showMessage(`Open PR: "${openPRs[openIndex]}"`, `openPR-${openIndex}`);
              openIndex++;
            }
          }, 20000); // Show open PRs every 20 seconds
        }
      }, 50000); // Wait 50 seconds before starting open PRs
  
      // After showing PRs, show commits every 20 seconds
      setTimeout(() => {
        let commitIndex = 0;
        if (commits.length > 0) {
          showMessage(`Commit: "${commits[commitIndex]}"`, `commit-${commitIndex}`);
          commitIndex++;
  
          setInterval(() => {
            if (commitIndex < commits.length) {
              showMessage(`Commit: "${commits[commitIndex]}"`, `commit-${commitIndex}`);
              commitIndex++;
            }
          }, 20000); // Show commits every 20 seconds
        }
      }, 100000); // Start showing commits after 100 seconds (50 + 20 + 20)
  
    } catch (error) {
      console.error('Failed to fetch GitHub events', error);
    }
  
    // Close button functionality
    closeBtn.addEventListener('click', () => {
      notification.style.display = 'none';
    });
  };

