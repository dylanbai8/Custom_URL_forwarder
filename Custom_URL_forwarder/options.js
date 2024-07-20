document.addEventListener('DOMContentLoaded', () => {
  const urlForm = document.getElementById('urlForm');
  const nameInput = document.getElementById('nameInput');
  const urlInput = document.getElementById('urlInput');
  const urlList = document.getElementById('urlList');

  function saveUrls(urls) {
    chrome.storage.sync.set({ urls }, () => {
      console.log('URLs saved');
    });
  }

  function renderUrls(urls) {
    urlList.innerHTML = '';
    urls.forEach((urlData, index) => {
      const li = document.createElement('li');
      li.textContent = `${urlData.name}: ${urlData.url}`;
      const removeButton = document.createElement('button');
      removeButton.textContent = '移除';
      removeButton.addEventListener('click', () => {
        urls.splice(index, 1);
        saveUrls(urls);
        renderUrls(urls);
      });
      li.appendChild(removeButton);
      urlList.appendChild(li);
    });
  }

  urlForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const url = urlInput.value;
    if (name && url) {
      chrome.storage.sync.get('urls', (data) => {
        const urls = data.urls || [];
        urls.push({ name, url });
        saveUrls(urls);
        renderUrls(urls);
      });
      nameInput.value = '';
      urlInput.value = '';
    }
  });

  chrome.storage.sync.get('urls', (data) => {
    const urls = data.urls || [];
    renderUrls(urls);
  });
});
