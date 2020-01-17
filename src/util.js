//Code to get average Lead Time
module.exports.getAverageLeadTime = async (month) => {
	// Code to query and return average lead time for given month
}

//Code to get average consumption
module.exports.getAverageConsumption = async (month) => {
	// Code to query and return average consumption for given month
}}

//Code to get predicted consumption
module.exports.getPredictedConsumption = async (month) => {
	// Code to query and return max or predicted consumption for given month
}}

//Code to calculate new Safety Stock using predicted lead time and using above calcuated average values
module.exports.calcNewSafetyStock = async (secrets, params) => {
  const avgLt = await getAverageLeadTime('2')
  const avgDm = await getAverageConsumption('2')
  const prdDm = await getPredictedConsumption('2')
  const prdLt = await wml.getPredictedLeadTime(secrets, params);
  
  const safSk = (prdDm*prdLt)-(avgLt*avgDm); 
  return Math.round(safSk)
}}