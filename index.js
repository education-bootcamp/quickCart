const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT | 3000;

const BookmarkRoute = require('./route/BookmarkRoute');
const CartRoute = require('./route/CartRoute');
const CategoryRoute = require('./route/CategoryRoute');
const DealRoute = require('./route/DealRoute');
const OrderRoute = require('./route/OrderRoute');
const PaymentMethodRoute = require('./route/PaymentMethodRoute');
const PaymentRoute = require('./route/PaymentRoute');
const ProductRoute = require('./route/ProductRoute');
const RefundRoute = require('./route/RefundRoute');
const ReviewRoute = require('./route/ReviewRoute');
const RoleRoute = require('./route/RoleRoute');
const UserRoute = require('./route/UserRoute');
const VoucherDetailsRoute = require('./route/VoucherDetailsRoute');
const VoucherRoute = require('./route/VoucherRoute');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/quick_cart_db').then(()=>{
    console.log('database connected!')
}).catch((e)=>{
    console.log(e);
})

app.use('/api/v1/bookmarks',BookmarkRoute);
app.use('/api/v1/bookmarks',CartRoute);
app.use('/api/v1/bookmarks',CategoryRoute);
app.use('/api/v1/bookmarks',DealRoute);
app.use('/api/v1/bookmarks',OrderRoute);
app.use('/api/v1/bookmarks',PaymentMethodRoute);
app.use('/api/v1/bookmarks',PaymentRoute);
app.use('/api/v1/bookmarks',ProductRoute);
app.use('/api/v1/bookmarks',RefundRoute);
app.use('/api/v1/bookmarks',ReviewRoute);
app.use('/api/v1/roles',RoleRoute);
app.use('/api/v1/users',UserRoute);
app.use('/api/v1/bookmarks',VoucherDetailsRoute);
app.use('/api/v1/bookmarks',VoucherRoute);

app.listen(PORT, ()=>{
    console.log(`server up & running on port ${PORT}`);
})