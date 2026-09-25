import "dotenv/config";
import cloudinary from 'cloudinary';
const { v2 } = cloudinary;

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


// v2.ready
//   .then(() => console.log('Cloudinary: Connected via ESM'))
//   .catch(err => console.error('Bod connection for Cloudinary:', err));

export default v2;