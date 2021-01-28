# Data Journalism - Smoking and Income Trends  

![Title](images/smoking_money.jpg)

## Table of contents
* [Assignment](#assignment)
* [Data Sources](#data_sources)
* [Dashboard Design](#design)
* [Evaluation](#eval)
* [References](#ref)

## Assignment
Use JavaScript with html, D3, scalable vector graphics (svg) to generate an interactive chart of health risks based on data from the US Census Bureau. 


## Data Sources
Style sheets and starter code were provided, as was a csv containing US Census Bureau data.  Original files can be found at the links below: 

* Belly button bacteria data: https://github.com/KLacerda08/plotly-challenge/tree/main/Resources/samples.json
* original data from: http://robdunnlab.com/projects/belly-button-biodiversity/ 
* html: https://github.com/KLacerda08/plotly-challenge/tree/main/Resources/index.html
* app.js file: https://github.com/KLacerda08/plotly-challenge/tree/main/Resources/static/js/app.js


## Dashboard Design
The index.html file contained the framework to store the dashboard, including a dropdown menu (to be populated), and html IDs where the bar plotand bubble plot could be tagged. Code was designed to first
populate the dropdown menu, and then to build the plots. During development, a dummy patient index was utilized to test the code in the console log.  After completion, the dummy index was removed. Functions were 
developed to build the bar and bubble plots, and the demographic data of the patient, utizing the following fields from the dataset:
- sample_values
- otu_ids
- otu_labels 

To operate the dashboard, select the Test Subject ID from the dropdown menu.  The bubble plot shows all the microbial groups (operational taxonomic units or OTUs) for that patient; the markers are sized in relation to the count of the OTU present. The bar plot shows the top ten OTUs in the selected patient. In some cases, the patient did not have ten OTUs present, in which case fewer are shown. An example of the dashboard output is provide below.  
(patient 1601).  
![Title](images/plots.png)

## Evaluation
The data shows that certain OTUs, such as 944, 1795, and 2419 are common across many individuals in substantial concentrations.  Additional analysis could be performed with statistics to show which OTU(s) are most common across the population. 

## References
Readme image source: 
https://www.unh.edu/healthyunh/blog/tobacco/2017/11/tobacco-and-your-wallet
https://depositphotos.com/140091338/stock-photo-data-science-newspaper-article-text.html