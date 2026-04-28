const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

dotenv.config();

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

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
