let status = {
  tabSwitch: true,
  customBackground: true,
  rankedStats: true,
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === 'getStatus') {
      sendResponse({ status })
    } else if (request.type === 'setStatus') {
      status = Object.assign({}, status, request.status)
    }
  }
)

const rankedStats = document.createElement('script')
rankedStats.src = chrome.runtime.getURL('rankedStats.js')
rankedStats.onload = function() { this.remove() }
document.head.appendChild(rankedStats)
