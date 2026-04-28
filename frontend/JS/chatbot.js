const qaDatabase = [
    // --- BASICS & ALPHABET (20) ---
    { keywords: ["alphabet", "letters"], answer: "The ASL alphabet consists of 26 handshapes, one for each letter of the English alphabet. Most are signed with one hand!" },
    { keywords: ["numbers", "count"], answer: "In ASL, numbers 1-5 are usually signed with the palm facing towards you, while 6-10 face away. It's a common mistake for beginners!" },
    { keywords: ["fingerspelling"], answer: "Fingerspelling is used for names, places, and words that don't have a specific sign. It's the 'building block' of ASL." },
    { keywords: ["vowels"], answer: "Vowels (A, E, I, O, U) are fundamental. Try to keep your hand steady while signing them to be clearer." },
    { keywords: ["z", "letter z"], answer: "The letter Z is unique because it's a 'moving' sign—you draw the shape of a Z in the air with your index finger." },
    { keywords: ["j", "letter j"], answer: "Like Z, the letter J is a moving sign. You use your pinky finger to draw a hook shape in the air." },
    { keywords: ["dominant hand"], answer: "Your dominant hand is the one you use for most single-handed signs. If you're right-handed, use your right hand!" },
    { keywords: ["non-dominant"], answer: "The non-dominant hand acts as a 'base' or support for two-handed signs. It usually stays more still than the dominant hand." },
    { keywords: ["handshape"], answer: "A handshape is the specific form your hand takes. There are over 40 distinct handshapes used in ASL." },
    { keywords: ["location"], answer: "Where you sign matters! Signing 'Mother' on the chin vs. 'Father' on the forehead is a classic example of location changing meaning." },
    { keywords: ["movement"], answer: "Movement refers to how your hand moves during a sign. It can be a wiggle, a circle, or a sharp stroke." },
    { keywords: ["orientation"], answer: "Palm orientation is the direction your palm faces. Changing it can change the entire meaning of a sign!" },
    { keywords: ["facial expression", "face"], answer: "Facial expressions are the 'grammar' of ASL. They show if you're asking a question, being serious, or joking." },
    { keywords: ["nmm", "non-manual markers"], answer: "NMMs are movements not made with the hands, like shoulder shrugs or head tilts. They are vital for ASL grammar." },
    { keywords: ["parameter"], answer: "The 5 parameters of a sign are: Handshape, Location, Movement, Orientation, and Facial Expressions." },
    { keywords: ["sign names"], answer: "A sign name is a unique sign used to identify a person. In Deaf culture, these are usually given to you by a Deaf person." },
    { keywords: ["simple signs"], answer: "Try starting with 'Hello', 'Thank you', and 'Please'. They are easy to learn and very useful!" },
    { keywords: ["color", "colors"], answer: "Many color signs involve a specific handshape moved near the face, like 'Yellow' (Y handshape) or 'Blue' (B handshape)." },
    { keywords: ["family"], answer: "Family signs often use the same handshape but different locations (forehead for male, chin for female)." },
    { keywords: ["practice"], answer: "The best way to practice is to sign in front of a mirror or use the webcam tests in this app!" },

    // --- DEAF CULTURE (20) ---
    { keywords: ["culture", "deaf culture"], answer: "Deaf culture is the set of social beliefs, behaviors, and literary traditions of communities that are influenced by deafness." },
    { keywords: ["gallaudet"], answer: "Gallaudet University in Washington, D.C., is the world's only university designed specifically for Deaf and hard-of-hearing students." },
    { keywords: ["clerc", "laurent clerc"], answer: "Laurent Clerc was a French teacher who co-founded the first school for the Deaf in North America with Thomas Gallaudet." },
    { keywords: ["history"], answer: "ASL has roots in French Sign Language (LSF) and local signs used in communities like Martha's Vineyard in the 1800s." },
    { keywords: ["martha's vineyard"], answer: "In the 1800s, Martha's Vineyard had a high percentage of deaf residents, and everyone—deaf and hearing—spoke sign language!" },
    { keywords: ["deaf president now", "dpn"], answer: "The DPN protest in 1988 was a turning point for Deaf rights, leading to the appointment of the first Deaf president at Gallaudet." },
    { keywords: ["helen keller"], answer: "Helen Keller was a world-famous author and activist who was both deaf and blind. She learned to communicate via tactile signing." },
    { keywords: ["nyle dimarco"], answer: "Nyle DiMarco is a famous Deaf model and activist who won America's Next Top Model and Dancing with the Stars!" },
    { keywords: ["marlee matlin"], answer: "Marlee Matlin is the only Deaf performer to win an Academy Award for Best Actress (for Children of a Lesser God)." },
    { keywords: ["asl vs bsl", "british sign language"], answer: "ASL and BSL are completely different! ASL is more closely related to French Sign Language than to British Sign Language." },
    { keywords: ["universality", "universal"], answer: "No, sign language is not universal. Each country has its own unique sign language, like BSL, LSF, and Auslan." },
    { keywords: ["coda"], answer: "CODA stands for 'Child of Deaf Adult.' Many CODAs grow up bilingual in both sign language and spoken language." },
    { keywords: ["name sign"], answer: "In the Deaf community, you don't choose your own name sign. It's a gift given to you by a member of the community." },
    { keywords: ["applause", "clapping"], answer: "Deaf people 'clap' by waving both hands in the air. It's a beautiful visual way to show appreciation!" },
    { keywords: ["residential schools"], answer: "Residential schools for the deaf were historically where Deaf culture and ASL were most strongly preserved and passed down." },
    { keywords: ["oralism"], answer: "Oralism was a movement that tried to ban sign language and force deaf people to speak and lip-read. It is now widely seen as harmful." },
    { keywords: ["audism"], answer: "Audism is the discrimination or prejudice against people who are deaf or hard of hearing." },
    { keywords: ["poetry", "asl poetry"], answer: "ASL poetry is a vibrant art form that uses the rhythm of movement and space instead of sound and rhyme." },
    { keywords: ["storytelling"], answer: "Deaf storytelling often involves 'Classifier' signs to paint a vivid 3D picture of an event in the air." },
    { keywords: ["black asl", "basl"], answer: "Black ASL is a distinct dialect of ASL developed in segregated schools for the deaf in the American South." },

    // --- ETIQUETTE (20) ---
    { keywords: ["etiquette", "respect"], answer: "Respect eye contact, don't shout, and always talk directly to the Deaf person, not their interpreter." },
    { keywords: ["eye contact"], answer: "Eye contact is vital! Looking away while someone is signing is like 'closing your ears' to a hearing person." },
    { keywords: ["shouting"], answer: "Shouting doesn't help and can actually make your facial expressions look distorted or angry." },
    { keywords: ["lip reading", "lips"], answer: "Only about 30% of English can be understood through lip-reading. Don't rely on it for complex conversations!" },
    { keywords: ["interrupting"], answer: "If you need to walk between two people signing, just walk through quickly. Don't stop and wait, as that's more distracting." },
    { keywords: ["attention"], answer: "To get someone's attention, a light tap on the shoulder or a small wave is the most polite way." },
    { keywords: ["lights"], answer: "Flicking the lights on and off is a common way to get the attention of a group of Deaf people." },
    { keywords: ["vibrations"], answer: "Deaf people often use vibrations (like stomping on a wooden floor) to get attention in a room." },
    { keywords: ["interpreter"], answer: "If an interpreter is present, look at the Deaf person you are talking to, not the interpreter." },
    { keywords: ["pointing"], answer: "In ASL, pointing is not rude! It's actually a grammatical necessity used for pronouns like 'he', 'she', or 'it'." },
    { keywords: ["asking for repeat"], answer: "If you didn't understand a sign, it's perfectly fine to sign 'Again please' or 'Slow please'." },
    { keywords: ["embarrassment"], answer: "Don't be embarrassed to make mistakes! The Deaf community is generally very patient with people trying to learn ASL." },
    { keywords: ["thinking"], answer: "There is a specific sign for 'thinking' or 'let me think' (index finger to temple). Use it to show you're still engaged." },
    { keywords: ["thank you"], answer: "Signing 'Thank you' is easy: touch your fingertips to your chin and move your hand forward and down." },
    { keywords: ["sorry"], answer: "To sign 'Sorry', make an 'S' fist and rub it in a circle over your chest (heart area)." },
    { keywords: ["please"], answer: "To sign 'Please', rub your open palm in a circle over your chest." },
    { keywords: ["excuse me"], answer: "Brush the fingertips of your dominant hand across the palm of your non-dominant hand." },
    { keywords: ["meeting deaf people"], answer: "When meeting a Deaf person, it's polite to introduce yourself and mention if you are a student learning ASL." },
    { keywords: ["hearing"], answer: "The term 'Hearing' is used in the Deaf community to describe anyone who is not deaf or hard of hearing." },
    { keywords: ["hard of hearing"], answer: "This term refers to people with some hearing loss who may use both sign language and spoken language." },

    // --- APP HELP (20) ---
    { keywords: ["how to use", "webcam help"], answer: "Ensure your camera is active and you are in a well-lit room. The app will detect your hand movements automatically!" },
    { keywords: ["level 1 alphabet", "letters level"], answer: "Level 1 covers all 26 letters. Focus on keeping your hand within the webcam frame." },
    { keywords: ["level 2 numbers", "digits level"], answer: "Level 2 teaches numbers 0-9. Remember that palm orientation matters here!" },
    { keywords: ["level 3 words", "vocabulary level"], answer: "Level 3 introduces common words. Watch the demonstration videos closely for movement." },
    { keywords: ["level 4 sentences", "conversational level"], answer: "Level 4 combines everything into full sentences. Pay attention to the flow between signs." },
    { keywords: ["test mode help", "how to test"], answer: "In test mode, you'll be asked to perform signs without help. Correct signs will turn green!" },
    { keywords: ["high score", "points help"], answer: "Your score increases as you correctly perform signs in test mode. Aim for a perfect 5/5!" },
    { keywords: ["camera permissions", "browser error"], answer: "If your camera isn't working, check your browser permissions or try refreshing the page." },
    { keywords: ["lighting", "dark room"], answer: "A plain background and good lighting on your hands will make the detection much more accurate." },
    { keywords: ["hand tracking", "gesture detection"], answer: "Try to keep your hand centered in the webcam view and don't move too fast for the AI to track." },
    { keywords: ["reset level", "restart lesson"], answer: "You can always go back to the Levels page to restart a lesson or try a different one." },
    { keywords: ["profile points", "my total points"], answer: "You earn points by completing levels. Check your Profile page to see your total!" },
    { keywords: ["daily streak", "learning streak"], answer: "Come back every day to build your learning streak. Practice makes perfect!" },
    { keywords: ["sign out account", "logout user"], answer: "You can sign out from the Profile page. Your progress is saved to your account." },
    { keywords: ["login account", "sign in user"], answer: "Signing in allows you to save your progress across different devices." },
    { keywords: ["mobile app", "phone support"], answer: "Yes, this app works on mobile browsers too! Just make sure to allow camera access." },
    { keywords: ["developer info", "who built this"], answer: "This project was built using TensorFlow.js and MediaPipe for hand tracking logic." },
    { keywords: ["model accuracy", "detection quality"], answer: "The AI is highly accurate but works best when your hand is clearly visible and well-lit." },
    { keywords: ["future updates", "new levels"], answer: "We are always looking to add more levels, including advanced grammar and regional signs!" },

    // --- FUN FACTS & TRIVIA (20) ---
    { keywords: ["fun fact"], answer: "Did you know that Abraham Lincoln has a connection to Gallaudet? He signed the charter to establish the university!" },
    { keywords: ["dialect", "accent"], answer: "Just like spoken languages, ASL has regional accents. A person from New York might sign differently than someone from California." },
    { keywords: ["slang"], answer: "ASL has its own slang! For example, 'That's sick' or 'Mind-blown' have very specific, expressive signs." },
    { keywords: ["music", "song"], answer: "Deaf people enjoy music through vibrations and 'Sign-Singing', where signs are performed rhythmically to the beat." },
    { keywords: ["babies", "baby sign"], answer: "Babies can often learn to sign simple words like 'Milk' or 'More' before they can even speak!" },
    { keywords: ["brain"], answer: "Learning sign language uses the same parts of the brain as spoken language, plus the visual-spatial processing centers!" },
    { keywords: ["islet"], answer: "Sign language can be used under water! Scuba divers often use modified versions of sign language to communicate." },
    { keywords: ["space"], answer: "Astronauts have used sign language to communicate through windows in space stations!" },
    { keywords: ["monkeys", "apes"], answer: "Some chimpanzees and gorillas, like Koko, have been taught hundreds of signs to communicate with humans." },
    { keywords: ["left handed"], answer: "If you're left-handed, just use your left hand as your dominant hand. It's perfectly fine!" },
    { keywords: ["glasses"], answer: "Some people sign a bit lower if they wear glasses to avoid hitting them, but it doesn't change the meaning." },
    { keywords: ["nails", "nail polish"], answer: "Flashy nail polish can sometimes be distracting for people reading your signs, but it's not 'against the rules'!" },
    { keywords: ["facial hair"], answer: "Mustaches and beards are fine, but they can sometimes make lip-reading a bit harder for those who use it." },
    { keywords: ["distance"], answer: "You can sign to someone across a crowded room or even through a window where sound wouldn't travel!" },
    { keywords: ["silence"], answer: "ASL allows for complex communication in places where you have to be silent, like a library or a movie theater." },
    { keywords: ["multilingual"], answer: "Learning ASL makes it easier to learn other sign languages like LSF or Auslan because you're already used to visual thinking." },
    { keywords: ["expression"], answer: "ASL is often more expressive than spoken language because it uses your whole body to convey emotion." },
    { keywords: ["speed"], answer: "Experienced signers can communicate just as fast—if not faster—than people speaking English!" },
    { keywords: ["movies"], answer: "The movie 'CODA' won the Oscar for Best Picture in 2022, bringing a lot of attention to the Deaf community." },
    { keywords: ["app goal"], answer: "Our goal is to reach 100% literacy in basic sign language for all students. Keep practicing!" }
];

const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");
const suggestionsBox = document.getElementById("suggestions-box");

// Expanded suggestions to showcase the 100+ questions
const allSuggestions = [
    "Tell me a fun fact", 
    "History of ASL", 
    "How to use webcam?", 
    "Alphabet tips", 
    "Etiquette",
    "Famous Deaf people",
    "ASL vs BSL",
    "What is a Sign Name?",
    "Fingerspelling help",
    "Deaf President Now",
    "Gallaudet University",
    "What is Audism?",
    "Can you sign under water?",
    "ASL in space",
    "Do monkeys use ASL?",
    "Black ASL history",
    "Helen Keller",
    "Lip reading accuracy",
    "How to get attention?",
    "Why pointing isn't rude",
    "Sign for 'Thank you'",
    "Sign for 'Sorry'",
    "What is a CODA?",
    "ASL accents",
    "Numbers 1-5 palm rule"
];

function initSuggestions() {
    suggestionsBox.innerHTML = '';
    // Pick 8 random suggestions to show
    const shuffled = allSuggestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 8);

    selected.forEach(s => {
        const chip = document.createElement("div");
        chip.className = "suggestion-chip";
        chip.textContent = s;
        chip.onclick = () => {
            userInput.value = s;
            handleSendMessage();
        };
        suggestionsBox.appendChild(chip);
    });
}

function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * NLP UTILITIES
 */
const stopWords = ["a", "about", "actually", "almost", "also", "although", "always", "am", "an", "and", "any", "are", "as", "at", "be", "became", "become", "but", "by", "can", "could", "did", "do", "does", "each", "either", "else", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "i", "if", "in", "is", "it", "its", "just", "may", "me", "might", "mine", "must", "my", "mine", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "tell", "me", "about", "please"];

/**
 * Basic Levenshtein distance for fuzzy matching typos
 */
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
            }
        }
    }
    return matrix[b.length][a.length];
}

/**
 * NLP Processor Class
 */
class NLPProcessor {
    static tokenize(text) {
        return text.toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .split(/\s+/)
            .filter(word => word.length > 2 && !stopWords.includes(word));
    }

    static getSimilarity(word1, word2) {
        if (word1 === word2) return 1.0;
        const distance = levenshteinDistance(word1, word2);
        const maxLength = Math.max(word1.length, word2.length);
        return (maxLength - distance) / maxLength;
    }

    static findBestAnswer(query) {
        const queryTokens = this.tokenize(query);
        if (queryTokens.length === 0) return null;

        let bestScore = 0;
        let bestAnswer = null;

        qaDatabase.forEach(item => {
            let itemScore = 0;
            const lowerQuery = query.toLowerCase();
            
            // Check for exact phrase matches (High Priority)
            item.keywords.forEach(keyword => {
                if (lowerQuery.includes(keyword.toLowerCase())) {
                    itemScore += 10; // Massive bonus for phrase match
                }

                const keywordTokens = keyword.toLowerCase().split(/\s+/);
                
                // Compare every query token against every keyword token
                queryTokens.forEach(qToken => {
                    keywordTokens.forEach(kToken => {
                        const sim = this.getSimilarity(qToken, kToken);
                        if (sim > 0.85) { 
                            itemScore += sim * 3; 
                        } else if (kToken.includes(qToken) || qToken.includes(kToken)) {
                            itemScore += 0.5;
                        }
                    });
                });
            });

            if (itemScore > bestScore) {
                bestScore = itemScore;
                bestAnswer = item.answer;
            }
        });

        return bestScore > 0.4 ? bestAnswer : null;
    }
}

async function handleSendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    userInput.value = "";

    typingIndicator.classList.remove("hidden");
    chatMessages.scrollTop = chatMessages.scrollHeight;

    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));

    typingIndicator.classList.add("hidden");
    const answer = NLPProcessor.findBestAnswer(text);
    
    if (answer) {
        appendMessage(answer, "bot");
    } else {
        appendMessage("I'm not exactly sure what you mean, but I'm learning! You can ask me about ASL history, etiquette, or how the webcam levels work.", "bot");
    }
}

chatForm.onsubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
};

document.addEventListener("DOMContentLoaded", () => {
    initSuggestions();
});
