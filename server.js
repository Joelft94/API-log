import express from "express";
import bodyParser from "body-parser";
import pool from "./db.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Recibimos logs
app.post('/logs', async (req, res) => {
    const { timestamp, service_name,log_level, message} = req.body; //deconstruimos el body para no usar req.body.timestamp, req.body.service_name, etc
    try {
        await pool.query('INSERT INTO logs (timestamp, service_name, log_level, message) VALUES ($1, $2, $3, $4)', [timestamp, service_name, log_level, message]);
        res.json({message: 'Log created'});
    } catch (error) {
        res.status(500).json('Error creating log');
    }

});


// Obtenemos logs
app.get('/logs', async (req, res) => {
    const {startDate, endDate, serviceName } = req.query;
    let query = 'SELECT * FROM logs WHERE 1=1';
    let params = []; //para evitar sql injection

    if (startDate){
        const parsedStartDate = moment(startDate, 'DD-MM-YYYY').startOf('day').toISOString(); //startof('day') para que la fecha sea a las 00:00:00m, toISOString() para que la fecha sea en formato ISO
        params.push(parsedStartDate);
        query += ` AND timestamp >= $${params.length}`;
    } //si el usuario pasa un parametro StartDate convertimos la fecha a formato ISO y la agregamos al query
    if (endDate){
        const parsedEndDate = moment(endDate, 'DD-MM-YYYY').endOf('day').toISOString(); //endof('day') para que la fecha sea a las 23:59:59m
        params.push(parsedEndDate);
        query += ` AND timestamp <= $${params.length}`;
    } //si el usuario pasa un parametro EndDate convertimos la fecha a formato ISO y la agregamos al query

    if (serviceName){
        params.push(serviceName);
        query += ` AND service_name = $${params.length}`;
    } //si el usuario pasa un parametro ServiceName lo agregamos al query

    try {
        const result = await pool.query(query, params);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error querying logs');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });

