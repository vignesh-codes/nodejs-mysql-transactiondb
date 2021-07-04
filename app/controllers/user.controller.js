const { TransactionTable } = require("../models");
const db = require("../models");
const SimpleNodeLogger = require('simple-node-logger'),
    opts = {
        logFilePath:'mylogfile.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    },
log = SimpleNodeLogger.createSimpleLogger( opts );
//Defining the array getSum to store the array of amount from all children
getSum = []
//Defining this to handle the recursive function
var _this = this;


//Get all transaction in hierarchy format
exports.transactions = (req,res) => {
  db.TransactionTable.findAll({hierarchy:true})
  .then(result => {
    log.info("Accessed Get All Transactions in Hierarchy Format Endpoint")
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    log.info("Failed to Get All Transactions in Hierarchy Format Endpoint")
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}

//Get all transactions not in hierarchy format
exports.getall = (req,res) => {
  db.TransactionTable.findAll()
  .then(result => {
    log.info("Accessed Get All Transactions Format Endpoint")
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    log.info("Failed Get All Transactions Format Endpoint")
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}


//Get a transaction by id
exports.getTransaction = (req,res) => {
  db.TransactionTable.findOne({
    where : {id : req.body.transaction_id}
  }
  )
  .then(result => {
    log.info("Accessed Get Transaction By ID Endpoint")
    res.status(200).json({
      
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    log.info("Failed To Get Transaction By ID Endpoint")
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
  
}

//Get all transaction by type
exports.getByType = (req,res) => {
  db.TransactionTable.findAll({
    where : {spentOn : req.params.type}
  }
  )
  .then(result => {
    log.info("Accessed Get All Transactions By Type Endpoint")
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    log.info("Failed Get All Transactions By Type Endpoint")
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}

//Get a transaction by id containing all its ancestors
exports.transWithAncestors = (req,res) => {
  console.log(req.params.transaction_id)
  
  db.TransactionTable.findOne({
    where: { id: req.params.transaction_id },
    include: [ { model: TransactionTable, as: 'ancestors' } ],
    order: [ [ { model: TransactionTable, as: 'ancestors' }, 'hierarchyLevel' ] ]
  })
  .then(result => {
    log.info("Accessed Get Transaction By ID in Hierarchy Format Endpoint")
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    log.info("Failed to get Transaction By ID in Hierarchy Format Endpoint")
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
  
}

//Get a transaction by id containing all its descendents
exports.transWithDescendents = (req,res) => {
  console.log(req.params.transaction_id)
  
  db.TransactionTable.findOne({
    where: { id: req.params.transaction_id },
    include: {
      model: TransactionTable,
      as: 'descendents',
      hierarchy: true
    }
  })
  .then(result => {
    log.info("Accessed Get Transaction By ID in Hierarchy Format Endpoint")
    res.status(200).json(result)
  })
  .catch(result => {
    log.info("Failed to Get Transaction By ID in Hierarchy Format Endpoint")
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}

//Update a transaction by id
exports.updateTransaction = (req,res) => {
  console.log(req.params.transaction_id)
  
  db.TransactionTable.update(
    {
      spentOn : req.body.spentOn,
      amount: req.body.amount,
      parentId: req.body.parentId
    },
    {returning: true,where: { id: req.params.transaction_id },
    
    plain: true
  }).then(result => {
    log.info("Accessed Update Transaction By ID Endpoint")
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    log.info("Failed to Update Transaction By ID Endpoint")
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}



//Get some of transaction by id. The sum is the sum of amounts from its descendents
exports.getSumOfDescendents = (req,res) => {
  
  console.log(req.params.id)
  getide = req.params.id
  db.TransactionTable.findOne({
    where: { id: getide },
    include: {
      model: TransactionTable,
      as: 'descendents',
      hierarchy: true
    }
  })
  .then(result1 => {
    
    result2 = JSON.stringify(result1)
    result = JSON.parse(result2)
    _this.sm(result)
    console.log(getSum)
    getSum.splice(0,1)
    resultSum = getSum
    
    final_sum = resultSum.reduce((a, b) => a + b, 0)
    getSum = []
    
  })
  .then(response => {
    log.info("Accessed Get Transaction BY ID SUM OF Children Endpoint")
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: final_sum
    })
  })
  .catch(response => {
    log.info("Failed Get Transaction BY ID SUM OF Children Endpoint")
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: response
    })
  })
}

exports.sm = function(result){

  getSum.push(result.amount)
  
  if (!result.children){
    // console.log("hekk", getSum)
    return getSum
  }
  result.children.forEach(child => _this.sm(child))
  
                
}

//Create a new transaction
exports.createTransaction = (req,res) => {
  db.TransactionTable.create({
    spentOn: req.body.spentOn,
    amount: req.body.amount,
    parentId: req.body.pid
  })
  .then(result => {
    log.info("Accessed Create New Transaction Endpoint")
    res.status(200).json({
      message: "Success",
      status_code: 201,
      data: result
    })
  })
  .catch(result => {
    log.info("Failed to Create New Transaction Endpoint")
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}