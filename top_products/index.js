const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;

    // Build the request URL to fetch products
    const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products/top-10?minPrice=1&maxPrice=1000`;

    try {
        console.log('Fetching data from URL:', url); // Debugging line

        const response = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzM5MzIxLCJpYXQiOjE3MjQ3MzkwMjEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQwZTdkMzNkLWE5Y2ItNDIwOC04YmQ5LWMzNjNkODZmOTk4OCIsInN1YiI6InNrb2trb25kQGdpdGFtLmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI0MGU3ZDMzZC1hOWNiLTQyMDgtOGJkOS1jMzYzZDg2Zjk5ODgiLCJjbGllbnRTZWNyZXQiOiJ1VkJVbk1NSkdmWnRKallKIiwib3duZXJOYW1lIjoiU2FpIFByYW5hdiBLb2trb25kYSIsIm93bmVyRW1haWwiOiJza29ra29uZEBnaXRhbS5pbiIsInJvbGxObyI6IkhVMjFDU0VOMDEwMDUyNCJ9.VqGlxc23k4-NincCTFoG7T1XRH_WPUAizDU0a3WONts'
            }
        });
        const products = response.data.products || [];

        console.log('Fetched products:', products); // Debugging line

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});
