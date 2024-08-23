import { Router } from 'express';
import { userRoute } from './user/user';

export const mainRoute: Router = Router();

mainRoute.use('/user', userRoute);
