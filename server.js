const app = require('./src/app');
const path = require('path');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('=================================');
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📁 File uploads directory: ${path.resolve('uploads')}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}`);
  console.log('=================================');
});
