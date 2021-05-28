const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// shuffle questions to avoid question alwyays being in the same position
let  shuffledQuestions, currentquestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentquestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentquestionIndex = 0
    questionContainerElement.classList.remove('hide')
    
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentquestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentquestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "what is 1 + 3",
        answers: [
            { text: '4', correct: true},
            { text: '25', correct: false}
        ]
    },
    {
        question: "Select an OOP language",
        answers: [
            { text: 'Java', correct: true},
            { text: 'HTML', correct: false},
            { text: 'VueJs', correct: false},
            { text: 'WordPress', correct: false}

        ]
    },
    {
        question: "MENA stack consists of: ",
        answers: [
            { text: 'MongoDB', correct: true},
            { text: 'ExpressJS', correct: true},
            { text: 'NodeJs', correct: true},
            { text: 'AngularJs', correct: true}
        ]
    },
    {
        question: "Programmers are the smartest people ",
        answers: [
            { text: 'Yeahh', correct: true},
            { text: 'Nope', correct: false}
        ]
    },
    {
        question: "JavaScript is the new wave?  ",
        answers: [
            { text: 'For sure', correct: true},
            { text: 'Yep', correct: true},
            { text: 'Nah', correct: false},

        ]
    }
]
