chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get('urls', (data) => {
    const urls = data.urls || [];
    urls.forEach((urlData, index) => {
      chrome.contextMenus.create({
        id: `customURL${index}`,
        title: urlData.name,
        contexts: ["selection"]
      });
    });
  });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.urls) {
    chrome.contextMenus.removeAll(() => {
      changes.urls.newValue.forEach((urlData, index) => {
        chrome.contextMenus.create({
          id: `customURL${index}`,
          title: urlData.name,
          contexts: ["selection"]
        });
      });
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.storage.sync.get('urls', (data) => {
    const urls = data.urls || [];
    const menuItemIndex = parseInt(info.menuItemId.replace('customURL', ''), 10);
    const selectedUrl = urls[menuItemIndex];
    if (selectedUrl) {
      const selectedText = info.selectionText;
      const targetUrl = `${selectedUrl.url}${encodeURIComponent(selectedText)}`;
      chrome.tabs.create({ url: targetUrl });
    }
  });
});
