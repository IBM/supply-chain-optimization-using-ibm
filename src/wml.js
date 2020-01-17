//Backend Asset to call Watson ML model deployed outside

module.exports.getPredictedLeadTime = async (secrets, params) => {
  const iamtok = await generateIAMToken(secrets)
  const instid = secrets.mlinstanceid

  const payload = {"input_data": [{"fields": ["Item ID", "Origin Location ID", "Destination Location ID", "Transport Mode", "Delivered Month", "Delivery Delay", "Weather of Week"], "values": [['','','','',1,1,'']]}]}
  const url = "https://.../predictions" 
  
  const options = { 
    url     : url,
    headers : {'Accept':'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + iamtok, 'ML-Instance-ID': instid},
    method: 'POST',
    json: true,
    body    : payload 
  }

  return rp(options)
    .then((response) => {
        return response.predictions[0].values[0][0] })
    .catch((err) => { console.log(err); throw `Watson call failed` })
}

const generateIAMToken = async (secrets) => {
  const akey = secrets.apikey
  const options = { 
    url     : "https://.../token",
    headers : { "Content-Type"  : "application/x-www-form-urlencoded" },
    method: 'POST',
    json: true,
    body    : "apikey=" + akey + "&grant_type=urn:ibm:params:oauth:grant-type:apikey" 
  }
                
  return rp(options)
    .then((response) => { return response.access_token } )
    .catch((err) => { console.log(err); throw `IAM token NOT generated` })
}