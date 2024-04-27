document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    const resultDiv = document.getElementById('result');

    submitBtn.addEventListener('click', function() {
        // Get the selected answer
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');

        if (selectedAnswer) {
            // Get the value of the selected answer
            const selectedValue = selectedAnswer.value;

            // Check if the selected answer is correct
            if (selectedValue === 'A') {
                resultDiv.textContent = 'Correct!';
                resultDiv.style.color = 'green';
            } else {
                resultDiv.textContent = 'Incorrect. Try again!';
                resultDiv.style.color = 'red';
            }
        } else {
            resultDiv.textContent = 'Please select an answer!';
            resultDiv.style.color = 'red';
        }
    });
});
