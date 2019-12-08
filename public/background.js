chrome.storage.sync.get('tabSwitch', (result) => {
  if (result.tabSwitch) {
    document.addEventListener('keyup', e => {
      if (!status.tabSwitch) {
        return
      }

      if (e.which == 9) {
        const chatInput = $('#gcInput')
        const answerInput = $('#qpAnswerInput')
        const answerContainer = $('#qpAnswerInputContainer')

        if (chatInput.is(':focus')) {
          if (answerInput.length > 0) {
            chatInput.blur()
            answerContainer.click()
            answerInput.click()
            if (!answerInput.is(':disabled')) {
              answerInput.focus()
            }
          }
        } else if (answerContainer.hasClass('focused')) {
          answerContainer.blur()
          answerInput.blur()
          answerContainer.removeClass('focused')
          chatInput.focus()
        }
      }
    })
  }
})

chrome.storage.sync.get('rankedStats', (result) => {
  if (result.rankedStats) {
    const rankedStats = document.createElement('script')
    rankedStats.src = chrome.runtime.getURL('rankedStats.js')
    rankedStats.onload = function() { this.remove() }
    document.head.appendChild(rankedStats)
  }
})
