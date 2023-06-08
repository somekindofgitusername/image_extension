chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'downloadImage') {
      const imageUrl = message.imageUrl;
        const imageId = message.imageId;
        
        chrome.downloads.setShelfEnabled(false);

      chrome.downloads.download({ url: imageUrl, saveAs: false, conflictAction: 'uniquify' }, (downloadId) => {
        chrome.downloads.onChanged.addListener(function onChanged({ id, state }) {
          if (id === downloadId && state && state.current === 'complete') {
            chrome.tabs.sendMessage(sender.tab.id, { action: 'imageDownloaded', imageId });
              chrome.downloads.onChanged.removeListener(onChanged);
            chrome.downloads.setShelfEnabled(false);
            
          }
        });
      });
    }
  });
  