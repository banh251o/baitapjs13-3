const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/baitap'; // Thay "mydatabase" bằng tên DB của bạn

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Kết nối MongoDB thành công!'))
.catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

module.exports = mongoose;
