const setExtensionStatus = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getStatus' }, (response) => {
      if (!chrome.runtime.lastError) {
        if (response && response.status) {
          $('#extensionToggle').prop('checked', response.status)
        }
      }
    })
  })
}

const sendExtensionStatus = (status) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'setStatus', status })
  })
}

setExtensionStatus()

$('#extensionToggle').on('change', e => sendExtensionStatus(e.target.checked))
