// dns-test.cjs
const dns = require('dns');

dns.resolveTxt('cluster0.wpp53sj.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('DNS TXT lookup failed:', err);
  } else {
    console.log('DNS TXT records:', addresses);
  }
});
