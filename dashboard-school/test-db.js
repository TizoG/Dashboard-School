import pkg from 'pg';
const { Client } = pkg;

const connectionString = 'postgresql://postgres:mhPrirFRgElUBCjBBAXCVkTkYpOGqaVY@centerbeam.proxy.rlwy.net:55490/railway';

const client = new Client({
    connectionString,
});

async function testConnection() {
    try {
        await client.connect();
        console.log('Conexión exitosa a la base de datos!');
        await client.end();
    } catch (error) {
        console.error('Error conectando a la base de datos:', error.message);
    }
}

testConnection();
