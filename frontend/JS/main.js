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
    { word: 'No',        videoFile: 'No.mp4.mp4',        instruction: 'Bring your index and middle fingers down to touch your thumb.' },
    { word: 'Yes',       videoFile: 'yes.mp4.mp4',       instruction: 'Make a fist and nod it up and down.' },
    { word: 'All',       videoFile: 'all.mp4.mp4',       instruction: 'Swoop your dominant hand in a circle and place it in the palm of your other hand.' },
    { word: 'Cousin',    videoFile: 'cousin.mp4.mp4',    instruction: 'Shake a C handshape near your ear.' },
    { word: 'Drink',     videoFile: 'drink.mp4.mp4',     instruction: 'Mimic holding a cup and bringing it to your mouth.' },
    { word: 'Who',       videoFile: 'who.mp4.mp4',       instruction: 'Place your thumb on your chin and wiggle your index finger.' },
    { word: 'Black',     videoFile: 'black.mp4.mp4',     instruction: 'Slide your index finger across your forehead.' },
    { word: 'Help',      videoFile: 'help.mp4.mp4',      instruction: 'Place your dominant fist on the palm of your non-dominant hand and lift both.' },
    { word: 'Clothes',   videoFile: 'clothes.mp4.mp4',   instruction: 'Brush your thumbs down your chest twice.' },
    { word: 'Chair',     videoFile: 'chair.mp4.mp4',     instruction: 'Tap your index and middle fingers of one hand onto the same fingers of the other hand.' },
    { word: 'Before',    videoFile: 'before.mp4.mp4',    instruction: 'Wave your hand back over your shoulder.' },
    { word: 'Walk',      videoFile: 'walk.mp4.mp4',      instruction: 'Mimic feet walking with your hands.' },
    { word: 'Candy',     videoFile: 'candy.mp4.mp4',     instruction: 'Twist your index finger on your cheek.' },
    { word: 'Ice cream', videoFile: 'Ice cream.mp4.mp4', instruction: 'Mimic licking a cone with a fist near your mouth.' },
    { word: 'Thin',      videoFile: 'thin.mp4.mp4',      instruction: 'Pull your thumb and index finger apart vertically to show something narrow.' },
    { word: 'Go',        videoFile: 'go.mp4.mp4',        instruction: 'Point both index fingers forward and move them away from your body.' },
    { word: 'Computer',  videoFile: 'computer.mp4.mp4',  instruction: 'Tap the back of your dominant hand C-shape against the forearm of your non-dominant arm.' },
    { word: 'Deaf',      videoFile: 'deaf.mp4.mp4',      instruction: 'Touch your index finger to your ear, then to your chin.' },
    { word: 'Fine',      videoFile: 'Fine.mp4.mp4',      instruction: 'Touch your thumb to your chest with fingers spread out.' },
    { word: 'Book',      videoFile: 'Book.mp4.mp4',      instruction: 'Place your palms together, then open them like a book.' }
];

const sentencesData = [
    { sentence: 'I want it',           label: 'i want it',           videoFile: 'I want itmp4.mp4',       instruction: 'Point to yourself, then make a grabbing motion pulling toward your chest.' },
    { sentence: 'I am thirsty',       label: 'im thirsty',          videoFile: 'i am thirsty.mp4.mp4',   instruction: 'Drag your index finger down from your chin along your throat.' },
    { sentence: 'I am full',          label: 'i am full',           videoFile: 'I am full.mp4.mp4',      instruction: 'Point to yourself, then slide your dominant hand across your chest outward.' },
    { sentence: 'I am surprised',     label: 'i am surprised',      videoFile: 'I am surprised.mp4.mp4', instruction: 'Point to yourself, then flick both index fingers and thumbs open near your eyes.' },
    { sentence: 'I am poor',          label: 'i am poor',           videoFile: 'iampoor.mp4.mp4',         instruction: 'Point to yourself, then cup your elbow with your hand and slide it down.' },
    { sentence: 'My stomach hurts',   label: 'my stomach hurts',    videoFile: 'my stomach hurts.mp4.mp4', instruction: 'Point to your stomach, then twist your fist near it showing pain.' },
    { sentence: 'Let me think',       label: 'let me think',        videoFile: 'let me think.mp4.mp4',   instruction: 'Tap your index finger to your temple and pause thoughtfully.' },
    { sentence: 'Last year',          label: 'last year',           videoFile: 'Last year.mp4.mp4',      instruction: 'Sign "last" by flicking your pinky backward, then sign "year" by circling your fists.' },
    { sentence: 'We need to talk',    label: 'we need to talk',     videoFile: 'we need to talk.mp4.mp4', instruction: 'Circle your index finger between yourself and the other person, then tap your chin with your index finger.' },
    { sentence: 'I doubt it',         label: 'i doubt it',          videoFile: 'I doubt it.mp4.mp4',      instruction: 'Place your hand near your face with index and middle fingers extended, then bend them down while moving away.' },
    { sentence: 'I don\'t care',      label: 'i don\'t care',       videoFile: 'I don\'t care.mp4.mp4',   instruction: 'Touch your nose with a flattened O hand, then move it away opening into a loose claw.' },
    { sentence: 'I completely forget', label: 'i completely forget', videoFile: 'I completely forgot.mp4.mp4', instruction: 'Swiftly brush your open hand across your forehead, closing it into a fist as you move it away.' },
    { sentence: 'Excuse me',          label: 'excuse me',           videoFile: 'excuse me.mp4.mp4',       instruction: 'Brush the fingertips of your dominant hand twice across the flat palm of your non-dominant hand.' },
    { sentence: 'None of your business', label: 'none of your business', videoFile: 'None of your bussiness.mp4.mp4', instruction: 'Hold both hands in O shapes and break them apart sharply in front of you.' },
    { sentence: 'Keep in touch',      label: 'keep in touch',       videoFile: 'Keep in touch.mp4.mp4',   instruction: 'Tap the top of your non-dominant "K" hand with your dominant "K" hand twice.' }
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

    // Update Navbar Avatar if logged in
    updateNavbarAvatar();

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

    // Level 4 logic
    if (document.getElementById('learning-sentence')) {
        initLevel4();
    }

    // Alphabet Test logic - Only run if on the Alphabet test page
    if (document.getElementById('prompt-text') && document.title.includes('Alphabet')) {
        initAlphabetTest();
    }

    // Numbers Test logic - Only run if on the Numbers test page
    if (document.getElementById('prompt-text') && document.title.includes('Numbers')) {
        initNumbersTest();
    }

    // Sentences Test logic - Only run if on the Sentences test page
    if (document.getElementById('prompt-text') && document.title.includes('Sentences')) {
        initSentencesTest();
    }

    // Words Test logic - Only run if on the Words test page
    if (document.getElementById('prompt-text') && document.title.includes('Words')) {
        initWordsTest();
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
    imageEl.src = `assets/AlphabetImages/${data.letter}.png.jpeg`;
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
    } else if (document.getElementById('learning-sentence')) {
        // Use the label if available, otherwise the sentence text
        target = sentencesData[currentSentenceIndex].label || sentencesData[currentSentenceIndex].sentence;
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

        // Increment score in test mode
        if (isTestMode) {
            score++;
            const scoreEl = document.getElementById('current-score');
            if (scoreEl) scoreEl.textContent = score;
        }
        
        // Advance after delay
        setTimeout(() => {
            isTransitioning = false;
            if (matchFeedback) matchFeedback.textContent = '';
            if (detectedEl) detectedEl.textContent = '-';
            
            // Determine progression function
            if (isTestMode) {
                if (document.title.includes('Numbers')) {
                    nextNumbersTestQuestion();
                } else if (document.title.includes('Sentences')) {
                    nextSentencesTestQuestion();
                } else if (document.title.includes('Words')) {
                    nextWordsTestQuestion();
                } else {
                    nextTestQuestion();
                }
            }
            else if (document.getElementById('learning-letter')) nextLetter();
            else if (document.getElementById('learning-number')) nextNumber();
            else if (document.getElementById('learning-sentence')) nextSentence();
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

    // --- Sync Progress to Backend ---
    const earnedPoints = score * 20; // 20 points per correct answer
    let levelToComplete = '';
    const title = document.title.toLowerCase();
    
    if (title.includes('alphabet')) levelToComplete = 'level1_completed';
    else if (title.includes('numbers')) levelToComplete = 'level2_completed';
    else if (title.includes('words')) levelToComplete = 'level3_completed';
    else if (title.includes('sentences')) levelToComplete = 'level4_completed';

    const updates = { total_points: earnedPoints };
    if (levelToComplete) updates[levelToComplete] = 1;
    
    syncProgress(updates);
    // --------------------------------

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

// Numbers Test Logic
function initNumbersTest() {
    isTestMode = true;
    score = 0;
    questionCount = 0;
    const scoreEl = document.getElementById('current-score');
    if (scoreEl) scoreEl.textContent = '0';
    nextNumbersTestQuestion();
}

function nextNumbersTestQuestion() {
    if (questionCount >= MAX_QUESTIONS) {
        finishTest();
        return;
    }

    questionCount++;
    // Pick random number
    const randomIndex = Math.floor(Math.random() * numbersData.length);
    testTarget = numbersData[randomIndex].number;

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

// Words Test Logic
function initWordsTest() {
    isTestMode = true;
    score = 0;
    questionCount = 0;
    const scoreEl = document.getElementById('current-score');
    if (scoreEl) scoreEl.textContent = '0';
    nextWordsTestQuestion();
}

function nextWordsTestQuestion() {
    if (questionCount >= MAX_QUESTIONS) {
        finishTest();
        return;
    }

    questionCount++;
    // Pick random word
    const randomIndex = Math.floor(Math.random() * wordsData.length);
    testTarget = wordsData[randomIndex].word;

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

// Sentences Test Logic
function initSentencesTest() {
    isTestMode = true;
    score = 0;
    questionCount = 0;
    const scoreEl = document.getElementById('current-score');
    if (scoreEl) scoreEl.textContent = '0';
    nextSentencesTestQuestion();
}

function nextSentencesTestQuestion() {
    if (questionCount >= MAX_QUESTIONS) {
        finishTest();
        return;
    }

    questionCount++;
    // Pick random sentence
    const randomIndex = Math.floor(Math.random() * sentencesData.length);
    const selected = sentencesData[randomIndex];
    testTarget = selected.label || selected.sentence; // For detection

    const promptSpan = document.querySelector('#prompt-text span');
    if (promptSpan) {
        promptSpan.textContent = selected.sentence; // For display
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

// Free navigation — always advances regardless of detection result
window.nextLetter = function () {
    if (currentLetterIndex < alphabetData.length - 1) {
        currentLetterIndex++;
        renderCurrentLetter();
    } else {
        showFinishState();
    }
};

window.prevLetter = function () {
    if (currentLetterIndex > 0) {
        currentLetterIndex--;
        renderCurrentLetter();
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
    if (imageEl) imageEl.src = `assets/NumbersImages/${data.number}.jpeg`;
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

window.prevNumber = function () {
    if (currentNumberIndex > 0) {
        currentNumberIndex--;
        renderCurrentNumber();
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

    // Sync Level 2 completion
    syncProgress({ level2_completed: 1, total_points: 50 });
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
    const instructionEl = document.getElementById('learning-instruction');
    const progressEl = document.getElementById('progress-indicator');

    // Update content
    if (wordDisplayEl) wordDisplayEl.textContent = data.word;
    
    // Update Video using the exact filename stored in wordsData
    const videoPath = `assets/WordsVideos/${data.videoFile}`;
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

window.prevWord = function () {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        renderCurrentWord();
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

    // Sync Level 3 completion
    syncProgress({ level3_completed: 1, total_points: 50 });
}

function showFinishState() {
    document.querySelector('.instruction-card').classList.add('hidden');
    document.getElementById('learning-letter').textContent = "🎉";

    // Hide webcam area
    document.querySelector('.webcam-panel').classList.add('hidden');

    // Show final button
    document.getElementById('finish-container').classList.remove('hidden');

    // Sync Level 1 completion
    syncProgress({ level1_completed: 1, total_points: 50 });
}

// Level 4 (Sentences) Logic
let currentSentenceIndex = 0;

function initLevel4() {
    renderCurrentSentence();
}

function renderCurrentSentence() {
    const data = sentencesData[currentSentenceIndex];
    if (!data) return;

    // Elements
    const sentenceDisplayEl = document.getElementById('learning-sentence');
    const videoEl = document.getElementById('learning-video');
    const instructionEl = document.getElementById('learning-instruction');
    const progressEl = document.getElementById('progress-indicator');
    // Update content
    if (sentenceDisplayEl) sentenceDisplayEl.textContent = data.sentence;
    
    // Update Video
    if (videoEl) {
        if (data.videoFile) {
            const videoPath = `assets/SentencesVideos/${data.videoFile}`;
            videoEl.querySelector('source').src = videoPath;
            videoEl.parentElement.classList.remove('hidden');
            videoEl.load();
        } else {
            // Hide video if not available
            videoEl.parentElement.classList.add('hidden');
        }
    }

    if (instructionEl) instructionEl.textContent = data.instruction;
    if (progressEl) progressEl.textContent = `Sentence ${currentSentenceIndex + 1} / ${sentencesData.length}`;

    // Reset detection feedback
    const detectedEl = document.getElementById('detected-word');
    if (detectedEl) detectedEl.textContent = '-';
    
    const matchFeedback = document.getElementById('match-feedback');
    if (matchFeedback) {
        matchFeedback.textContent = '';
        matchFeedback.className = 'match-feedback';
    }

    // Animation trigger
    if (sentenceDisplayEl) {
        sentenceDisplayEl.classList.remove('letter-pop');
        void sentenceDisplayEl.offsetWidth; // trigger reflow
        sentenceDisplayEl.classList.add('letter-pop');
    }
}

window.nextSentence = function () {
    if (currentSentenceIndex < sentencesData.length - 1) {
        currentSentenceIndex++;
        renderCurrentSentence();
    } else {
        showSentencesFinishState();
    }
};

window.prevSentence = function () {
    if (currentSentenceIndex > 0) {
        currentSentenceIndex--;
        renderCurrentSentence();
    }
};

function showSentencesFinishState() {
    const card = document.querySelector('.instruction-card');
    const sentenceDisplayEl = document.getElementById('learning-sentence');
    const webcamPanel = document.querySelector('.webcam-panel');
    const finishContainer = document.getElementById('finish-container');

    if (card) card.classList.add('hidden');
    if (sentenceDisplayEl) sentenceDisplayEl.textContent = "🎉";
    if (webcamPanel) webcamPanel.classList.add('hidden');
    if (finishContainer) finishContainer.classList.remove('hidden');

    // Sync Level 4 completion
    syncProgress({ level4_completed: 1, total_points: 50 });
}

/**
 * Sync progress data to SQLite backend
 */
async function syncProgress(updateData) {
    const token = localStorage.getItem('token');
    const API_URL = 'http://localhost:5000/api';

    if (!token) {
        console.warn('Progress not synced: User not logged in.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/progress`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            console.log('Progress synced successfully:', updateData);
        } else {
            const err = await response.json();
            console.error('Failed to sync progress:', err.message);
        }
    } catch (error) {
        console.error('Error syncing progress:', error);
    }
}

/**
 * Update the navbar avatar with user initials if logged in
 */
function updateNavbarAvatar() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user && user.fullName) {
                const avatarEl = document.querySelector(".avatar");
                if (avatarEl) {
                    const initials = user.fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
                    avatarEl.textContent = initials;
                    avatarEl.title = `Profile: ${user.fullName}`;
                    
                    // Also ensure the link points to profile.html if it was pointing to login.html
                    const avatarLink = avatarEl.closest('a');
                    if (avatarLink && avatarLink.getAttribute('href') === 'login.html') {
                        avatarLink.setAttribute('href', 'profile.html');
                    }
                }
            }
        } catch (e) {
            console.error("Error parsing user for avatar:", e);
        }
    }
}
