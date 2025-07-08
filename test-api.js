const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/products',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Length:', data.length);
    console.log('Response:', data.substring(0, 200));
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

req.end();

// Test markets endpoint too
setTimeout(() => {
  const marketOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/markets',
    method: 'GET'
  };
  
  const marketReq = http.request(marketOptions, (res) => {
    console.log('\nMarkets Status Code:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Markets Response:', data);
    });
  });
  
  marketReq.on('error', (e) => {
    console.error('Markets Request error:', e.message);
  });
  
  marketReq.end();
}, 1000);