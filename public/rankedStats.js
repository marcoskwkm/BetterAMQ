console.log('Ranked stats script executed')

const maybeLoadRankedStats = () => {
  console.log('Trying to load ranked stats...')
  if (typeof window.Listener === 'undefined') {
    setTimeout(maybeLoadRankedStats, 500)
  } else {
    loadRankedStats()
  }
}

const loadRankedStats = () => {
  console.log('Ranked stats running')

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

  const followedPlayers = [
    'blissfulyoshi',
    'financier',
    'histoire',
    'husahusahusahusa',
    'ibrizxd',
    'icely',
    'maikalover233',
    'sapoleto',
    'yokipi',
  ]

  const rankedStats = {
    top50Score: 0,
    mostPickedWrongAnswer: '',
    mostPickedWrongAnswerCount: 0,
  }

  const clearRankedStats = () => {
    rankedStats.top50Score = 0
    rankedStats.mostPickedWrongAnswer = ''
    rankedStats.mostPickedWrongAnswerCount = 0
  }

  let playerAnswers = {}

  const playerAnswersListener = new Listener('player answers', (data) => {
    playerAnswers = {}
    data.answers.forEach((answer) => {
      playerAnswers[answer.gamePlayerId] = answer.answer
    })
  }).bindListener()

  const answerResultsListener = new Listener('answer results', (result) => {
    const followedPlayersResults = {}
    let top50Score = 999
    const wrongAnswers = {}
    result.players.forEach((playerResult) => {
      const playerName = quiz.players[playerResult.gamePlayerId].name.toLowerCase()
      if (followedPlayers.includes(playerName)) {
        followedPlayersResults[playerName] = {
          name: quiz.players[playerResult.gamePlayerId].name,
          correct: playerResult.correct,
          score: playerResult.score,
          guess: playerAnswers[playerResult.gamePlayerId],
        }
      }

      if (playerResult.position <= 50) {
        top50Score = Math.min(top50Score, playerResult.score)
      }

      const playerAnswer = playerAnswers[playerResult.gamePlayerId]
      if (!playerResult.correct && playerAnswer) {
        const key = playerAnswer.toLowerCase()
        if (!wrongAnswers[key]) {
          wrongAnswers[key] = 1
        } else {
          wrongAnswers[key] += 1
        }
      }

      let mostWrongAnswer = ''
      Object.keys(wrongAnswers).forEach((answer) => {
        if (!mostWrongAnswer || wrongAnswers[mostWrongAnswer] < wrongAnswers[answer]) {
          mostWrongAnswer = answer
        }
      })

      rankedStats.top50Score = top50Score
      rankedStats.mostPickedWrongAnswer = mostWrongAnswer || 'None'
      rankedStats.mostPickedWrongAnswerCount = wrongAnswers[mostWrongAnswer] || 0
    })

    const scoreMsg = Object.values(followedPlayersResults).map((player) => {
      const { name, correct, score, guess } = player
      return `
      <div style="color: ${correct ? 'lawngreen' : '#ff4136'}; padding-left: 1em">
        ${name}: ${score} - ${guess}
      </div>
      `}
    ).join('')

    gameChat.insertMsg(`
    <div><b>Top 50 score:</b> ${rankedStats.top50Score}</div>
    <div><b>Most picked wrong answer:</b> ${rankedStats.mostPickedWrongAnswer} (${rankedStats.mostPickedWrongAnswerCount})</div>
    <div><b>Scoreboard:</b></div>
    ${scoreMsg}
    `)
  }).bindListener()

  const quizReadyListener = new Listener('quiz ready', () => {
    clearRankedStats()
  }).bindListener()
}

maybeLoadRankedStats()
