data = {
    "id": 8,
    "name": "new3",
    "createdAt": "2021-07-01T19:58:33.000Z",
    "updatedAt": "2021-07-01T19:58:33.000Z",
    "hierarchyLevel": 3,
    "parentId": 7,
    "ancestors": [
        {
            "id": 6,
            "name": "new1",
            "createdAt": "2021-07-01T19:58:05.000Z",
            "updatedAt": "2021-07-01T19:58:05.000Z",
            "hierarchyLevel": 1,
            "parentId": null,
            "folderancestor": {
                "folderId": 8,
                "ancestorId": 6
            }
        },
        {
            "id": 7,
            "name": "new2",
            "createdAt": "2021-07-01T19:58:25.000Z",
            "updatedAt": "2021-07-01T19:58:25.000Z",
            "hierarchyLevel": 2,
            "parentId": 6,
            "folderancestor": {
                "folderId": 8,
                "ancestorId": 7
            }
        }
    ]
}

newdata = {
    "id": 1,
    "spentOn": "Cars",
    "amount": 10,
    "createdAt": "2021-07-02T14:30:03.000Z",
    "updatedAt": "2021-07-02T14:30:03.000Z",
    "hierarchyLevel": 1,
    "parentId": null,
    "children": [
        {
            "id": 2,
            "spentOn": "CarsB",
            "amount": 100,
            "createdAt": "2021-07-02T14:30:42.000Z",
            "updatedAt": "2021-07-02T14:30:42.000Z",
            "hierarchyLevel": 2,
            "parentId": 1
        },
        {
            "id": 3,
            "spentOn": "CarsC",
            "amount": 12,
            "createdAt": "2021-07-02T14:30:58.000Z",
            "updatedAt": "2021-07-02T14:30:58.000Z",
            "hierarchyLevel": 2,
            "parentId": 1,
            "children": [
                {
                    "id": 4,
                    "spentOn": "CarsC1",
                    "amount": 121,
                    "createdAt": "2021-07-02T14:31:35.000Z",
                    "updatedAt": "2021-07-02T14:31:35.000Z",
                    "hierarchyLevel": 3,
                    "parentId": 3
                },
                {
                    "id": 5,
                    "spentOn": "CarsC2",
                    "amount": 11,
                    "createdAt": "2021-07-02T14:31:45.000Z",
                    "updatedAt": "2021-07-02T14:31:45.000Z",
                    "hierarchyLevel": 3,
                    "parentId": 3
                }
            ]
        }
    ]
}

a = { "id": 1, "spentOn": "Cars", "amount": 10, "createdAt": "2021-07-02T14:30:03.000Z", "updatedAt": "2021-07-02T14:30:03.000Z", "hierarchyLevel": 1, "parentId": null, "children": [{ "id": 2, "spentOn": "CarsB", "amount": 100, "createdAt": "2021-07-02T14:30:42.000Z", "updatedAt": "2021-07-02T14:30:42.000Z", "hierarchyLevel": 2, "parentId": 1 }, { "id": 3, "spentOn": "CarsC", "amount": 12, "createdAt": "2021-07-02T14:30:58.000Z", "updatedAt": "2021-07-02T14:30:58.000Z", "hierarchyLevel": 2, "parentId": 1, "children": [{ "id": 4, "spentOn": "CarsC1", "amount": 121, "createdAt": "2021-07-02T14:31:35.000Z", "updatedAt": "2021-07-02T14:31:35.000Z", "hierarchyLevel": 3, "parentId": 3 }, { "id": 5, "spentOn": "CarsC2", "amount": 11, "createdAt": "2021-07-02T14:31:45.000Z", "updatedAt": "2021-07-02T14:31:45.000Z", "hierarchyLevel": 3, "parentId": 3 }] }] }
//  If A is parent of B and C,  and C is parent of D and E . sum(A) = B + C + D + 
// A
// B C
//   D E
names = []

function func(obj) {
    names.push(obj.amount)
    if (!obj.children) {
        return
    }
    obj.children.forEach(child => func(child))
}

func(a)
console.log(names)