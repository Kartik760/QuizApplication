const questions = {
    'web-development': [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
            correct: 0
        },
        {
            question: "Which CSS property is used to change the text color?",
            options: ["text-color", "color", "font-color", "text-style"],
            correct: 1
        },
        {
            question: "What is the correct way to write a JavaScript array?",
            options: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 'red', 'green', 'blue'", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
            correct: 2
        },
        {
            question: "Which HTML tag is used to define an internal style sheet?",
            options: ["<script>", "<style>", "<css>", "<link>"],
            correct: 1
        },
        {
            question: "What does CSS stand for?",
            options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
            correct: 2
        }
    ],
    'ai-automation': [
        {
            question: "What is Machine Learning?",
            options: ["A type of computer hardware", "A subset of artificial intelligence that enables systems to learn from data", "A programming language", "A database management system"],
            correct: 1
        },
        {
            question: "Which of the following is NOT a type of machine learning?",
            options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Manual Learning"],
            correct: 3
        },
        {
            question: "What is the primary purpose of automation?",
            options: ["To replace all human workers", "To reduce manual tasks and increase efficiency", "To make computers faster", "To create more jobs"],
            correct: 1
        },
        {
            question: "Which AI technology is commonly used for natural language processing?",
            options: ["Neural Networks", "Blockchain", "Virtual Reality", "Augmented Reality"],
            correct: 0
        },
        {
            question: "What does API stand for in the context of automation?",
            options: ["Application Programming Interface", "Automated Process Integration", "Advanced Programming Instruction", "Application Process Interface"],
            correct: 0
        }
    ],
    'ui-ux': [
        {
            question: "What does UX stand for?",
            options: ["User Experience", "User Extension", "User Execution", "User Exchange"],
            correct: 0
        },
        {
            question: "Which design principle focuses on making interfaces predictable and consistent?",
            options: ["Affordance", "Consistency", "Hierarchy", "Contrast"],
            correct: 1
        },
        {
            question: "What is the purpose of wireframing in UI/UX design?",
            options: ["To add colors to the design", "To create a visual blueprint of the interface", "To write code", "To test user interactions"],
            correct: 1
        },
        {
            question: "Which color combination provides the best contrast for accessibility?",
            options: ["Yellow on white", "Black on white", "Light gray on white", "Blue on purple"],
            correct: 1
        },
        {
            question: "What is the 'F-pattern' in UX design?",
            options: ["A type of font", "How users typically scan web pages", "A color scheme", "A layout grid"],
            correct: 1
        }
    ],
    'programming': [
        {
            question: "What is a variable in programming?",
            options: ["A type of computer", "A container that stores data values", "A programming language", "A software application"],
            correct: 1
        },
        {
            question: "Which programming concept allows code to be reused?",
            options: ["Variables", "Functions", "Comments", "Strings"],
            correct: 1
        },
        {
            question: "What is the purpose of comments in code?",
            options: ["To make the code run faster", "To explain what the code does", "To create errors", "To change the output"],
            correct: 1
        },
        {
            question: "Which data type is used for whole numbers?",
            options: ["String", "Boolean", "Integer", "Float"],
            correct: 2
        },
        {
            question: "What is debugging?",
            options: ["Writing new code", "Finding and fixing errors in code", "Deleting code", "Copying code"],
            correct: 1
        }
    ],
    'technology': [
        {
            question: "What does IoT stand for?",
            options: ["Internet of Things", "Internet of Technology", "International Online Tools", "Internet of Tomorrow"],
            correct: 0
        },
        {
            question: "Which technology is used to create decentralized applications?",
            options: ["Cloud Computing", "Blockchain", "Virtual Reality", "Artificial Intelligence"],
            correct: 1
        },
        {
            question: "What is cloud computing?",
            options: ["Computing in the sky", "Delivering computing services over the internet", "A type of computer hardware", "A programming language"],
            correct: 1
        },
        {
            question: "Which company developed the iPhone?",
            options: ["Samsung", "Apple", "Google", "Microsoft"],
            correct: 1
        },
        {
            question: "What is the primary purpose of a VPN?",
            options: ["To make the internet faster", "To provide secure and private internet access", "To block ads", "To download files"],
            correct: 1
        }
    ]
};

let currentQuestionNumber = 0;
let userScore = 0;
let selectedAnswer = null;
let currentCategory = '';

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('home-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const performanceMessage = document.getElementById('performance-message');
const categoryName = document.getElementById('category-name');
const categoryCompleted = document.getElementById('category-completed');
const scoreDetails = document.getElementById('score-details');

document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            startQuiz(category);
        });
    });
});

function startQuiz(category) {
    currentCategory = category;
    currentQuestionNumber = 0;
    userScore = 0;
    selectedAnswer = null;
    categoryName.textContent = getCategoryName(category);
    updateScore();
    showScreen(quizScreen);
    showQuestion();
}

function getCategoryName(category) {
    const names = {
        'web-development': 'Web Development',
        'ai-automation': 'AI & Automation',
        'ui-ux': 'UI/UX Design',
        'programming': 'Programming',
        'technology': 'Technology'
    };
    return names[category] || category;
}

function showQuestion() {
    const categoryQuestions = questions[currentCategory];
    const question = categoryQuestions[currentQuestionNumber];
    questionText.textContent = question.question;
    questionCounter.textContent = (currentQuestionNumber + 1) + ' of ' + categoryQuestions.length;
    const progress = ((currentQuestionNumber + 1) / categoryQuestions.length) * 100;
    progressFill.style.width = progress + '%';
    optionsContainer.innerHTML = '';
    question.options.forEach(function(option, index) {
        const safeOption = option.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const optionButton = document.createElement('div');
        optionButton.className = 'option';
        optionButton.innerHTML = '<span>' + safeOption + '</span>';
        optionButton.addEventListener('click', function() {
            selectOption(index);
        });
        optionsContainer.appendChild(optionButton);
    });
    nextButton.disabled = true;
    selectedAnswer = null;
}

function selectOption(optionIndex) {
    if (selectedAnswer !== null) return;
    selectedAnswer = optionIndex;
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach(function(button) {
        button.classList.remove('selected', 'correct', 'incorrect');
    });
    optionButtons[optionIndex].classList.add('selected');
    const categoryQuestions = questions[currentCategory];
    const question = categoryQuestions[currentQuestionNumber];
    if (optionIndex === question.correct) {
        optionButtons[optionIndex].classList.add('correct');
        userScore++;
        updateScore();
    } else {
        optionButtons[optionIndex].classList.add('incorrect');
        optionButtons[question.correct].classList.add('correct');
    }
    optionButtons.forEach(function(button) {
        button.classList.add('disabled');
    });
    nextButton.disabled = false;
}

function nextQuestion() {
    const categoryQuestions = questions[currentCategory];
    currentQuestionNumber++;
    if (currentQuestionNumber >= categoryQuestions.length) {
        showResults();
    } else {
        showQuestion();
    }
}

function showResults() {
    const categoryQuestions = questions[currentCategory];
    const percentage = (userScore / categoryQuestions.length) * 100;
    finalScore.textContent = Math.round(percentage) + '%';
    categoryCompleted.textContent = getCategoryName(currentCategory);
    scoreDetails.textContent = 'You got ' + userScore + ' out of ' + categoryQuestions.length + ' questions correct';
    let message = '';
    if (percentage >= 80) {
        message = 'Excellent Work! 🎉';
    } else if (percentage >= 60) {
        message = 'Good Job! 👍';
    } else if (percentage >= 40) {
        message = 'Not Bad! 📚';
    } else {
        message = 'Keep Learning! 💪';
    }
    performanceMessage.textContent = message;
    showScreen(resultsScreen);
}

function restartQuiz() {
    startQuiz(currentCategory);
}

function goToHome() {
    showScreen(startScreen);
}

function updateScore() {
    scoreElement.textContent = userScore;
}

function showScreen(screen) {
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    screen.classList.add('active');
}

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);
homeButton.addEventListener('click', goToHome);

showScreen(startScreen); 