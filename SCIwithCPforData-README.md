# Developing a custom Supply Chain Business Assistant with skills to predict and take actions 
## using IBM Sterling and IBM CloudPak-for-Data

## Objective 
To enable Supply Chain Analyst with actionable insights while "Below Safety Stock" KPI gives alert in Supply Chain Insights (SCI) - Operation Center dashboard.

## Business Usecase 

### As-Is
In SCI Dashboard, Below Safety Stock (Item) KPI is defined as item inventory where the quantity on hand is below the safety stock level. Supply chain analyst receives more number of this KPI alerts and he/she has to frequently request Procurement Manager for item replenishments as a remedy which may not even necessary sometimes.

### To-Be
Instead of having defined static Safety Stock, he/she wants to know “What is new Safety Stock prediction based on supply & demand variances and external factors?”; he/she directs "Supply Chain Business Assistant (SCBA)" to find out the prediction using below question - 
  
    @watson, predict new safety stock of item "XYZ"

SCBA connects to ML model and gets the prediction as a response; Once response received, analyst validates it and wants to update newly predicted Safety Stock value into SCI so that KPI is recalculated; He directs SCBA to action this update thru command – 
  
    @watson, update this new safety stock 
   
SCBA connects SCI & updates newly predicted value as a Safety Stock level for given item and respond with status of this command. Now KPI gets recalculated with new Safety Stock predicted and gives much relevant and less number of Alerts, in turn fewer item replenishments

## Included components
### IBM Products -
* IBM Supply Chain Insights
* IBM Supply Chain Business Assitant
* IBM Cloud Pak for Data

### Featured Technologies - 
* NodeJS
* REST APIs
* Machine Learning
* Nature Language Processing

### Pre-requisites - 
* IBM Sterling Supply Chain Insights tenant has been setup and integrated with required data sources
* Operation Center dashboard has been setup with all required KPIs and alert thresholds
* As described above in As-Is scenario, "Below Safety Stock (Item)" KPI is active and red alert is visible; While drill-down to KPI, all impacted items with location details are shown

## Steps to achieve To-Be scenario - 

1) Upload required data set from different Supply chain sources to Cloud-Pak-for-Data as shown in diagram below using REST APIs 
2) Build machine learning model to predict supply lead time for given item using historical purchase order data as well as weather data (Refer ML Model building section)
3) Integrate SCBA with CloudPak-for-Data by calling 'predict REST API' using NodeJS to forecast better more accurate supply lead time
4) Recalculate new Safety Stock for this item using below formula in NodeJS method - 
	
	For given period,
	
	   New Safety Stock Qty = (Predicted LeadTime * Predicted Consumption) – (Average Consumption * Average LeadTime)

5) Integrate SCBA with SCI by calling 'Update Item REST API' using NodeJS to save newly predicted safety stock value for that item in SCI

### Step 1 - Uploading Dataset
In actual supply chain eco-system, purchase order and shipment data would be spread across different IT systems like SAP, Oracle, JDA etc. Using IBM CloudPak-for-Data, different data sources can be virtualized without moving data from its at-rest place. 

![](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/images/SCI-SCBA_with_CPforData_ArchDiagram.png)

`Note: In this code pattern, required data set is uploaded as a CSV file to simplify the steps since focus is on integration of SCI/SCBA with CloudPak-for-Data`



### Step 2 - Build, Test and Deploy ML model in Cloud-Pak-for-Data

   [Building ML model to predict supply lead time](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/README.md)

`Note: In this code pattern, ML model is built only to predict new supply lead time for given item at given period. Similar model can be built to predict new consumption`



### Step 3 - Integrating SCBA with CloudPak-for-Data to predict new safety stock

#### 3a. Define new Concepts, Patterns in EBA Dev Lab to extend SCBA to learn ontology of "new safety stock" and understand

![](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/images/concepts.png)

![](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/images/patterns.png)

#### 3b. Define required Actions in EBA Dev Lab to call back-end assets to predict and to form response in natural languaage

![](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/images/actions.png)

[Click here to get source code](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/src/predictsafetystock.js)

#### 3c. Write new back-end Asset in NodeJS to make a REST API call to CloudPak-for-Data to predict

[Click here to get source code](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/src/wml.js)



### Step 4 - Recalculating new safety stock using new back-end Asset in NodeJS

#### 4a. Code to get average Lead Time

[Click here to get source code](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/src/util.js)

#### 4b. Code to get average consumption

[Click here to get source code](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/src/util.js)

#### 4c. Code to get predicted consumption (~Note: ML model has to be built for this otherwise it can return max consumption)

[Click here to get source code](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/src/util.js)

#### 4d. Code to calculate new Safety Stock using predicted lead time and using above calcuated average values

[Click here to get source code](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/src/util.js)



### Step 5 - Integrating SCBA with SCI to update item

#### 5a. Define new Concepts, Patterns in EBA Dev Lab to extend SCBA to learn to update "new safety stock" into SCI

![](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/images/concepts.png)

![](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/images/patterns.png)

#### 5b. Define Actions in EBA Dev Lab to call back-end assets to predict and to form response in natural languaage

![](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/images/actions.png)

[Click here to get source code](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/src/updatesafetystock.js)


#### 5c. Write new back-end Asset in NodeJS to make a REST API call to SCI to update new safety stock value

[Click here to get source code](https://github.ibm.com/sharrkum/supply-chain-optimization-using-ibm/blob/master/src/sci.js)



### To-Be Usecase Demo -



## What Next -

