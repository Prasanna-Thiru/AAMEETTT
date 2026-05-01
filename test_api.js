const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/admissions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, body));
});

req.on('error', (e) => console.error('Error:', e.message));

req.write(JSON.stringify({
  parentName: "John Doe",
  studentName: "Jane Doe",
  classApplying: "Grade 1",
  schoolingType: "Day Scholar",
  contactNumber: "9876543210",
  email: "john.doe@example.com",
  message: "I need admission."
}));
req.end();
