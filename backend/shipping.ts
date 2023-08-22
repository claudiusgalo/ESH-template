const EasyPostClient = require('@easypost/api');
const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

//Create a new address
// (async () => {
//   const address = await client.Address.create({
//     street1: '417 MONTGOMERY ST',
//     street2: 'FLOOR 5',
//     city: 'SAN FRANCISCO',
//     state: 'CA',
//     zip: '94104',
//     country: 'US',
//     company: 'EasyPost',
//     phone: '415-123-4567',
//   });

//   console.log(address);
// })();

//Create and verify an address 
// (async () => {
//   const address = await client.Address.createAndVerify({
//     street1: '417 montgomery street',
//     street2: 'FL 5',
//     city: 'San Francisco',
//     state: 'CA',
//     zip: '94104',
//     country: 'US',
//     company: 'EasyPost',
//     phone: '415-123-4567',
//   });

//   console.log(address);
// })();

//Create, then verify an address
// (async () => {
//   const address = await client.Address.create({
//     street1: '417 montgomery streat',
//     city: 'SAN FRANCISCO',
//     state: 'CA',
//     zip: '94104',
//     country: 'US',
//     company: 'EasyPost',
//     phone: '415-123-4567',
//   });

//   const verifiedAddress = await client.Address.verifyAddress('adr_8160a4aa0e5e11eeb471ac1f6bc53342');

//   console.log(verifiedAddress);
// })();

// Retrieve a list of saved addresses
// (async () => {
//   const addresses = await client.Address.all({
//     page_size: 5,
//   });

//   console.log(addresses);
// })();

// Retrieve a speficific address by it's ID
// (async () => {
//   const retrievedAddress = await client.Address.retrieve('____');

//   console.log(retrievedAddress);
// })();

// Create a parcel
// (async () => {
//   const parcel = await client.Parcel.create({
//     length: 20.2,
//     width: 10.9,
//     height: 5,
//     weight: 65.9,
//   });

//   console.log(parcel);
// })();

//Retrieve a parcel by ID
// (async () => {
//     const parcel = await client.Parcel.retrieve('prcl_c5e33966f3574346b368e6c6f033901c');
  
//     console.log(parcel);
//   })();

//Create an insurance
(async () => {
    const insurance = await client.Insurance.create({
      to_address: { id: 'adr_...' }, //Optional
      from_address: { id: 'adr_...' }, //Optional
      tracking_code: '9400110898825022579493', //The tracking code associated with the non-EasyPost-purchased package you'd like to insure.
      carrier: 'USPS',
      amount: '100.00',
      reference: 'insuranceRef1', //An optional value that may be used in place of ID when doing Retrieve calls for this insurance.
    });
  
    console.log(insurance);
  })();

  //Retreive a list of insurances
  (async () => {
    const insurances = await client.Insurance.all({
      page_size: 5,
    });
  
    console.log(insurances);
  })();

  //Retreive an insurance by ID
  (async () => {
    const insurance = await client.Insurance.retrieve('ins_...');
  
    console.log(insurance);
  })();