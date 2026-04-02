// Global utilities and initialization
const alphabetData = [
    { letter: 'A', instruction: 'Place your index finger on your thumb, hold your hand up vertically.' },
    { letter: 'B', instruction: 'All fingers straight, thumb across palm, hand facing forward.' },
    { letter: 'C', instruction: 'Curve your hand to form the shape of the letter C.' },
    { letter: 'D', instruction: 'Touch the tip of your index finger to the thumb, keep other fingers straight.' },
    { letter: 'E', instruction: 'Curl your fingers down to touch your thumb, palm facing forward.' },
    { letter: 'F', instruction: 'Touch the tips of your index finger and thumb together, other fingers straight.' },
    { letter: 'G', instruction: 'Point your index finger to the side, thumb parallel beneath.' },
    { letter: 'H', instruction: 'Extend index and middle fingers together, other fingers down.' },
    { letter: 'I', instruction: 'Hold pinky finger up, other fingers closed into fist.' },
    { letter: 'J', instruction: 'Draw a "J" in the air with your pinky finger.' },
    { letter: 'K', instruction: 'Extend index and middle fingers upward, thumb in between.' },
    { letter: 'L', instruction: 'Make an L shape with your index finger and thumb.' },
    { letter: 'M', instruction: 'Place thumb under three fingers, palm facing forward.' },
    { letter: 'N', instruction: 'Place thumb under two fingers, palm facing forward.' },
    { letter: 'O', instruction: 'Curve all fingers to make an O shape.' },
    { letter: 'P', instruction: 'Point index and middle fingers down, thumb between, palm facing downward.' },
    { letter: 'Q', instruction: 'Point thumb and index finger down, other fingers closed.' },
    { letter: 'R', instruction: 'Cross index and middle fingers, other fingers closed.' },
    { letter: 'S', instruction: 'Make a fist with thumb over fingers.' },
    { letter: 'T', instruction: 'Place thumb between index and middle fingers.' },
    { letter: 'U', instruction: 'Extend index and middle fingers together.' },
    { letter: 'V', instruction: 'Extend index and middle fingers apart in V shape.' },
    { letter: 'W', instruction: 'Extend index, middle, and ring fingers apart.' },
    { letter: 'X', instruction: 'Curl index finger, other fingers closed.' },
    { letter: 'Y', instruction: 'Thumb and pinky extended, other fingers closed.' },
    { letter: 'Z', instruction: 'Draw the letter Z in the air with your index finger.' }
];
const numbersData = [
    { number: '0', instruction: 'Make an O shape with your hand.' },
    { number: '1', instruction: 'Extend your index finger upward.' },
    { number: '2', instruction: 'Extend your index and middle fingers upward.' },
    { number: '3', instruction: 'Extend your thumb, index, and middle fingers.' },
    { number: '4', instruction: 'Extend four fingers, thumb tucked in.' },
    { number: '5', instruction: 'Extend all five fingers.' },
    { number: '6', instruction: 'Touch your thumb to your pinky finger.' },
    { number: '7', instruction: 'Touch your thumb to your ring finger.' },
    { number: '8', instruction: 'Touch your thumb to your middle finger.' },
    { number: '9', instruction: 'Touch your thumb to your index finger.' }
];

const wordsData = [
    { word: 'No', instruction: 'Bring your index and middle fingers down to touch your thumb.' },
    { word: 'Yes', instruction: 'Make a fist and nod it up and down.' },
    { word: 'All', instruction: 'Swoop your dominant hand in a circle and place it in the palm of your other hand.' },
    { word: 'Cousin', instruction: 'Shake a C handshape near your ear.' },
    { word: 'Drink', instruction: 'Mimic holding a cup and bringing it to your mouth.' },
    { word: 'Who', instruction: 'Place your thumb on your chin and wiggle your index finger.' },
    { word: 'Black', instruction: 'Slide your index finger across your forehead.' },
    { word: 'Help', instruction: 'Place your dominant fist on the palm of your non-dominant hand and lift both.' },
    { word: 'Clothes', instruction: 'Brush your thumbs down your chest twice.' },
    { word: 'Chair', instruction: 'Tap your index and middle fingers of one hand onto the same fingers of the other hand.' },
    { word: 'Before', instruction: 'Wave your hand back over your shoulder.' },
    { word: 'Walk', instruction: 'Mimic feet walking with your hands.' },
    { word: 'Candy', instruction: 'Twist your index finger on your cheek.' },
    { word: 'Ice cream', instruction: 'Mimic licking a cone with a fist near your mouth.' },
    { word: 'Thin', instruction: 'Pull your thumb and index finger apart vertically to show something narrow.' },
    { word: 'Go', instruction: 'Point both index fingers forward and move them away from your body.' },
    { word: 'Computer', instruction: 'Tap the back of your dominant hand C-shape against the forearm of your non-dominant arm.' }
];

// Test state
let isTestMode = false;
let testTarget = '';
let score = 0;
let questionCount = 0;
const MAX_QUESTIONS = 5;
let isTransitioning = false; // Prevent multiple increments during transition

document.addEventListener('DOMContentLoaded', () => {
    // Add simple fade-in effect to body content globally if needed
    document.body.classList.add('fade-in');

    // Level 1 logic
    if (document.getElementById('learning-letter')) {
        initLevel1();
    }
    
    // Level 2 logic
    if (document.getElementById('learning-number')) {
        initLevel2();
    }

    // Level 3 logic
    if (document.getElementById('learning-word')) {
        initLevel3();
    }

    // Alphabet Test logic - Only run if on the Alphabet test page
    if (document.getElementById('prompt-text') && document.title.includes('Alphabet')) {
        initAlphabetTest();
    }
});

let currentLetterIndex = 0;

function initLevel1() {
    renderCurrentLetter();
}

function renderCurrentLetter() {
    const data = alphabetData[currentLetterIndex];

    // Elements
    const letterEl = document.getElementById('learning-letter');
    const imageEl = document.getElementById('learning-image');
    const instructionEl = document.getElementById('learning-instruction');
    const progressEl = document.getElementById('progress-indicator');

    // Update content
    letterEl.textContent = data.letter;
    imageEl.src = `assets/AlphabetImages/${data.letter}.jpg`;
    instructionEl.textContent = data.instruction;
    progressEl.textContent = `${data.letter} / Z`;

    // Reset detection feedback
    const detectedText = document.getElementById('detected-letter');
    const matchFeedback = document.getElementById('match-feedback');
    detectedText.textContent = '-';
    if (matchFeedback) {
        matchFeedback.textContent = '';
        matchFeedback.className = 'match-feedback';
    }

    // Animation trigger
    letterEl.classList.remove('letter-pop');
    void letterEl.offsetWidth; // trigger reflow
    letterEl.classList.add('letter-pop');
}

// Called by webcam / detection backend with the detected letter string
window.handleDetection = function (detectedValue, confidence = 1.0) {
    // Support both 'detected-letter' and 'detected-word' IDs
    const detectedEl = document.getElementById('detected-letter') || document.getElementById('detected-word');
    const matchFeedback = document.getElementById('match-feedback');
    
    if (isTransitioning) return;

    // Determine Target based on current page context
    let target = '';
    if (document.getElementById('learning-letter')) {
        target = alphabetData[currentLetterIndex].letter;
    } else if (document.getElementById('learning-number')) {
        target = numbersData[currentNumberIndex].number;
    } else if (document.getElementById('learning-word')) {
        target = wordsData[currentWordIndex].word;
    } else if (isTestMode) {
        target = testTarget;
    }

    // MATCH FOUND LOGIC (Require 30% confidence)
    if (detectedValue && detectedValue.toLowerCase() === target.toLowerCase() && confidence >= 0.3) {
        if (detectedEl) {
            detectedEl.textContent = target; // Show the correct word
        }
        if (matchFeedback) {
            matchFeedback.textContent = '(Correct)';
            matchFeedback.className = 'match-feedback match-correct';
        }

        // Trigger Progression
        isTransitioning = true;
        
        // Advance after delay
        setTimeout(() => {
            isTransitioning = false;
            if (matchFeedback) matchFeedback.textContent = '';
            if (detectedEl) detectedEl.textContent = '-';
            
            // Determine progression function
            if (isTestMode) nextTestQuestion();
            else if (document.getElementById('learning-letter')) nextLetter();
            else if (document.getElementById('learning-number')) nextNumber();
            else if (document.getElementById('learning-word')) nextWord();
        }, 1500);
    } else {
        // No match yet: Keep UI clean
        if (detectedEl) detectedEl.textContent = '-';
        if (matchFeedback) matchFeedback.textContent = '';
    }
};

// Alphabet Test Logic
function initAlphabetTest() {
    isTestMode = true;
    score = 0;
    questionCount = 0;
    const scoreEl = document.getElementById('current-score');
    if (scoreEl) scoreEl.textContent = '0';
    nextTestQuestion();
}

function nextTestQuestion() {
    if (questionCount >= MAX_QUESTIONS) {
        finishTest();
        return;
    }

    questionCount++;
    // Pick random letter
    const randomIndex = Math.floor(Math.random() * alphabetData.length);
    testTarget = alphabetData[randomIndex].letter;

    const promptSpan = document.querySelector('#prompt-text span');
    if (promptSpan) {
        promptSpan.textContent = testTarget;
        promptSpan.classList.add('pop-animation');
        setTimeout(() => promptSpan.classList.remove('pop-animation'), 500);
    }

    // Reset feedback
    const detectedEl = document.getElementById('detected-letter');
    const matchFeedback = document.getElementById('match-feedback');
    if (detectedEl) detectedEl.textContent = '-';
    if (matchFeedback) {
        matchFeedback.textContent = '';
        matchFeedback.className = 'match-feedback';
    }
}

function finishTest() {
    isTestMode = false;
    const promptText = document.getElementById('prompt-text');
    if (promptText) {
        promptText.innerHTML = `Excellent! Final Score: <span class="font-bold">${score}</span>`;
    }

    // Hide webcam
    const webcamPanel = document.querySelector('.webcam-panel');
    if (webcamPanel) webcamPanel.classList.add('hidden');

    // Create a return button if it doesn't exist
    const testLayout = document.querySelector('.test-layout');
    if (testLayout) {
        const btnReturn = document.createElement('a');
        btnReturn.href = 'home.html';
        btnReturn.className = 'btn btn-primary btn-lg mt-4';
        btnReturn.textContent = 'Back to Levels';
        btnReturn.style.width = 'auto';
        testLayout.appendChild(btnReturn);
    }
}

// Keep backward-compat alias in case webcam.js still calls the old name
window.handleCorrectDetection = function () {
    window.handleDetection(isTestMode ? testTarget : alphabetData[currentLetterIndex].letter);
};

// Free navigation — always advances regardless of detection result
window.nextLetter = function () {
    if (currentLetterIndex < alphabetData.length - 1) {
        currentLetterIndex++;
        renderCurrentLetter();
    } else {
        showFinishState();
    }
};

// Level 2 (Numbers) Logic
let currentNumberIndex = 0;

function initLevel2() {
    renderCurrentNumber();
}

function renderCurrentNumber() {
    const data = numbersData[currentNumberIndex];
    if (!data) return;

    // Elements
    const numberEl = document.getElementById('learning-number');
    const imageEl = document.getElementById('learning-image');
    const instructionEl = document.getElementById('learning-instruction');
    const progressEl = document.getElementById('progress-indicator');

    // Update content
    if (numberEl) numberEl.textContent = data.number;
    if (imageEl) imageEl.src = `assets/NumbersImages/${data.number}.jpg`;
    if (instructionEl) instructionEl.textContent = data.instruction;
    if (progressEl) progressEl.textContent = `${data.number} / 9`;

    // Reset detection feedback
    const detectedText = document.getElementById('detected-letter');
    const matchFeedback = document.getElementById('match-feedback');
    if (detectedText) detectedText.textContent = '-';
    if (matchFeedback) {
        matchFeedback.textContent = '';
        matchFeedback.className = 'match-feedback';
    }

    // Animation trigger
    if (numberEl) {
        numberEl.classList.remove('letter-pop');
        void numberEl.offsetWidth; // trigger reflow
        numberEl.classList.add('letter-pop');
    }
}

window.nextNumber = function () {
    if (currentNumberIndex < numbersData.length - 1) {
        currentNumberIndex++;
        renderCurrentNumber();
    } else {
        showNumbersFinishState();
    }
};

function showNumbersFinishState() {
    const card = document.querySelector('.instruction-card');
    const numberEl = document.getElementById('learning-number');
    const webcamPanel = document.querySelector('.webcam-panel');
    const finishContainer = document.getElementById('finish-container');

    if (card) card.classList.add('hidden');
    if (numberEl) numberEl.textContent = "🎉";
    if (webcamPanel) webcamPanel.classList.add('hidden');
    if (finishContainer) finishContainer.classList.remove('hidden');
}

// Level 3 (Words) Logic
let currentWordIndex = 0;

function initLevel3() {
    renderCurrentWord();
}

function renderCurrentWord() {
    const data = wordsData[currentWordIndex];
    if (!data) return;

    // Elements
    const wordDisplayEl = document.getElementById('learning-word');
    const videoEl = document.getElementById('learning-video');
    const demoVideoEl = document.getElementById('webcam-video'); 
    const instructionEl = document.getElementById('learning-instruction');
    const progressEl = document.getElementById('progress-indicator');
    const wordKey = (data.word || data.number).toLowerCase().replace(' ', '');

    // Update content
    if (wordDisplayEl) wordDisplayEl.textContent = data.word || data.number;
    
    // Update Videos
    const videoPath = `videos/${wordKey}.mp4`;
    if (videoEl) {
        videoEl.querySelector('source').src = videoPath;
        videoEl.load();
    }

    if (instructionEl) instructionEl.textContent = data.instruction;
    if (progressEl) progressEl.textContent = `Word ${currentWordIndex + 1} / ${wordsData.length}`;

    // Reset detection feedback
    const detectedEl = document.getElementById('detected-word');
    if (detectedEl) detectedEl.textContent = '-';
    
    const matchFeedback = document.getElementById('match-feedback');
    if (matchFeedback) {
        matchFeedback.textContent = '';
        matchFeedback.className = 'match-feedback';
    }

    // Animation trigger
    if (wordDisplayEl) {
        wordDisplayEl.classList.remove('letter-pop');
        void wordDisplayEl.offsetWidth; // trigger reflow
        wordDisplayEl.classList.add('letter-pop');
    }
}

window.nextWord = function () {
    if (currentWordIndex < wordsData.length - 1) {
        currentWordIndex++;
        renderCurrentWord();
    } else {
        showWordsFinishState();
    }
};

function showWordsFinishState() {
    const card = document.querySelector('.instruction-card');
    const wordDisplayEl = document.getElementById('learning-word');
    const webcamPanel = document.querySelector('.webcam-panel');
    const finishContainer = document.getElementById('finish-container');

    if (card) card.classList.add('hidden');
    if (wordDisplayEl) wordDisplayEl.textContent = "🎉";
    if (webcamPanel) webcamPanel.classList.add('hidden');
    if (finishContainer) finishContainer.classList.remove('hidden');
}

function showFinishState() {
    document.querySelector('.instruction-card').classList.add('hidden');
    document.getElementById('learning-letter').textContent = "🎉";

    // Hide webcam area
    document.querySelector('.webcam-panel').classList.add('hidden');

    // Show final button
    document.getElementById('finish-container').classList.remove('hidden');
}
