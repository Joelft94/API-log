import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;

export const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    console.log(`Received API Key: ${apiKey}`)
    console.log(`Expected API Key: ${API_KEY}`)
    
    if (apiKey && apiKey === API_KEY){
        next();
    } else {
        console.log('Unauthorized access attempt');
        res.status(401).json({message: 'Unauthorized'});
    }
    
}

