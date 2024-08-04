import pg from 'pg'

const {Pool} = pg

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'APILogs',
    password: 'postgres123',
    port: 5432,
});

export default pool;


