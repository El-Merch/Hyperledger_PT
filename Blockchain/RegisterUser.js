import FabricCAServices from 'fabric-ca-client';
import { Wallets } from 'fabric-network';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async () => {
    try {
        // 1. Cargar configuración de conexión
        const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // 2. Configurar CA Client
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { 
            trustedRoots: caTLSCACerts,
            verify: false 
        }, caInfo.caName);

        // 3. Configurar wallet
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // 4. Verificar si el usuario ya existe
        const userIdentity = await wallet.get('appUser');
        if (userIdentity) {
            console.log('El usuario "appUser" ya está registrado.');
            return;
        }

        // 5. Verificar si el admin existe
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.error('El administrador no está registrado en la wallet.');
            console.error('Primero ejecuta el script enrollAdmin.js');
            return;
        }

        // 6. Registrar nuevo usuario
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: 'appUser',
            role: 'client'
        }, adminUser);

        // 7. Matricular al nuevo usuario
        const enrollment = await ca.enroll({
            enrollmentID: 'appUser',
            enrollmentSecret: secret
        });

        // 8. Crear identidad y guardar en wallet
        const identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };

        await wallet.put('appUser', identity);
        console.log('Usuario "appUser" registrado exitosamente en la wallet');
        
    } catch (error) {
        console.error(`Error en el registro del usuario: ${error}`);
        if (error.stack) {
            console.error(error.stack);
        }
    }
};

main();