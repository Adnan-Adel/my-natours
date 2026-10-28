const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env', quiet: true });

const app = require('./app');

// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
// );

const DB = process.env.DATABASE_LOCAL;

const port = process.env.port || 3000;

async function startServer() {
    await mongoose.connect(DB);
    console.log('DB connection successfully!');
    app.listen(port, () => {
        console.log(`app running on port ${port}...`);
    });
}

startServer().catch((err) => {
    console.log('failed to start app: ', err);
    process.exit(1);
});
