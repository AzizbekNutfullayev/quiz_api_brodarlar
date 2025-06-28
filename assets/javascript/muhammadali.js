

const nextPage = new URLSearchParams(window.location.search).get(
      `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`
)
let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function displayQuestion(index) {
    const question = questions[index];
    const answers = [...question.incorrect_answers, question.correct_answer];
    answers.sort(() => Math.random() - 0.5);

    document.getElementById("question").innerHTML = question.question;
    document.getElementById("answer1").innerHTML = answers[0];
    document.getElementById("answer2").innerHTML = answers[1];
    document.getElementById("answer3").innerHTML = answers[2];
    document.getElementById("answer4").innerHTML = answers[3];

    document.querySelectorAll('.btns button').forEach((button, i) => {
        button.onclick = () => checkAnswer(answers[i], question.correct_answer);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        correctAnswers++;
        localStorage.setItem('quizScore', correctAnswers)
    } else {
        incorrectAnswers++;
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}
const highScore = document.getElementById('locol'); 

function showResults() {
    document.getElementById("question").innerHTML = `
        <div class="result">
            <h2>O'yin Tugadi </h2>
            <p>Ajoyib javob <strong>${correctAnswers}</strong> / <strong>${questions.length}</strong> .</p>
        </div>`;
    document.querySelector('.btns').style.display = 'none';
    document.getElementById("restart").style.display = 'block';

    localStorage.setItem('quizScore', correctAnswers); 
    let scores = localStorage.getItem('quizScore') || 0; 
    highScore.innerHTML = scores; 
}
function checkAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.btns button');
  
    buttons.forEach((btn) => {
      btn.disabled = true; // barcha tugmalarni bloklaymiz
      if (btn.innerHTML === correct) {
        btn.classList.add('correct'); // to‘g‘ri javobni yashil qilamiz
      } else if (btn.innerHTML === selected && selected !== correct) {
        btn.classList.add('incorrect'); // noto‘g‘ri tanlangan javobni qizil qilamiz
      }
    });
  
    // Statistikani yangilaymiz
    if (selected === correct) {
      correctAnswers++;
      localStorage.setItem('quizScore', correctAnswers);
    } else {
      incorrectAnswers++;
    }
  
    // 2 soniyadan keyin keyingi savolga o'tadi
    setTimeout(() => {
      nextQuestion();
      buttons.forEach((btn) => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
      });
    }, 2000);
  }
  

function startGameAgain() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    document.querySelector('.btns').style.display = 'flex';
    document.getElementById("restart").style.display = 'none';
    document.getElementById("score").innerHTML = "";
    displayQuestion(currentQuestionIndex);
    
}

document.getElementById("restart").onclick = startGameAgain;

axios
    .get(
        `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`
    )
    .then((res) => {
        questions = res.data.results;
        displayQuestion(currentQuestionIndex);
    })
    .catch((error) => {
        console.error('Error fetching questions:', error);  
        document.getElementById("question").innerHTML = "Failed to load questions.";
    });