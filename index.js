const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

require('dotenv').config();
const token = process.env.API_KEY;

const apiCall = axios.create({
  baseURL: 'https://api.etherscan.io'
});

app.get('/', (req, res) => {
  res.send('Welcome to EC-20 tokens endpoint')
});

app.get('/:ERC20Address/:tokenHolderAddress', (req, res) => {
  const ERC20Address = req.params.ERC20Address;
  const tokenHolderAddress = req.params.tokenHolderAddress;
  const fetchTokens = function() {
    apiCall.get('/api?module=account', {
      params: {
        action: 'tokenbalance',
        contractaddress: ERC20Address,
        address: tokenHolderAddress,
        tag: 'latest',
        apikey: token
      }
    })
    .then(response => res.send(`The user has ${response.data.result} tokens`))
    .catch(err => console.log(err))
  }
  fetchTokens();
})

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`)
});