//Action to pull data by calling using backend assets and return NL response

module.exports.main = async(params) => {
  console.log ("Updating safety stock of an item")
  const p = new eba.Params(params)
  const s = await p.get('md:NewSafetyStock')

  if ( s == null )
    return new eba.Result().setData(`md:ActionUpdate`, `Newly predicted Safety Stock value is not available yet`)
  else {
    const res = await sci.updateSafetyStock(params.secrets, {itemID:s.itemID, newSafetyStock:s.safetyQty})
    
  return new eba.Result()
    .setData('md:ActionUpdate', `Updated safety stock level successfully for item ${s.itemID} to ${s.safetyQty}`)
  }
}
