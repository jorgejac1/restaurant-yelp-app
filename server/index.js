if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
  } else {
    require('dotenv').config({ path: '.env.production' });
  }
  
  const express = require('express');
  const axios = require('axios');
  const cors = require('cors');
  
  const app = express();
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 3001;
  const API_KEY = process.env.YELP_API_KEY;
  
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
  }));
  
  app.get('/restaurants', async (req, res) => {
    try {
      const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: { location: 'San Jose, CA 95127', term: 'restaurants' }
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data from Yelp:', error);
      res.status(500).send('Server error');
    }
  });
  
  app.listen(port, () => {
    const protocol = process.env.PROTOCOL || 'http';
    console.log(`Server listening at ${protocol}://${host}:${port}`);
  });
  