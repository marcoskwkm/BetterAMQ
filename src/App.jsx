/* global chrome */

import React, { useEffect, useState } from 'react'
import { Toggle } from 'react-toggle-component'

const App = () => {
  const [appIsActive, setIsActive] = useState(false)

  useEffect(() => {
    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'getStatus' }, (response) => {
        if (!chrome.runtime.lastError) {
          if (response) {
            setIsActive(response.status)
          }
        }
      })
    })
  }, [])

  const handleToggle = () => {
    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'setStatus', status: !appIsActive })
    })
    setIsActive(!appIsActive)
  }

  return (
    <div className="pa2">
      <div className="flex items-center justify-between">
        <span>TAB switches chat/answer</span>
        <Toggle name="tab-switch" controlled={true} onToggle={handleToggle} checked={appIsActive}/>
      </div>
    </div>
  )
}

export default App;
