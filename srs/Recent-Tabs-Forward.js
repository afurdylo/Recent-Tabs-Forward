import { RECENT_TABS_MASTER_ID } from './constants.js';


chrome.action.onClicked.addListener((tab) => {
  let dataToSend = { forward: "forward" };
  chromeSendMessage(RECENT_TABS_MASTER_ID, dataToSend);
});

function setBage(tabId, num) {
  const text = num ? String(num) : "";
  if (tabId) {
    chrome.action.setBadgeText({ text: text, tabId: tabId });
  } else {
    chrome.action.setBadgeText({ text: text });
  }
}

function setIcon(tabId, isActive) {
  const icon = isActive ? "./icons/forward_32.png" : "./icons/forward_inactive_32.png";
  if (tabId) {
    chrome.action.setIcon(({ path: icon, tabId: tabId }));
  } else {
    chrome.action.setIcon({ path: icon });
  }
}

function updateIconsAndBage(isIconActive, bageNum, tabId) {
  setBage(tabId, bageNum);
  setIcon(tabId, isIconActive);
}

chrome.runtime.onMessageExternal.addListener((request, sender) => {
  if (sender.id === RECENT_TABS_MASTER_ID) {
    updateIconsAndBage(request.isIconActive, request.bageNum, request.tabId);
  }
});

function chromeSendMessage(extId, msg) {
  chrome.runtime.sendMessage(extId, msg)
    .catch(error => {
      // console.log("Error in chrome.runtime.sendMessage: ", error);
    });
}
