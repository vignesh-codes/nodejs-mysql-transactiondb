const { TransactionTable } = require("../models");
const db = require("../models");

getSum = []
var _this = this;

exports.transactions = (req,res) => {
  db.TransactionTable.findAll({hierarchy:true})
  .then(result => {
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}

exports.getall = (req,res) => {
  db.TransactionTable.findAll()
  .then(result => {
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
}

exports.getTransaction = (req,res) => {
  db.TransactionTable.findOne({
    where : {id : req.body.transaction_id}
  }
  )
  .then(result => {
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
  
}

exports.getByType = (req,res) => {
  db.TransactionTable.findAll({
    where : {spentOn : req.params.type}
  }
  )
  .then(result => {
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}

exports.transWithAncestors = (req,res) => {
  console.log(req.params.transaction_id)
  
  db.TransactionTable.findOne({
    where: { id: req.params.transaction_id },
    include: [ { model: TransactionTable, as: 'ancestors' } ],
    order: [ [ { model: TransactionTable, as: 'ancestors' }, 'hierarchyLevel' ] ]
  })
  .then(result => {
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
  
}

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
    res.status(200).json(result)
  })
  .catch(result => {
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}


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
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: result
    })
  })
  .catch(result => {
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}




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
    res.status(200).json({
      message: "Success",
      status_code: 200,
      data: final_sum
    })
  })
  .catch(response => {
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





exports.createTransaction = (req,res) => {
  db.TransactionTable.create({
    spentOn: req.body.spentOn,
    amount: req.body.amount,
    parentId: req.body.pid
  })
  .then(result => {
    res.status(200).json({
      message: "Success",
      status_code: 201,
      data: result
    })
  })
  .catch(result => {
    res.status(400).json({
      message: "Request Failed",
      status_code: 500,
      data: result
    })
  })
}