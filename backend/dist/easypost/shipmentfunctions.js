(async () => {
    let shipment;
    shipment = await client.Shipment.create({
        to_address: {
            name: 'Dr. Steve Brule',
            street1: '179 N Harbor Dr',
            city: 'Redondo Beach',
            state: 'CA',
            zip: '90277',
            country: 'US',
            email: 'dr_steve_brule@gmail.com',
            phone: '4155559999',
        },
        from_address: {
            street1: '417 montgomery street',
            street2: 'FL 5',
            city: 'San Francisco',
            state: 'CA',
            zip: '94104',
            country: 'US',
            company: 'EasyPost',
            phone: '415-123-4567',
        },
        parcel: {
            length: 20.2,
            width: 10.9,
            height: 5,
            weight: 65.9,
        },
        is_return: true,
    });
    console.log(shipment);
})();
(async () => {
    const shipment = await client.Shipment.retrieve('shp_...');
    const smartRates = shipment.getSmartrates(shipment.id);
    console.log(smartRates);
})();
(async () => {
    const shipment = await client.Shipment.retrieve('shp_...');
    const estimatedDeliveryDates = await client.Shipment.retrieveEstimatedDeliveryDate(shipment.id, 'YYYY-MM-DD');
    console.log(estimatedDeliveryDates);
})();
(async () => {
    const shipment = await client.Shipment.retrieve('shp_...');
    const insuredShipment = await client.Shipment.insure(shipment.id, 100);
    console.log(insuredShipment);
})();
//# sourceMappingURL=shipmentfunctions.js.map