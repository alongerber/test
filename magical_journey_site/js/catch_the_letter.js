// Logic for Catch the Letter game
document.addEventListener('DOMContentLoaded', () => {
    const hebrewAlphabet = [
        'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י',
        'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'
    ];

    // Final forms (optional for now, could be added later for complexity)
    // const hebrewFinalLetters = {'כ': 'ך', 'מ': 'ם', 'נ': 'ן', 'פ': 'ף', 'צ': 'ץ'};

    const targetLetterDisplay = document.getElementById('target-letter');
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const feedbackArea = document.getElementById('feedback-area'); // From activity_template.html

    let currentTargetLetter = '';
    let score = 0;
    const numberOfOptions = 4; // How many letter choices to display

    function getRandomLetter(excludeLetter = '') {
        let letter;
        do {
            letter = hebrewAlphabet[Math.floor(Math.random() * hebrewAlphabet.length)];
        } while (letter === excludeLetter);
        return letter;
    }

    function startGameRound() {
        feedbackArea.textContent = '';
        feedbackArea.className = ''; // Clear previous feedback styling
        gameBoard.innerHTML = ''; // Clear previous options

        currentTargetLetter = getRandomLetter();
        targetLetterDisplay.textContent = currentTargetLetter;

        const options = new Set();
        options.add(currentTargetLetter);

        while (options.size < numberOfOptions) {
            options.add(getRandomLetter(currentTargetLetter));
        }

        const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

        shuffledOptions.forEach(letter => {
            const letterButton = document.createElement('button');
            letterButton.classList.add('letter-option');
            letterButton.textContent = letter;
            letterButton.addEventListener('click', handleOptionClick);
            gameBoard.appendChild(letterButton);
        });
    }

    function handleOptionClick(event) {
        const selectedLetter = event.target.textContent;
        if (selectedLetter === currentTargetLetter) {
            score++;
            scoreDisplay.textContent = score;
            feedbackArea.textContent = 'כל הכבוד!';
            feedbackArea.className = 'success'; // Assumes .success style in theme.css
            // Disable buttons after correct choice to prevent multiple clicks
            disableLetterButtons();
            setTimeout(startGameRound, 1500); // Next round after a short delay
        } else {
            feedbackArea.textContent = 'נסה שוב!';
            feedbackArea.className = 'error'; // Assumes .error style in theme.css
            event.target.disabled = true; // Disable wrong button
        }
    }

    function disableLetterButtons() {
        const buttons = gameBoard.querySelectorAll('.letter-option');
        buttons.forEach(button => button.disabled = true);
    }

    // Initial game start
    startGameRound();
});
