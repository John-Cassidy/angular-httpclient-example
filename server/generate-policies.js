var faker = require('faker');

var database = { policies: [] };

for (var i = 1; i <= 300; i++) {
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
