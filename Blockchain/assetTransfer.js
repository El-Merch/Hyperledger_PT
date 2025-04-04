async CreateOrder(ctx, orderId, customerId, totalPrice, status) {
    const order = {
        ID: orderId,
        CustomerID: customerId,
        TotalPrice: parseFloat(totalPrice),
        Status: status,
        docType: 'order',
    };
    await ctx.stub.putState(orderId, Buffer.from(JSON.stringify(order)));
    return JSON.stringify(order);
}

async ReadOrder(ctx, orderId) {
    const orderJSON = await ctx.stub.getState(orderId);
    if (!orderJSON || orderJSON.length === 0) {
        throw new Error(`El pedido ${orderId} no existe.`);
    }
    return orderJSON.toString();
}

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