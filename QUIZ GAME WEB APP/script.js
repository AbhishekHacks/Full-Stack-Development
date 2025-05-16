$(document).ready(function () {
  let currentQuestionIndex = 0;
  let score = 0;

  // Start the quiz
  $('#start-btn').click(function () {
    $('#start-screen').hide();
    $('#quiz-screen').show();
    loadQuestion();
  });

  // Load a question and its options
  function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    $('#question-text').text(currentQuestion.question);
    $('#options-container').empty();

    currentQuestion.options.forEach((option, index) => {
      const optionButton = $(`
        <button class="option-btn" data-index="${index}">${option}</button>
      `);
      $('#options-container').append(optionButton);
    });

    // Disable next button until an option is selected
    $('#next-btn').prop('disabled', true);
  }

  // When an option is clicked
  $('#options-container').on('click', '.option-btn', function () {
    $('.option-btn').prop('disabled', true); // disable all buttons after selection

    const selectedIndex = $(this).data('index');
    const correctIndex = quizQuestions[currentQuestionIndex].correctAnswer;

    if (selectedIndex === correctIndex) {
      $(this).css('background-color', '#4CAF50'); // green
      score++;
    } else {
      $(this).css('background-color', '#f44336'); // red
      $(`.option-btn[data-index=${correctIndex}]`).css('background-color', '#4CAF50');
    }

    $('#next-btn').prop('disabled', false); // enable next button
  });

  // Go to the next question or show results
  $('#next-btn').click(function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      $('#quiz-screen').hide();
      $('#result-screen').show();
      $('#score-text').text(`You scored ${score} out of ${quizQuestions.length}`);
    }
  });

  // Restart quiz
  $('#restart-btn').click(function () {
    currentQuestionIndex = 0;
    score = 0;
    $('#result-screen').hide();
    $('#start-screen').show();
  });
});
