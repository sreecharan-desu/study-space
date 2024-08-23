import express, { Application, Request, Response, NextFunction } from 'express';
import { PORT_NO } from './constants';
import cors from 'cors';
import { mainRoute } from './routes/mainRoute';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', mainRoute);

app.listen(PORT_NO, () => console.log(`Server is listening on port ${PORT_NO}...`));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error occurred: ${err.message}`);
    res.status(500).json({ message: "Something went wrong, Charan!" });
});
