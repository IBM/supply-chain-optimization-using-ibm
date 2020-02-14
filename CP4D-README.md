# Supply Chain Optimization using IBM

## Please refer to [this link](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/SCIwithCPforData-README.md) for getting started.

In this Code Pattern, we use IBM Cloud Pak for Data to go through the whole data science pipeline to solve a business problem and predict the lead time for different raw materials. Cloud Pak for Data is an interactive, collaborative, cloud-based environment where data scientists, developers, and others interested in data science can use tools (e.g., RStudio, Jupyter Notebooks, Spark, etc.) to collaborate, share, and gather insight from their data as well as build and deploy machine learning and deep learning models.

Building predictive models require time, effort and good knowledge of algorithms to create effective systems which can predict the outcome accurately. With that being said, IBM has introduced Auto AI which will automate all the tasks involved in building predictive models for different requirements. We will get to see how Auto AI can churn out great models quickly which will save time and effort and aid in faster decision making process.

When the reader has completed this code pattern, they will understand how to :

* Quickly set up the services on cloud for model building.
* Ingest the data and initiate the Auto AI process.
* Build different models using Auto AI and evaluate the performance.
* Choose the best model and complete the deployment.
* Generate predictions using the deployed model by making ReST calls.
* Compare the process of using Auto AI and building the model manually.

# Architecture Diagram

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/architecture.png)

1. User logs into Watson Studio, creates a project and initiates an instance of Auto AI & Object Storage.
2. User uploads the data file in the CSV format to the object storage. The data file is exported from Supply Chain Insights.
3. User initiates the model building process using Auto AI and create pipelines.
4. User evaluates different pipelines from Auto AI and selects the best model for deployment.
5. User generates accurate predictions by making ReST call to the deployed model.
6. User ingests the data from Supply Chain Insights into CP4D and returns the predicted recommendation from the model back to Supply Chain Insights for further processing.

## Prerequisites

* [IBM Cloud Pak for Data](https://www.ibm.com/analytics/cloud-pak-for-data)
* [Watson Studio Addon for Cloud Pak for Data](https://www.ibm.com/support/producthub/icpdata/docs/content/SSQNUZ_current/wsj/install/install-ws.html)


## Included components

* [IBM Cloud Pak For Data](https://developer.ibm.com/articles/intro-to-cloud-pak-for-data/): IBM Cloud Pak™ for Data is a fully-integrated data and AI platform that modernizes how businesses collect, organize and analyze data and infuse AI throughout their organizations.

* [IBM Watson Studio](https://www.ibm.com/cloud/watson-studio): Analyze data using RStudio, Jupyter, and Python in a configured, collaborative environment that includes IBM value-adds, such as managed Spark.

* [IBM Auto AI](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/autoai-overview.html):The AutoAI graphical tool in Watson Studio automatically analyzes your data and generates candidate model pipelines customized for your predictive modeling problem.  

* [IBM Cloud Object Storage](https://console.bluemix.net/catalog/services/cloud-object-storage): An IBM Cloud service that provides an unstructured cloud data store to build and deliver cost effective apps and services with high reliability and fast speed to market. This code pattern uses Cloud Object Storage.


## Featured technologies

* [Artificial Intelligence](https://developer.ibm.com/technologies/artificial-intelligence/): Any system which can mimic cognitive functions that humans associate with the human mind, such as learning and problem solving.
* [Data Science](https://developer.ibm.com/code/technologies/data-science/): Systems and scientific methods to analyze structured and unstructured data in order to extract knowledge and insights.
* [Analytics](https://developer.ibm.com/code/technologies/analytics/): Analytics delivers the value of data for the enterprise.
* [Python](https://www.python.org/): Python is a programming language that lets you work more quickly and integrate your systems more effectively.

# Steps

Follow these steps to setup and run this code pattern using `Auto AI`.

1. [Create an account with IBM Cloud Pak](#1-create-an-account-with-ibm-cloud-pak-for-data)
1. [Create a new Watson Studio project](#2-create-a-new-watson-studio-project)
1. [Add Data](#3-add-data)
1. [Add Asset as Auto AI](#4-add-asset-as-auto-ai)
1. [Create and define experiment](#5-create-and-define-experiment)
1. [Import the csv file](#6-import-the-csv-file)
1. [Run experiment](#7-run-experiment)
1. [Analyze results](#8-analyze-results)
1. [Deploy to Cloud](#9-deploy-to-cloud)
1. [Model testing](#10-model-testing)
1. [Integrate Supply Chain Insights with Cloud Pak for Data](#11-integrate-supply-chain-insights-with-cloud-pak-for-data)


## 1. Create an account with IBM Cloud Pak for Data

Sign up for IBM [**Cloud Pak for Data**](https://www.ibm.com/account/reg/in-en/signup?formid=urx-34120). By clicking on create a free account you will get 7 days trial account.

## 2. Create a new Watson Studio project

Click on New Project and select per below.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/create_prj.png)

Define the project by giving a Name and hit 'Create'.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/def_prj.png)

## 3. Add Data

[Clone this repo](https://github.com/IBM/supply-chain-optimization-using-ibm)
Navigate to [Data](https://github.com/IBM/supply-chain-optimization-using-ibm/tree/master/Data) and save the file on the disk. The data is comming from Supply Chain Insights which is referrenced in Step 11.

Click on Assets and select Browse and add the csv file from your file system.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/add_asset.png)

## 4. Add Asset as Auto AI

Click on Add to project and select AutoAI experiment.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/sel_auto_ai.png)

`Note: The Lite account for AutoAI comes with 50 capacity units per month and AutoAI consumes 20 capacity units per hour.` 

## 5. Create and define experiment

Click on New AutoAI experiment and give a name to the experiment. Click on Associate a Machine Learning service instance to this project and select the Machine Learning service instance and hit reload. If you do not have Machine Learning service instance, then follow the steps on your screen to get one.

The Create button at the bottom right gets highlighted, go ahead and hit Create.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/create_exp.png)

## 6. Import the csv file

We need to import the csv file into the experiment. Note that, only csv file format is supported in AutoAI. Click on Browse or Select from project to choose the Data_SCI.csv file to import. 

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/import_csv.png)

## 7. Run experiment

We have to select the target variable, in this case it is `Overall Lead Time`. Notice that Prediction Type and Optimized Metric get highlighted which tells us that we are working on `Regression` use case and the evaluation metric is RMSE (Root Mean Square Error).

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/sel_target.png)

We can click on experiment settings to adjust the holdout sample and training sample under source settings.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/sample_split.png)

We can click on prediction setting to modify the parameters if required. In this case, we will leave'em as is and hit save and close.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/prediction_settings.png)

Click on `Run experiment`.

## 8. Analyze results

The AutoAI experiment has been completed in 97 seconds to generate four pipelines. `The duration of experiment depends completly on the size of the dataset`. AutoAI selects the appropriate machine learning algorithm (in the fifth stage of the process under `Model Selection`) which is best suited for the dataset. 

Each pipeline is run with different parameters, pipeline 2 is run on a sequence of HPO (hyper parameters optimization) where as pipeline 4 includes HPO (hyper parameters optimization), FE (feature engineering) and a combination of both. All these are done on the fly! Isn't it amazing that we just have to sit and watch while AutoAI takes care of things for us and generates awesome machine learning models!! There's very minimal intervention required to get things going and in no time we have the generated pipelines to choose from.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/generate_pipelines.png)

Click on pipeline 2 (which is ranked 1) to see the evaluation metrics on the left side.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/pipeline-2.png)

We can also compare different pipelines by clicking on pipeline comparison to check how they have performed in different evaluation metrics. 

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/metrics.png)

Click on model evaluation to review the performance of the model on the hold out sample and cross validation score. We can observe that our model has done very well by scoring > 95% on Recall, average Precision scores & Area under the curve scores. These scores also mean that our model is able to remember and identify fraudulent transactions with great precision.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/model_eval.png)

Click on feature importance to identify the significant features influencing the outcome. Any variable which starts with Newfeature is a variable generated on the fly by the model as part of feature engineering.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/feature_imp.png)

After all the analysis of model performance, its time to select the model for deployment. We will go ahead and select `pipeline 2 which is Rank 1` and hit on Save as model. `We can select any of the pipelines to be saved which has highest Accuracy or any other evaluation metrics.`

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/select_model.png)

## 9. Deploy to Cloud

The saved model can be found under `Models` under the project in Watson Studio. Click on three dots on the right side below Actions and hit `Deploy.`

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/deploy_mdl.png)

In the next step, click on Add Deployment on the right side above `Actions.`

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/add_dply.png)

Define the deployment by giving a name and hit `Save.` Note that, the model will get deployed as web service as a ReST API.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/crt_dply.png)

The deployment will get initialized and the status will show as `ready` when it is complete.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/dply_ready.png)

We can click on deployed model to see three tabs, Overview, Implementation and Test. Overview tab will give all details about the deployment like name, type, status et'al. Implementation tab will give scoring endpoint and code snippets to invoke the model. Test tab will give options to test the model.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/overview.png)

## 10. Model testing

Now that we have created and deployed the model as a web service, how do we test it?? We have to click on `Test` tab which will have two options which are form and json. We can use form if we are to test one record at a time where we can give the values to each attribute manually and hit `Predict` to generate predictions. The output of 0 under `values` indicate that it is a fraudulent transaction. The output can be either 0 or 1 as per the `data glossary` provided in the data folder.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/form.png)

For predicting multiple records, we have to update the values in the json file and use the option to input json data & then hit `Predict` to generate real time predictions.

![](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/images/json.png))

## 11. Integrate Supply Chain Insights with Cloud Pak for Data

Please review the steps detailed at [SCI & CP4D Integration](https://github.com/IBM/supply-chain-optimization-using-ibm/blob/master/SCIwithCPforData-README.md) 

# License

This code pattern is licensed under the Apache Software License, Version 2.  Separate third party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the Developer [Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](http://www.apache.org/licenses/LICENSE-2.0.txt).

Check the [ASL FAQ link](http://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN) for more details
