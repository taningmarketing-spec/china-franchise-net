const http = require('http');

const req = http.get('http://localhost:3000/api/brands?hot=true', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const d = JSON.parse(data);
      console.log('total:', d.total);
      if (d.brands) d.brands.forEach(b => console.log(b.name, '|', b.slug, '| isHot:', b.isHot));
    } catch (e) {
      console.log('raw:', data.substring(0, 500));
    }
  });
});

req.on('error', e => console.error('Error:', e.message));
