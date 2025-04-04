import { FabricCAServices } from 'fabric-ca-client';
import { Wallets } from 'fabric-network';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const main = async () => {
    try {
        const ccpPath = path.resolve(__dirname, '../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const ca = new FabricCAServices(caInfo.url);

        const wallet = await Wallets.newFileSystemWallet('./wallet');

        const adminIdentity = await wallet.get('admin');
        if (adminIdentity) {
            console.log('El administrador ya está registrado.');
            return;
        }

        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: process.env.ADMIN_PASSWORD });
        const identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };

        await wallet.put('admin', identity);
        console.log('El administrador se ha registrado correctamente.');
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

main();
