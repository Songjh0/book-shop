// const express = require('express');
import express from 'express';
const app = express();

// const dotenv = require('dotenv');
import dotenv from 'dotenv';
dotenv.config();

//유의미한 포트 번호 지정
app.listen(process.env.PORT);

//users 파일 어떻게 실행시키는지
//그 의미가 무엇이더라
// const userRouter = require('./routes/users');
import userRouter from './routes/users.js';
import bookRouter from './routes/books.js';
import orderRouter from './routes/orders.js';
import likeRouter from './routes/likes.js';
import cartRouter from './routes/carts.js';

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/orders', orderRouter);
app.use('/likes', likeRouter);
app.use('/carts', cartRouter);