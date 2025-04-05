import { Gateway, Wallets } from 'fabric-network';
import path from 'path';
import fs from 'fs';
import pg from 'pg';  // Cambio en la importación
import { fileURLToPath } from 'url';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extraer Client del módulo pg
const { Client } = pg;

const main = async () => {
    try {
        // Conexión a la base de datos PostgreSQL
        const db = new Client({
            host: 'host.docker.internal',
            user: 'test_admin',  // Reemplaza con tu usuario de PostgreSQL
            password: 'admin',  // Reemplaza con tu contraseña de PostgreSQL
            database: 'postgres',  // Nombre de la base de datos
            port: 5432,  // Puerto de PostgreSQL
        });

        await db.connect();  // Conexión a PostgreSQL

        console.log('Conexión a la base de datos PostgreSQL exitosa.');

        // Configuración de Hyperledger Fabric
        const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const wallet = await Wallets.newFileSystemWallet('./wallet');

        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'appUser',
            discovery: { enabled: true, asLocalhost: true },
        });

        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('basic');

        console.log('Conectado a la red de Hyperledger Fabric.');

        // Recuperar datos de la base de datos PostgreSQL desde la tabla 'pedidos'
        const res = await db.query('SELECT id, pdf_hash FROM pedidos WHERE pdf_hash IS NOT NULL;');
        const orders = res.rows;  // Los resultados estarán en 'rows'

        // Subir solo id y pdf_hash al ledger
        for (const order of orders) {
            try {
                console.log(`Subiendo pedido con ID: ${order.id}`);
                await contract.submitTransaction(
                    'CreateOrder',  // Nombre de la función en el contrato
                    `order${order.id}`,  // ID del pedido (prefijado con 'order')
                    `${order.pdf_hash}`  // Guardamos solo el pdf_hash
                );
                console.log(`Pedido ${order.id} subido exitosamente.`);
            } catch (err) {
                console.error(`Error subiendo el pedido ${order.id}: ${err.message}`);
            }
        }

        console.log('Todos los pedidos han sido subidos al ledger.');

        await gateway.disconnect();
        await db.end();  // Cerrar la conexión de PostgreSQL
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

main();