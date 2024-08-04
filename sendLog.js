import axios from 'axios';
import moment from 'moment';

const serviceNames = ['Service1', 'Service2', 'Service3', 'Service4', 'Service5'];

const logLevels = ['info', 'error', 'debug'];

const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const generateRandomLog = () => {
    
    const timestamp = moment().toISOString();
    const serviceName = getRandomItem(serviceNames);
    const logLevel = getRandomItem(logLevels);
    const message = `This is a ${logLevel} message from ${serviceName}`;
    
    return {timestamp,service_name: serviceName, log_level: logLevel, message}; 
};

const sendLog = async (log) => {
    try {
        await axios.post('http://localhost:3000/logs', log, {  //axios.post(url, data, config) estos son los parametros de axios.post
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log('Log sent successfully', log);
    } catch (error){
        console.error('Error sending log', error);
    }
};

sendLog(generateRandomLog());

/* setInterval(() => {
    const log = generateRandomLog();
    sendLog(log);
  }, 5000); */