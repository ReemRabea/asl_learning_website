const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const db = require('./db');

dotenv.config();

// --- Gemini Setup ---
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const QA_CONTEXT = `
You are Gio, a friendly and knowledgeable ASL (American Sign Language) assistant built into an ASL learning web app.
Your job is to answer questions about ASL, Deaf culture, sign language etiquette, and how to use this app.

Here is your knowledge base. If the user's question is clearly answered by one of these entries, return that exact answer (you may rephrase it slightly to sound natural):

- Alphabet/Letters: "The ASL alphabet consists of 26 handshapes, one for each letter of the English alphabet. Most are signed with one hand!"
- Numbers/Count: "In ASL, numbers 1-5 are usually signed with the palm facing towards you, while 6-10 face away. It's a common mistake for beginners!"
- Fingerspelling: "Fingerspelling is used for names, places, and words that don't have a specific sign. It's the 'building block' of ASL."
- Vowels: "Vowels (A, E, I, O, U) are fundamental. Try to keep your hand steady while signing them to be clearer."
- Letter Z: "The letter Z is unique because it's a 'moving' sign — you draw the shape of a Z in the air with your index finger."
- Letter J: "Like Z, the letter J is a moving sign. You use your pinky finger to draw a hook shape in the air."
- Dominant hand: "Your dominant hand is the one you use for most single-handed signs. If you're right-handed, use your right hand!"
- Non-dominant hand: "The non-dominant hand acts as a 'base' or support for two-handed signs. It usually stays more still."
- Handshape: "A handshape is the specific form your hand takes. There are over 40 distinct handshapes used in ASL."
- Location: "Where you sign matters! Signing 'Mother' on the chin vs. 'Father' on the forehead is a classic example of location changing meaning."
- Movement: "Movement refers to how your hand moves during a sign. It can be a wiggle, a circle, or a sharp stroke."
- Orientation: "Palm orientation is the direction your palm faces. Changing it can change the entire meaning of a sign!"
- Facial expressions: "Facial expressions are the 'grammar' of ASL. They show if you're asking a question, being serious, or joking."
- NMMs / Non-manual markers: "NMMs are movements not made with the hands, like shoulder shrugs or head tilts. They are vital for ASL grammar."
- Parameters: "The 5 parameters of a sign are: Handshape, Location, Movement, Orientation, and Facial Expressions."
- Sign names: "A sign name is a unique sign used to identify a person. In Deaf culture, these are usually given to you by a Deaf person."
- Colors: "Many color signs involve a specific handshape moved near the face, like 'Yellow' (Y handshape) or 'Blue' (B handshape)."
- Family signs: "Family signs often use the same handshape but different locations (forehead for male, chin for female)."
- Practice: "The best way to practice is to sign in front of a mirror or use the webcam tests in this app!"
- Deaf culture: "Deaf culture is the set of social beliefs, behaviors, and literary traditions of communities influenced by deafness."
- Gallaudet: "Gallaudet University in Washington, D.C., is the world's only university designed specifically for Deaf and hard-of-hearing students."
- Laurent Clerc: "Laurent Clerc was a French teacher who co-founded the first school for the Deaf in North America with Thomas Gallaudet."
- History: "ASL has roots in French Sign Language (LSF) and local signs used in communities like Martha's Vineyard in the 1800s."
- Martha's Vineyard: "In the 1800s, Martha's Vineyard had a high percentage of deaf residents, and everyone — deaf and hearing — spoke sign language!"
- Deaf President Now (DPN): "The DPN protest in 1988 was a turning point for Deaf rights, leading to the appointment of the first Deaf president at Gallaudet."
- Helen Keller: "Helen Keller was a world-famous author and activist who was both deaf and blind. She learned to communicate via tactile signing."
- Nyle DiMarco: "Nyle DiMarco is a famous Deaf model and activist who won America's Next Top Model and Dancing with the Stars!"
- Marlee Matlin: "Marlee Matlin is the only Deaf performer to win an Academy Award for Best Actress (for Children of a Lesser God)."
- ASL vs BSL: "ASL and BSL are completely different! ASL is more closely related to French Sign Language than to British Sign Language."
- Universal sign language: "No, sign language is not universal. Each country has its own unique sign language, like BSL, LSF, and Auslan."
- CODA: "CODA stands for 'Child of Deaf Adult.' Many CODAs grow up bilingual in both sign language and spoken language."
- Name sign: "In the Deaf community, you don't choose your own name sign. It's a gift given to you by a member of the community."
- Deaf applause: "Deaf people 'clap' by waving both hands in the air. It's a beautiful visual way to show appreciation!"
- Residential schools: "Residential schools for the deaf were historically where Deaf culture and ASL were most strongly preserved and passed down."
- Oralism: "Oralism was a movement that tried to ban sign language and force deaf people to speak and lip-read. It is now widely seen as harmful."
- Audism: "Audism is the discrimination or prejudice against people who are deaf or hard of hearing."
- ASL poetry: "ASL poetry is a vibrant art form that uses the rhythm of movement and space instead of sound and rhyme."
- Black ASL (BASL): "Black ASL is a distinct dialect of ASL developed in segregated schools for the deaf in the American South."
- Etiquette/Respect: "Respect eye contact, don't shout, and always talk directly to the Deaf person, not their interpreter."
- Eye contact: "Eye contact is vital! Looking away while someone is signing is like 'closing your ears' to a hearing person."
- Lip reading: "Only about 30% of English can be understood through lip-reading. Don't rely on it for complex conversations!"
- Pointing: "In ASL, pointing is not rude! It's actually a grammatical necessity used for pronouns like 'he', 'she', or 'it'."
- Thank you sign: "Signing 'Thank you' is easy: touch your fingertips to your chin and move your hand forward and down."
- Sorry sign: "To sign 'Sorry', make an 'S' fist and rub it in a circle over your chest (heart area)."
- Please sign: "To sign 'Please', rub your open palm in a circle over your chest."
- Excuse me sign: "Brush the fingertips of your dominant hand across the palm of your non-dominant hand."
- Hearing (term): "The term 'Hearing' is used in the Deaf community to describe anyone who is not deaf or hard of hearing."
- Hard of hearing: "This term refers to people with some hearing loss who may use both sign language and spoken language."
- Webcam help: "Ensure your camera is active and you are in a well-lit room. The app will detect your hand movements automatically!"
- Level 1: "Level 1 covers all 26 letters. Focus on keeping your hand within the webcam frame."
- Level 2: "Level 2 teaches numbers 0-9. Remember that palm orientation matters here!"
- Level 3: "Level 3 introduces common words. Watch the demonstration videos closely for movement."
- Level 4: "Level 4 combines everything into full sentences. Pay attention to the flow between signs."
- Test mode: "In test mode, you'll be asked to perform signs without help. Correct signs will turn green!"
- Points/Score: "Your score increases as you correctly perform signs in test mode. Aim for a perfect 5/5!"
- Camera permissions: "If your camera isn't working, check your browser permissions or try refreshing the page."
- Lighting tips: "A plain background and good lighting on your hands will make the detection much more accurate."
- Hand tracking: "Try to keep your hand centered in the webcam view and don't move too fast for the AI to track."
- Mobile support: "Yes, this app works on mobile browsers too! Just make sure to allow camera access."
- Fun fact: "Did you know that Abraham Lincoln has a connection to Gallaudet? He signed the charter to establish the university!"
- Babies signing: "Babies can often learn to sign simple words like 'Milk' or 'More' before they can even speak!"
- CODA movie: "The movie 'CODA' won the Oscar for Best Picture in 2022, bringing a lot of attention to the Deaf community."

Rules you MUST follow:
1. If the user greets you (hi, hello, hey) or thanks you, respond warmly and conversationally — do NOT treat it as a sign definition query.
2. If the question matches something in the knowledge base above, return that answer (you may rephrase slightly to sound natural).
3. If the question is about ASL, Deaf culture, sign language, or this app but NOT in the knowledge base, answer helpfully and accurately.
4. If the question has NOTHING to do with ASL, Deaf culture, sign language, or this app, respond with: "I'm only able to help with ASL and Deaf culture topics! Feel free to ask me anything about signing, Deaf history, or how to use this app. 😊"
5. Keep answers concise — 1 to 3 sentences max unless the topic truly requires more.
6. Never make up signs or invent facts about Deaf culture.
`;


const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

app.use(cors());
app.use(express.json());

// --- Middleware: Verify Token ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// --- Auth Routes ---

// Signup
app.post('/api/auth/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (fullName, email, passwordHash) VALUES (?, ?, ?)`;
        
        db.run(query, [fullName, email, passwordHash], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                return res.status(500).json({ message: 'Database error', error: err.message });
            }
            
            const userId = this.lastID;
            // Initialize progress for the new user
            db.run(`INSERT INTO progress (user_id) VALUES (?)`, [userId]);
            
            res.status(201).json({ message: 'User created successfully', userId });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], async (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, fullName: user.fullName, email: user.email, joinedDate: user.joinedDate }
        });
    });
});

// --- Progress Routes ---

// Get User Progress
app.get('/api/progress', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const query = `SELECT * FROM progress WHERE user_id = ?`;
    
    db.get(query, [userId], (err, progress) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json(progress || {});
    });
});

// Update User Progress
app.put('/api/progress', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { total_points, current_streak, level1_completed, level2_completed, level3_completed, level4_completed } = req.body;

    const query = `
        UPDATE progress SET 
            total_points = total_points + COALESCE(?, 0),
            current_streak = COALESCE(?, current_streak),
            level1_completed = COALESCE(?, level1_completed),
            level2_completed = COALESCE(?, level2_completed),
            level3_completed = COALESCE(?, level3_completed),
            level4_completed = COALESCE(?, level4_completed),
            last_activity_date = CURRENT_TIMESTAMP
        WHERE user_id = ?
    `;

    db.run(query, [total_points, current_streak, level1_completed, level2_completed, level3_completed, level4_completed, userId], function(err) {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json({ message: 'Progress updated successfully' });
    });
});

// --- Chatbot Route ---
app.post('/api/chatbot', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    try {
        // Use OpenRouter free LLM API
        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'google/gemma-4-31b-it:free',
                messages: [
                    { role: 'system', content: QA_CONTEXT },
                    { role: 'user', content: message },
                ],
                temperature: 0.7,
            }),
        });
        if (!openRouterResponse.ok) {
            throw new Error(`OpenRouter error: ${openRouterResponse.statusText}`);
        }
        const openRouterData = await openRouterResponse.json();
        const reply = openRouterData.choices?.[0]?.message?.content?.trim() ||
            "I couldn't generate a response right now. Please try again later.";
        res.json({ reply });
    } catch (err) {
        console.error('LLM error:', err.message);
        // Return null so frontend can use its fallback logic
        res.json({ reply: null });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
