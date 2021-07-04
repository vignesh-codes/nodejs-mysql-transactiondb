# Node JS Backend For Storing Transaction Info
## Features
Table SCHEMA:
'TransactionTable', { spentOn: Sequelize.ENUM('cars', 'shopping', 'movies'),
amount: Sequelize.FLOAT, parentId: Sequalize.INTEGER}
- CREATE, UPDATE transaction details
- Get Sum of transaction_amount. Includes the sum of child transactions
- List Transactions in parent/child Hierarchy. Get TransactionByID with its children or parents.

### MOCK DATA

Create a Transaction
POST- localhost:8080/api/transaction

```
{
    "spentOn": "cars",
    "amount": 132.12,
    "pid": null
}

```
Create Child For the above trans id:
```
{
    "spentOn": "cars",
    "amount": 20,
    "pid": 1
}

```

Update a transaction by id:
PUT - localhost:8080/api/transaction/2
```
{
    "spentOn": "shopping",
    "amount": 1234,
    "pid": 1
}
```

Get All Transaction Without Hierarchy:
GET - /api/getAllTrans

Get All Transactions with Hierarchy:
GET - /api/getAllTransWithHierarchy

Get Transaction by ID with Children:
GET - /api/transWithDescendents/:transaction_id

GET Transaction by Id with Parents:
GET - /api/transWithAncestors/:transaction_id

GET The sum of transaction by id with children's sum
GET /api/sum/:transaction_id

Sample heirarchy and sum result:
```
{
    "message": "Success",
    "status_code": 200,
    "data": [
        {
            "id": 1,
            "spentOn": "cars",
            "amount": 1111.23,
            "createdAt": "2021-07-04T12:23:41.000Z",
            "updatedAt": "2021-07-04T12:23:41.000Z",
            "hierarchyLevel": 1,
            "parentId": null
        },
        {
            "id": 2,
            "spentOn": "cars",
            "amount": 20,
            "createdAt": "2021-07-04T12:24:09.000Z",
            "updatedAt": "2021-07-04T12:24:09.000Z",
            "hierarchyLevel": 2,
            "parentId": 1
        },
        {
            "id": 3,
            "spentOn": "shopping",
            "amount": 200,
            "createdAt": "2021-07-04T12:25:19.000Z",
            "updatedAt": "2021-07-04T12:25:19.000Z",
            "hierarchyLevel": 2,
            "parentId": 1
        },
        {
            "id": 4,
            "spentOn": "shopping",
            "amount": 2099,
            "createdAt": "2021-07-04T12:25:47.000Z",
            "updatedAt": "2021-07-04T12:27:07.000Z",
            "hierarchyLevel": 3,
            "parentId": 3
        },
        {
            "id": 5,
            "spentOn": "shopping",
            "amount": 99.9,
            "createdAt": "2021-07-04T12:40:25.000Z",
            "updatedAt": "2021-07-04T12:40:25.000Z",
            "hierarchyLevel": 4,
            "parentId": 4
        }
    ]
}

```
Its SUM Result is:
```
{
    "message": "Success",
    "status_code": 200,
    "data": 2418.9
}
which is sum transaction_id.amount(2,3,4,5)
```
