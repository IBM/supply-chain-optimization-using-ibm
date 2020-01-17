//Action to pull data by calling using backend assets and return NL response

module.exports.main = async(params) => {
  console.log ("Predicting safety stock item")
  const p = new eba.Params(params)
  const l = await p.get('sc:Location')
  const m = await p.get('sc:Item')
  
  if ( m == null )
    return new eba.Result().setData(`sc:Predict`, `I have not found related Item. Can you check on Item in question?`)
  else {
    const loct= (l==null)?``:l._locationID
    const str = (l==null)?``:`at location ${loct}`  
    const res = await util.calcNewSafetyStock(params.secrets, {mat:m._itemID,loc:loct})
    const out = {'itemID':m._itemID,'safetyQty':res}
    
    console.log("Response - " + JSON.stringify(out))
    return new eba.Result()
      .store('newSS', out)
      .setData('md:NewSafetyStock', out)
      .setData('sc:Predict', `Predicted successfully; \n Predicted safety stock value for item ${out.itemID} ${str} is ${out.safetyQty}`)
  }
}