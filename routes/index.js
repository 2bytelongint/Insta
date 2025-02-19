import express from 'express';
import v1Routes from './v1/index.js';
const route = express.Router();

route.use('/v1', v1Routes);

export default route;