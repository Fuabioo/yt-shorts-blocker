const listener = async (tabId, changeInfo, tab) => {
  const url = tab?.url || "";
  if (url && url.includes("youtube.com")) {
    try {
      await chrome.tabs.sendMessage(tabId, { action: "initWasm" });
    } catch (err) {
      const msg = err?.message || String(err);
      if (msg.includes("Receiving end does not exist")) {
        console.log(err);
        return;
      }
      if (
        msg.includes("message channel closed before a response was received")
      ) {
        console.log(err);
        return;
      }
      console.warn(err);
    }
  }
};

chrome.tabs.onUpdated.addListener(listener);
chrome.webNavigation.onCompleted.addListener(listener);
