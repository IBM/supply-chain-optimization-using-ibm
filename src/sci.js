//Backend Asset to call SCI to update new safety stock value

module.exports.updateSafetyStock = async (secrets, params) => {
  console.log ("itemID - " + params.itemID + "; _itemSafetyStockLevel - " + params.newSafetyStock)
  const data = {'safetyStockLevel':params.newSafetyStock}
  
  const options = { 
    url     : "https://api.ibm.com/scinsights/run/api/items/"+params.itemID,
    headers : {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-IBM-Client-Id': secrets.ibmclientid, 'X-IBM-Client-Secret': secrets.ibmclientsecret, 'X-IBM-User-Secret': secrets.ibmusersecret},
    method: 'PUT',
    json: true,
    body    : data
  }
  
  return rp(options)
    .then((response) => { console.log('Success!') } )
    .catch((err) => { console.log(err); throw `SCI call failed` })
}