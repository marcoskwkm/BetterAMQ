/* global chrome */

import React, { useEffect, useReducer } from 'react'
import { Toggle } from 'react-toggle-component'

const App = () => {
  const [status, setStatus] = useReducer(
    (status, newStatus) => ({
      ...status,
      ...newStatus,
    }),
    {
      tabSwitch: false,
      customBackground: false,
      rankedStats: false,
    }
  )

  useEffect(() => {
    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'getStatus' }, (response) => {
        if (!chrome.runtime.lastError) {
          if (response) {
            setStatus(response.status)
          }
        }
      })
    })
  }, [])

  const handleTabSwitchToggle = () => {
    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'setStatus',
        status: {
          tabSwitch: !status.tabSwitch
        }
      })
    })
    setStatus({ tabSwitch: !status.tabSwitch })
  }

  const handleCustomBackgroundToggle = () => {
    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'setStatus',
        status: {
          customBackground: !status.customBackground
        },
      })
    })
    setStatus({ customBackground: !status.customBackground })
  }

  const handleRankedStatsToggle = () => {
    chrome.tabs && chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'setStatus',
        status: {
          rankedStats: !status.rankedStats
        },
      })
    })
    setStatus({ rankedStats: !status.rankedStats })
  }

  return (
    <div className="pa2">
      <div className="flex items-center justify-between">
        <span>TAB switches chat/answer</span>
        <Toggle
          name="tab-switch"
          controlled={true}
          onToggle={handleTabSwitchToggle}
          checked={status.tabSwitch}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Custom background</span>
        <Toggle
          name="custom-background"
          controlled={true}
          onToggle={handleCustomBackgroundToggle}
          checked={status.customBackground}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Ranked stats</span>
        <Toggle
          name="ranked-stats"
          controlled={true}
          onToggle={handleRankedStatsToggle}
          checked={status.rankedStats}
        />
      </div>
    </div>
  )
}

export default App;
