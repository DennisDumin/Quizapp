let questions = [
    {
        question: 'Wie heißt eine Pokèmon-Region?',
        answer_1: "Unfall",
        answer_2: "Reinfall",
        answer_3: "Einall",
        answer_4: "Durchfall",
        right_answer: "3",

    },
    {
        question: 'Wie startet der Titelsong von Pokémon?',
        answer_1: "Ich will Pokémonmeister werden …",
        answer_2: "Ich will Pummeluff knuddeln …",
        answer_3: "Ich will in Alabastia sein …",
        answer_4: "Ich will der Allerbeste sein …",
        right_answer: "4",

    },
    {
        question: 'Welches Item wird benötigt, damit Evoli sich zu Flamara entwickelt?',
        answer_1: "Feuerstein",
        answer_2: "Wasserstein",
        answer_3: "Donnerstein",
        answer_4: "Blattstein",
        right_answer: "1",

    },
    {
        question: 'Wie viele Arme hat Machomei?',
        answer_1: "8",
        answer_2: "6",
        answer_3: "4",
        answer_4: "12",
        right_answer: "3",

    },
    {
        question: 'Was heißt Pokémon auf deutsch?',
        answer_1: "Monsterjagd",
        answer_2: "Taschenmonster",
        answer_3: "Feenwesen",
        answer_4: "Süße Monster",
        right_answer: "2",

    },
    {
        question: 'In welchem Land wurde Pokémon erfunden?',
        answer_1: "Japan",
        answer_2: "China",
        answer_3: "Korea",
        answer_4: "Deutschland",
        right_answer: "1",

    },
    {
        question: 'Welches Unternehmen steckt hinter Pokémon?',
        answer_1: "Samsung",
        answer_2: "Huawei",
        answer_3: "Sony",
        answer_4: "Nintendo",
        right_answer: "4",

    },

];

let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_RIGHT = new Audio('./audio/right.mp3');
let AUDIO_WRONG = new Audio('./audio/wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('question-body').style = 'display: none;';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = './img/trophy.png';
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style = `width: ${percent}%;`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) { // richtig beantwortet
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_RIGHT.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger'); // falsch beantwortet
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_WRONG.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer']
}

function nextQuestion() {
    currentQuestion++;

    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {

    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');

}

function restartGame() {
    document.getElementById('header-image').src = './img/question.jpg';
    document.getElementById('question-body').style = '';
    document.getElementById('end-screen').style = 'display: none;';
    currentQuestion = 0;
    rightQuestions = 0;
    init();
}