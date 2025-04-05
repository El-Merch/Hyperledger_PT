/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {
    // Modificamos esta función para que solo guarde el id y el pdf_hash
    async CreateOrder(ctx, orderId, pdfHash) {
        const order = {
            ID: orderId,
            PdfHash: pdfHash,
            docType: 'order',
        };

        // Guardamos el pedido en la blockchain con solo el id y pdf_hash
        await ctx.stub.putState(orderId, Buffer.from(JSON.stringify(order)));

        // Retornamos el objeto orden como una cadena JSON
        return JSON.stringify(order);
    }

    // Modificamos esta función para que lea los pedidos con id y pdf_hash
    async ReadOrder(ctx, orderId) {
        const orderJSON = await ctx.stub.getState(orderId);
        if (!orderJSON || orderJSON.length === 0) {
            throw new Error(`El pedido ${orderId} no existe.`);
        }
        return orderJSON.toString();
    }

    // Esta función permanece igual si deseas obtener todos los activos, pero ahora solo incluiría aquellos con id y pdf_hash
    async GetAllAssets(ctx) {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
    
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;
