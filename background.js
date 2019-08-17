let extensionIsActive = true

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.type === 'getStatus') {
      sendResponse({ status: extensionIsActive })
    } else if (request.type === 'setStatus') {
      extensionIsActive = request.status
    }
  }
)

document.addEventListener('keyup', e => {
  if (!extensionIsActive) {
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
