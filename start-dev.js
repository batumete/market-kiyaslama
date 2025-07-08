const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Static files
app.use(express.static(path.join(__dirname, 'client/dist')));

// API routes placeholder
app.get('/api/test', (req, res) => {
  res.json({ message: 'API çalışıyor' });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});