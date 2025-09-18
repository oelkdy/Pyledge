const express = require('express');
const router = express.Router();

const questions = [
  {
    question: 'What is the output of print(2 ** 3)?',
    options: ['5', '6', '7', '8'],
    answer: '8'
  },
  {
    question: 'What does the following code do: list1 = [1, 2, 3]; list2 = list1; list1.append(4)?',
    options: ['list2 is [1, 2, 3, 4]', 'list1 is [1, 2, 3]', 'list2 is [4]', 'list1 is [4]'],
    answer: 'list2 is [1, 2, 3, 4]'
  },
  {
    question: "What is the output of print('Hello World'[::-1])?",
    options: ["dlroW olleH", "Hello World", "World Hello", "dlroW olleH "],
    answer: "dlroW olleH"
  },
  {
    question: "Which of the following is a mutable data type in Python?",
    options: ["tuple", "str", "list", "int"],
    answer: "list"
  },
  {
    question: "Which keyword is used for function in Python?",
    options: ["func", "def", "function", "define"],
    answer: "def"
  },
  {
    question: "What does the // operator do in Python?",
    options: ["Addition", "Division", "Integer Division", "Exponentiation"],
    answer: "Integer Division"
  },
  {
    question: "Which function is used to find the length of a string in Python?",
    options: ["len()", "length()", "size()", "strlen()"],
    answer: "len()"
  },
  {
    question: "What is the output of print(type(10))?",
    options: ["<class 'float'>", "<class 'str'>", "<class 'int'>", "<class 'list'>"],
    answer: "<class 'int'>"
  },
  {
    question: "Which keyword is used to create a class in Python?",
    options: ["class", "def", "function", "object"],
    answer: "class"
  },
  {
    question: "What is the correct file extension for Python files?",
    options: [".python", ".pyth", ".py", ".pt"],
    answer: ".py"
  }
];

router.get('/exercises', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/loginViews');
  }

  // Shuffle and select 5 random questions
  const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffledQuestions.slice(0, 5);

  res.render('exerciseViews', { questions: selectedQuestions });
});

router.post('/exercise/submit', (req, res) => {
  const userAnswers = req.body;
  let score = 0;

  const selectedQuestions = req.session.selectedQuestions || [];

  selectedQuestions.forEach((question, index) => {
    const userAnswer = userAnswers[`question-${index}`];
    console.log(`Question ${index + 1}: ${question.question}`);
    console.log(`User Answer: ${userAnswer}`);
    console.log(`Correct Answer: ${question.answer}`);
    if (userAnswer && userAnswer === question.answer) {
      score += 2; // Each question is worth 2 marks
    }
  });

  console.log(`Final Score: ${score} out of 10`);
  res.json({ score, total: 10 });
});

module.exports = router;