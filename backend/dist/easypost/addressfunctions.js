(async () => {
    const address = await client.Address.createAndVerify({
        street1: '18907 Colonial Hill Drive',
        street2: '',
        city: 'Cypress',
        state: 'TX',
        zip: '77433',
        country: 'US',
        company: 'WritingEdits',
        phone: '832-818-6058',
    });
    console.log(address);
})();
(async () => {
    const addresses = await client.Address.all({
        page_size: 10,
    });
    console.log(addresses);
})();
//# sourceMappingURL=addressfunctions.js.map