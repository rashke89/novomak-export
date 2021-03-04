import dotenv from 'dotenv';

dotenv.config();

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
const serverPort = 9000;

export default {
  serverPort,
  mongooseOptions,
  PORT: process.env.PORT || 5000,
  MONGODB_URL: () => {
    console.log('this is the PROCESS... --->>>', process);
    return     'mongodb://novomak:novomak2020@cluster0-shard-00-00.ivtbn.mongodb.net:27017,cluster0-shard-00-01.ivtbn.mongodb.net:27017,cluster0-shard-00-02.ivtbn.mongodb.net:27017/amazona?ssl=true&replicaSet=atlas-qbj3mx-shard-0&authSource=admin&retryWrites=true&w=majority'

    // 'mongodb://novomak:novomak2020@cluster0-shard-00-00.ivtbn.mongodb.net:27017,cluster0-shard-00-01.ivtbn.mongodb.net:27017,cluster0-shard-00-02.ivtbn.mongodb.net:27017/amazona?ssl=true&replicaSet=atlas-qbj3mx-shard-0&authSource=admin&retryWrites=true&w=majority'

        // if (process.env.MONGODB_URL) {
    //   return process.env.MONGODB_URL;
    // } else {
    //   return 'mongodb://localhost/amazona'
    // }
  },
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
