# Developing a custom Supply Chain Business Assistant with skills to predict and take actions 
### Using IBM Sterling and IBM CloudPak-for-Data/Watson-Studio

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

* [IBM Supply Chain Insights](https://www.ibm.com/in-en/products/supply-chain-insights): IBM® Sterling Supply Chain Insights is an AI-enabled solution that delivers real-time intelligence to optimize supply chain performance by quickly correlating data from siloed systems, capturing organizational knowledge and creating digital playbooks.
* [IBM Supply Chain Business Assitant](https://www.ibm.com/support/knowledgecenter/SS7J6M/kc_welcome.html): IBM Sterling Supply Chain Business Assistant is a conversational AI system designed to help you in your every day tasks and decision making.
* [IBM Cloud Pak For Data](https://developer.ibm.com/articles/intro-to-cloud-pak-for-data/): IBM Cloud Pak™ for Data is a fully-integrated data and AI platform that modernizes how businesses collect, organize and analyze data and infuse AI throughout their organizations.

### Featured Technologies

* NodeJS
* REST APIs
* Artificial Intelligence
* Machine Learning
* Nature Language Processing

### Pre-requisites

* It is recommended to complete below learning courses in IBM Digital Learning portal before proceeding with this code pattern
  - [IBM Supply Chain Insights - Deployment and Data Configuration course](https://learn.ibm.com/enrol/index.php?id=5000)
  - [IBM Supply Chain Business Assistant - Developing an Embedded Business Agent course](https://learn.ibm.com/course/view.php?id=5150) 

* IBM Sterling Supply Chain Insights SaaS tenant has been setup and loaded with required data set
  #### `Note:`
  - To subscribe to SCI SaaS trial tenant, sign-in to [IBM Digital Learning Portal](https://learn.ibm.com/course/view.php?id=5073)
  - To launch SCI Operations Center and SCBA Dev Lab, sign-in to [IBM Supply Chain Insights SaaS](https://supplychaininsights.ibm.com)
  - Once learning environment is provisioned, it has required sample data set loaded with it
  
* Operation Center dashboard has been setup with all required KPIs and alert thresholds

* As described above in As-Is scenario, "Below Safety Stock (Item)" KPI is active and red alert is visible; While drill-down to KPI, all impacted items with location details are shown

## Steps to achieve To-Be scenario

1) Upload required data set from different Supply chain sources to Cloud-Pak-for-Data as shown in diagram below using REST APIs 
2) Build machine learning model to predict supply lead time for given item using historical purchase order data as well as weather data (Refer ML Model building section)
3) Integrate SCBA with CloudPak-for-Data by calling 'predict REST API' using NodeJS to forecast better more accurate supply lead time
4) Recalculate new Safety Stock for this item using below formula in NodeJS method - 
	
	For given period,
	
	   New Safety Stock Qty = (Predicted LeadTime * Predicted Consumption) – (Average Consumption * Average LeadTime)

5) Integrate SCBA with SCI by calling 'Update Item REST API' using NodeJS to save newly predicted safety stock value for that item in SCI

### Step 1 - Uploading Dataset

Below architecture diagram depicts actual supply chain eco-system where-in purchase order and shipment data would be spread across different IT systems like SAP, Oracle, JDA etc. Using IBM CloudPak-for-Data, different data sources can be virtualized without moving data from its at-rest place. 

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/SCI-SCBA_with_CPforData_ArchDiagram.png)

 #### `Note:`
  - In this code pattern, focus is on integration of SCI/SCBA with CloudPak-for-Data; Required sample data is loaded by default in provisioned learning SCI SaaS tenant; 
  - If developer wants to upload new data set, then [SCI REST APIs](https://developer.ibm.com/api/view/scinsights-prod:supply-chain-insights:title-Supply_Chain_Insights#Overview) can be used to upload it
  - If developer is new to SCI platform, it is advised to complete [SCI Deployment and Data Configuration course](https://learn.ibm.com/enrol/index.php?id=5000) before uploading new data set


### Step 2 - Build, Test and Deploy AI model in Cloud-Pak-for-Data

`Please refer to the step by step instructions at` [Building AI model to predict supply lead time using Cloud Pak for Data](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/CP4D-README.md)

`Note: In this code pattern, AI model is built only to predict new supply lead time for given item at given period. Similar model can be built to predict new consumption`



### Step 3 - Integrating SCBA with CloudPak-for-Data to predict new safety stock

 #### `Note:`
  - If developer is new to SCBA Dev lab, it is advised to complete [Developing an Embedded Business Agent course](https://learn.ibm.com/course/view.php?id=5150) in IBM Digital Learning Portal before proceeding further steps

#### 3a. Define new Concepts, Patterns in EBA Dev Lab to extend SCBA to learn ontology of "new safety stock" and understand

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/concepts.png)

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/patterns.png)

#### 3b. Define required Actions in EBA Dev Lab to call back-end assets to predict and to form response in natural languaage

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/actions.png)

[Click here to get source code](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/src/predictsafetystock.js) which makes a call to a corresponding method in back-end asset 'wml.js' to predict from this action.

#### 3c. Write new back-end Asset in NodeJS to make a REST API call to CloudPak-for-Data to predict

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/asset_wmljs.png)

[Click here to get source code](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/src/wml.js) which makes a predict API call to CP4D or Watson Studio to get predicted lead time.


### Step 4 - Recalculating new safety stock using new back-end Asset in NodeJS

 #### `Note:`
  - If developer is new to SCBA Dev lab, it is advised to complete [Developing an Embedded Business Agent course](https://learn.ibm.com/course/view.php?id=5150) in IBM Digital Learning Portal before proceeding further steps

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/asset_utiljs.png)

#### 4a. Code to get average Lead Time

[Click here to get source code](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/src/util.js) which gets average lead time of supply orders delivered; Either it can connect to external system to get this value or it can be calculated by calling corresponding SCI API if it is present as part of data upload.

#### 4b. Code to get average consumption

[Click here to get source code](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/src/util.js) which gets average consumption of inventories; Either it can connect to external system to get this value or it can be calculated by calling corresponding SCI API if it is present as part of data upload.

#### 4c. Code to get predicted consumption (~Note: ML model has to be built for this otherwise it can return max consumption)

[Click here to get source code](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/src/util.js) which gets predicted consumption of inventories; Either it can be predicted using ML model deployed in CP4D or Watson Studio or it can connect to external system to get maximum consumption happened during similar period in last year.

#### 4d. Code to calculate new Safety Stock using predicted lead time and using above calcuated average values

[Click here to get source code](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/src/util.js) which gets predicted new Safety Stock using formula explained above by calling relevant util methods as well as predict method of back-end asset 'wml.js'.


### Step 5 - Integrating SCBA with SCI to update item

#### 5a. Define new Concepts, Patterns in EBA Dev Lab to extend SCBA to learn to update "new safety stock" into SCI

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/concepts.png)

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/patterns.png)

#### 5b. Define Actions in EBA Dev Lab to call back-end assets to predict and to form response in natural language

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/actions.png)

[Click here to get source code](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/src/updatesafetystock.js) which calls a corresponding method in back-end asset 'sci.js' from this action.


#### 5c. Write new back-end Asset in NodeJS to make a REST API call to SCI to update new safety stock value

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/asset_scijs.png)

[Click here to get source code](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/src/sci.js) which makes [corresponding SCI REST API](https://developer.ibm.com/api/view/scinsights-prod:supply-chain-insights:title-Supply_Chain_Insights#107460) to update new Safety stock value.

### To-Be Usecase End-Results Screenshot

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/SCI-SCBA_Usecase_EndResult-Screenshot.jpg)

# License

This code pattern is licensed under the Apache Software License, Version 2.  Separate third party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the Developer [Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](http://www.apache.org/licenses/LICENSE-2.0.txt).

Check the [ASL FAQ link](http://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN) for more details
