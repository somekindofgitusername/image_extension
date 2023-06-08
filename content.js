function addDownloadedEffect(imageElement) {
    imageElement.style.border = '3px solid green';
  }
  
  document.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'IMG' && event.button === 1) { // Middle mouse button clicked
      const imageUrl = event.target.src;
      const imageId = Math.random().toString(36).substr(2, 9);
      event.target.id = imageId;
  
      chrome.runtime.sendMessage({ action: 'downloadImage', imageUrl, imageId });
    }
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'imageDownloaded') {
      const imageElement = document.getElementById(message.imageId);
      if (imageElement) {
        addDownloadedEffect(imageElement);
      }
    }
  });
  