const express = require('express');
const app = express();
const adminRoutes = require('./routes/adminRoutes');
const companyRoutes = require('./routes/companyRoutes');
require('dotenv').config();

app.use(express.json());


app.use('/api/admin', adminRoutes);
app.use('/api/companies', companyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
