const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let windowState = [];

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

async function fetchNumbers(numberId) {
    const urls = {
        p: 'http://20.244.56.144/test/primes',
        f: 'http://20.244.56.144/test/fibo',
        e: 'http://20.244.56.144/test/even',
        r: 'http://20.244.56.144/test/rand'
    };

    const url = urls[numberId];
    if (!url) {
        console.error('Invalid numberId:', numberId);
        return [];
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzQwNjU2LCJpYXQiOjE3MjQ3NDAzNTYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQwZTdkMzNkLWE5Y2ItNDIwOC04YmQ5LWMzNjNkODZmOTk4OCIsInN1YiI6InNrb2trb25kQGdpdGFtLmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI0MGU3ZDMzZC1hOWNiLTQyMDgtOGJkOS1jMzYzZDg2Zjk5ODgiLCJjbGllbnRTZWNyZXQiOiJ1VkJVbk1NSkdmWnRKallKIiwib3duZXJOYW1lIjoiU2FpIFByYW5hdiBLb2trb25kYSIsIm93bmVyRW1haWwiOiJza29ra29uZEBnaXRhbS5pbiIsInJvbGxObyI6IkhVMjFDU0VOMDEwMDUyNCJ9.ocKXcO6QEKHBq1USsq8mmFTI0K1aQVf3qsDAJEc1Er4`
            },
            timeout: 2000
        });
        return response.data.numbers || [];
    } catch (error) {
        console.error('Error fetching numbers from', url, ':', error.message);
        return [];
    }
}

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    const numbers = await fetchNumbers(numberid);

    const windowPrevState = windowState;
    if (numbers.length > WINDOW_SIZE) {
        windowState = numbers.slice(-WINDOW_SIZE);
    } else {
        windowState = numbers;
    }

    const avg = windowState.length > 0
        ? (windowState.reduce((sum, num) => sum + num, 0) / windowState.length).toFixed(2)
        : '0.00';

    res.send({
        numbers,
        windowPrevState,
        windowCurrState: windowState,
        avg
    });
});
