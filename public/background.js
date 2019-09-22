let status = {
  tabSwitch: true,
  customBackground: true,
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
