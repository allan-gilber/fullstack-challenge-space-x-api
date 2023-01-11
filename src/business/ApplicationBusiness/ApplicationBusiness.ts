import express from 'express';
import cors from 'cors';

const ApplicationBusiness = express();

ApplicationBusiness.use(express.json());
ApplicationBusiness.use(cors());

ApplicationBusiness.listen(process.env.PORT || 3003, () => {
  console.clear();
  console.log(`Server is running in http://localhost:${process.env.PORT || 3003}`);
});

export default ApplicationBusiness;