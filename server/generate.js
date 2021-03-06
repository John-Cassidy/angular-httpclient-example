var faker = require('faker');

var database = { products: [], policies: [] };

for (var i = 1; i <= 2; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    price: faker.commerce.price(),
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
    quantity: faker.random.number(),
  });
  database.policies.push({
    id: i,
    policyNumber: faker.finance.account(),
    creationDate: faker.date.past(),
    expireDate: faker.date.future(),
    policyAmount: faker.finance.amount(),
    clientId: faker.random.number(),
    employeeId: faker.random.number(),
  });
}

console.log(JSON.stringify(database));
