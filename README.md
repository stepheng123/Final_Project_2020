# The Story of Australia

This final project is a joint collaboration between Stephen Guilmartin and Arvin Seeva. The title of the project is Australia At A Glance. 

## The Website

The website is an expansion of the previous project which focused on the population and the economy. In this version, the focus will be on tourism, sports and well-being. 


## The Team

The team is made of two key value pairs, Stephen and Arvin. After much deliberation, the team wanted to maximise their work in using a few key areas as described in the brief. The team agreed to use Herokuapp to host the website. The team agreed to explore the potential of using Naive-Bayes for categorising the reviews in AirBNB. The team will also use Tableau to display stories they have found interesting about Australia's sports records. 


Stephen will focus on deploying the website on the cloud. This choice of services is yet to be defined at the time of writing. Stephen will also be looking to visually narrate the sporting trends and culture. 

Arvin will be taking the lead on machine learning and neural networks. He will assess the reviews available from AirBNB on Perth, Melbourne and Sydney to make recommendations for local holidaymakers. Arvin will also be responsible to document the journey. 


## The Data Exploration

For the sports story, the team sourced data from kaggle. It had a complete record of Australia's performance till date in all summer and winter olympics since 1896. The dataset consists of winter olympics, summer olympics and a reference to each country with their corresponding GDP and population.  


For the tourism story, the team sourced data from a variety of datasets. One dataset provided AirBNB reviews and listings for major cities in Perth. This is from insideairbnb.com. However, this dataset lacked reviews to be analysed via machine learning. The team also found a blog that detailed step-by-step method of scraping reviews from AirBNB. The team considered this option as a possibility if there was sufficient time. The team also found data made available on kaggle.com. These datasets showed tourism data between states, reviews from airbnb in Melbourne. 

To help tell the story better, the team also found an interesting source on Australian Climate. This is summarised in a wikipedia page. Arvin used Pandas to scrape the tables and export into a csv file. 

The team also reviewed the dataset acquired for the previous phase. There was some value in using the same dataset but in different applications. The team believed the economic dataset showing Australian trade was useful for Machine Learning. 

In summary, the datasources were primarily from Wikipedia, Kaggle and Australian government agencies. 

## The Deployment

The team decided to capitalise and expand the previously developed website. For the last project, the same website was deployed locally. However, in this instance, the team deployed the website using Herokuapp. Stephen used the documentation provided and deployed the website as an app. He also re-organised the files into his github account and connected Herokuapp to his account. The initial trials were unsuccessful but finally Stephen managed to address these and deploy the website successfully. 

## Machine Learning

The team initially explored the use of Naive-Bayes model to ascertain the type of feedback collected from airbnb.com. The team postulated that the quality and quantity of feedback will have a correlation with an area being favoured positively or negatively for tourism. The initial use of this was unsuccessful. The team learnt that it required to train the model based on a highly varied and unreliable dataset. There is also the issue of some reviews may not be written in grammatically correct English. 

Based on this, the team decided to pivot to using the economics data. Using linear regression, the team was able to predict to a degree the economic growth of Australia. However, this dataset was homogenous to pre-pandemic era. The team believed it is very challenging to arrive at the same conclusion post-pandemic and without a reasonable correction factor. 

The team also experimented with the idea of comparing airbnb location versus it's price. The team was curious to find out if more northern or southern a location had an impact on its price.

Finally, the team also experimented with the hypothesis if number of reviews dictated the price. The team would like to explore the possibility of predicting the right price based on the number of reviews. 

## Tableau


