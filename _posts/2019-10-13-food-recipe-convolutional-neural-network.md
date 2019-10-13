---
layout: disqus
title: Food Recipe Convolutional Neural Network
date: 2019-10-13 14:30 +0200
comments: true
permalink: food-recipe-convolutional-neural-network/
---

> For the Kin Crypto Challenge I decided to try and build a Food Recipe Recognition CNN and embed that into a Flutter Application. I got pretty far and I aim to continue. This post will discuss the first part of building the CNN.

## Data Scraping:

Initially I tried to get the data myself. However there is an alternative option which I recommend due the legalities of web-scraping. The content I scraped here is purely for my own use and I do not intend on distributing it. The alternative approach would be to explore the wealth of datasets available on `Kaggle`.

I decided to use the `Pipenv` method for keeping all of my dependencies together. You could however make use of `Conda`. You can find all the details about `Pipenv` installation and use at this link [here](https://github.com/pypa/pipenv).

After a successful `pipenv install` I place the following in my `main.py` which will run the root of my application.

```python
import db
from website_automater import allrecipes_com as arc
from multiprocessing import freeze_support

from dask.distributed import Client, progress

def main():
    db.init()

    arc.run()

if __name__ == '__main__':
    client = Client()
    freeze_support()
    main()
```

I make use of `dask` here which you can think of as a more powerful, distributed form of the popular `Pandas` library. It is necessary to sometimes add `freeze_support()` to prevent threads from blocking.

In the `db.py` file is where I setup my SQLLite database for storing the information I need for later use. The following is the code for `db.py`:

```python
import uuid
import dask
import pandas as pd
import dask.dataframe as dd
from sqlalchemy import create_engine

engine = create_engine("sqlite:///nutritio.db", convert_unicode=True)
conn = engine.connect()

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)

from sqlalchemy import Table, Column, Integer, String, Binary, NVARCHAR
from sqlalchemy.schema import MetaData

class AllRecipes(Base):
    __tablename__ = 'allrecipes'

    index        = Column("index", String, primary_key=True)
    title        = Column("Title", String)
    total_time   = Column("Total Time", String)
    yields       = Column("Yields", String)
    ingredients  = Column("Ingredients", NVARCHAR)
    instructions = Column("Instructions", NVARCHAR)
    image        = Column("Image", String)
    links        = Column("Links", NVARCHAR)
    
    def __repr__(self):
       return """<Recipe(
        index='%s',
        title='%s',
        total_time='%d',
        yields='%s',
        ingredients='%b', 
        instructions='%b',
        image='%s'
        links='%b',
    )>""" % (
        self.index,
        self.title,
        self.total_time,
        self.yields,
        self.ingredients,
        self.instructions,
        self.image,
        self.links
    )


def init():
    Base.metadata.create_all(engine)

def parse_to_sql(recipes, table_name):

    recipes.index = [uuid.uuid4().hex for _ in range(len(recipes.index))]

    recipes['Ingredients'] = recipes['Ingredients'].astype('str')
    recipes['Links'] = recipes['Links'].astype('str')
    
    drecipes = dd.from_pandas(recipes, npartitions=2)

    metadata = MetaData(bind=engine, reflect=True)
    table = Table(table_name, metadata, autoload=True)

    local_session = Session()

    dto_sql = dask.delayed(pd.DataFrame.to_sql)
    
    out = [dto_sql(d, table_name, "sqlite:///nutritio.db", if_exists='append', index=True)
        for d in drecipes.to_delayed()]
    
    dask.compute(*out)
    
    local_session.commit()

    print("Saved recipe to DB")
    
    # Close the session
    local_session.close()
```

I store the information inside a class which becomes the modelled ORM that is then parsed to sql.

Okay moving on. One important note here is that I am making use of another Github project to help with the scraping of common recipe websites.

You can find that information here. [https://github.com/hhursev/recipe-scrapers](https://github.com/hhursev/recipe-scrapers).

#### How to run parralel selenium processes:

```python
from multiprocessing import Pool, cpu_count

def run_parallel_selenium_processes(datalist, selenium_func):

    pool = Pool()

    # max number of parallel process
    ITERATION_COUNT = cpu_count()-1

    count_per_iteration = len(datalist) / float(ITERATION_COUNT)

    for i in range(0, ITERATION_COUNT):
        list_start = int(count_per_iteration * i)
        list_end = int(count_per_iteration * (i+1))
        pool.apply_async(selenium_func, [datalist[list_start:list_end]])
```

I made use of the `Tor` browser to do my scraping. But you can make use of any browser you are comfortable with. One important thing to remember if you are going to do scraping of another site which is not your own is to do it at a pace which will not overwhelm the server you are scraping on.

You can find the code for scraping the `allrecipes` site below:

```python
import os
from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary

binary = '/Applications/Tor Browser.app/Contents/MacOS/firefox'
if os.path.exists(binary) is False:
    raise ValueError("The binary path to Tor firefox does not exist.")
firefox_binary = FirefoxBinary(binary)

import urllib3
import time
import db
import json
import recipe_scrapers as rs
import pandas as pd
import dask
import dask.dataframe as dd

from string import ascii_uppercase

from . import automater

def allrecipes():

    ranges = [
        # [(6663, 7000), (7001, 7500), (7501, 8000), (8001, 8500), (8501, 9000), (9001, 9500)],
        # [(9501, 10000), (10001, 10500), (10501, 11000), (11001, 11500), (11501, 12000), (12001, 12500)],
        # [(12501, 13000), (13001, 13500), (13501, 14000), (14001, 14500), (14501, 15000), (15001, 15500)],
        [(15501, 16000), (16001, 16500), (16501, 17000), (17001, 17500), (17501, 18000), (18001, 18500)],
        # [(18501, 19000), (19001, 19500), (20501, 21000), (21001, 21500), (21501, 22000), (22001, 22500)],
    ]

    for x in ranges:
        x1 = dask.delayed(parse_allrecipes)(x[0], 'allrecipes')
        x2 = dask.delayed(parse_allrecipes)(x[1], 'allrecipes')
        x3 = dask.delayed(parse_allrecipes)(x[2], 'allrecipes')
        x4 = dask.delayed(parse_allrecipes)(x[3], 'allrecipes')
        x5 = dask.delayed(parse_allrecipes)(x[4], 'allrecipes')
        x5 = dask.delayed(parse_allrecipes)(x[5], 'allrecipes')

    y = dask.delayed()([x1, x2, x3, x4, x5]).compute()

def parse_allrecipes(pages, table_name):
    browser = webdriver.Firefox(firefox_binary=binary)

    # browser = Firefox(options=opts)
    site = 'https://www.allrecipes.com/recipe/'

    http = urllib3.PoolManager()

    for recipe in range(pages[0], pages[1]):
        try:
            browser.get(site + str(recipe))
            time.sleep(1)

            scraper = rs.scrape_me(browser.current_url)

            recipe_dict = {
                'Title': scraper.title(),
                'Total Time': scraper.total_time(),
                'Yields': scraper.yields(),
                'Ingredients': scraper.ingredients(),
                'Instructions': scraper.instructions(),
                'Image': scraper.image(),
                'Links': scraper.links()
            }

            subdf = pd.DataFrame([recipe_dict.values()], columns=["Title", "Total Time", "Yields", "Ingredients", "Instructions", "Image", "Links"])
            db.parse_to_sql(subdf, table_name)
        except:
            continue


def run():
    try:
        allrecipes()

    except Exception as e: 
        print(e)
```

It is important to notice that `Dask` will only execute your code once you call `compute()`. This will then create a database table that should look something similar to below:

![DBSQL](assets/images/dbsqlite-img.png)

So you will notice that we have a bunch of unwanted `Bummer.` entries in the DB which we will need to clean.

Which I probably never mentioned above is that to run the code you simply call `pipenv run python ./main.py`

## Food Recipe Analysis and Data Cleansing

Start off by opening a new Jupyter notebook `pipenv run jupyter notebook`. I did initially work like this. However later changed to my free tier AWS account. But for the purposes of this tutorial all code should be able to run on a CPU.

Then open the SQL Lite database using pandas.

```python
import pandas as pd

recipes = pd.read_sql_table("allrecipes", "sqlite:///nutritio.db")
```

`recipes.head()` and `recipes.info()` should produce something like this:

![Recipes-head](assets/images/recipes-head.png)

To get rid of the unecessary 404 pages added into the DB. We can do the following:

```python
recipes.drop_duplicates(subset=['Title'], keep='first', inplace=True)
recipes.drop(recipes.index[:1], inplace=True)
recipes.head()
```

## Topic Modelling

In machine learning and natural language processing, a topic model is a type of statistical model for discovering the abstract "topics" that occur in a collection of documents. Topic modeling is a frequently used text-mining tool for discovery of hidden semantic structures in a text body.

So basically we are going to split up the recipes according to their images and recipe title into different topics.

Making use of the following imports and libraries:

```python
import csv
import random
from operator import itemgetter

from stop_words import get_stop_words
from nltk.tokenize import RegexpTokenizer
from nltk.stem.snowball import SnowballStemmer

from sklearn.manifold import TSNE
from sklearn.externals import joblib
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.decomposition import NMF, LatentDirichletAllocation

from gensim import corpora, models
import gensim

import pandas as pd
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib
%matplotlib inline

from pprint import pprint
import pyLDAvis.gensim as gensimvis
import pyLDAvis
pyLDAvis.enable_notebook()
```

If you go through this notebook found on my [Github](https://github.com/nutritio/nutritio_food_cnn).

You will see there is some code for doing the following in order to get the Recipe Title to a form which is clean and usable.

* remove leading and ending spaces
* remove leading and ending spaces
* remove all quotes
* again remove leading and ending spaces
* agains remove all quotes '
* remove (...)
* remove -
* again remove leading and ending spaces
* add space around -
* remove all numbers
* remove everything but letters
* again remove leading and ending spaces
* remove all single letters
* remove empty entries

This left me with 7433 entries which is not a lot. If you would like to improve the model I recommend scraping more than one website from the `recipe_scrapers` Github repo.

```python
print('After 16 handcrafted conditions, the whole thing looks like this: \n >>>')
pprint(random.sample(sixteenth_iter, len(sixteenth_iter))[:50])
```

Output:

```
After 16 handcrafted conditions, the whole thing looks like this: 
 >>>
['Amish Friendship Bread III',
 'Pork Chops la Slow Cooker',
 'Super Crispy Roasted Goose',
 'Old Fashioned Apple Cream Pie',
 'Cream Cheese and Ham Spread',
 'Fried Chicken Tenders',
 'No Bake Cheesecake II',
 'Mock Lemon Chiffon Cake',
 'Moist Date Cake',
 'Key Lime Cookies',
 'Rocky Road Turtles Cake',
 'Garlic Cheese Biscuits',
 'Chocolate Cream Pie II',
 'White Chocolate and Cranberry Cookies',
 'Hanky Pankies',
 'Cranberry Meatballs',
 'Shrimp and Okra Gumbo',
 'Spiced Tea Mix',
 'Soda Cracker Cookies',
 'Lemony Grape Cooler',
 'Reduced Fat French Toast',
 'Ham and Asparagus Casserole',
 'Strawberry Shortcake',
 'Red Wine Cake',
 'Buffalo Chicken Strips II',
 'Casa Marina',
 'Rocky Road Bars',
 'Crunchies',
 'Cherry Delight with Walnut Crust',
 'Amaretto Smoothie',
 'Apple Bundt Cake',
 ...
 ...
```

### Remove stopwords and parent form reduction

_Next remove unwanted words like ones, oneself, some, baked, etc. and reduce words to their word stem._

This is to prevent the categories from being skewed with unwanted topics.

```python
de_stop = get_stop_words('english')
s_stemmer = SnowballStemmer('english')
tokenizer = RegexpTokenizer(r'\w+')
final_names = []
filter_words_ = ['low carb',
               'vegan', 
               'smokey',
               'fast',
               'quickly',
               'single',
               'baked',
               'fried',
               'green',
               'vegetables', 
               'vegetarian',
               'Italian',
               'sharp',
               'appetiser',
               'pan',
               'mini',
               'warmer',
               'filled',
               'full',
               'piquant',
               'faster',
               'recipe',
               'dessert',
               'colorful',
               'bake',
               'timed',
               'gran',
               'pot',
               'mediterranean',
               'times',
               'juicy',
               'juicier',
               'juiciest',
               'number',
               'dinner',
               'Achim',
               'carbohydrate',
                'ii',
                'iii',
                'iv',
                'vi',
                'vii',
                'vii']

for recipe_name in sixteenth_iter:
    raw = recipe_name.lower()
    tokens = tokenizer.tokenize(raw)
    stop_t = [recipe_name for recipe_name in tokens if not recipe_name in de_stop and not recipe_name in filter_words_]
    stem_t = [i for i in stop_t if len(i)>1]
    if len(stem_t)==0: final_names.append(['error'])
    else: final_names.append(stem_t)

print('Ready-cleaned recipe names: \n >>>')
pprint(final_names[:20])
```

You can add more _stopwords_ if you find it necessary. For the purposes of this small project I decided to continue.

This should leave an output as follows:

```
Ready-cleaned recipe names: 
 >>>
[['wild', 'rice', 'soup'],
 ['candy', 'ice', 'cream'],
 ['rhubarb', 'pie'],
 ['chocolate', 'sausage'],
 ['vermont', 'maple', 'float'],
 ['five', 'ingredient', 'ice', 'cream'],
 ['cheezy', 'cheezy'],
 ['indian', 'vegetable', 'rice'],
 ['country', 'banana', 'bread'],
 ['leftover', 'casserole'],
 ['cherry'],
 ['buttermilk', 'biscuits'],
 ['best', 'ever', 'hot', 'artichoke', 'dip'],
 ['egg', 'sandwich'],
 ['chi', 'chis', 'corn', 'cake'],
 ['funnel', 'cakes'],
 ['easy', 'banana', 'fritters'],
 ['chocolate', 'chip', 'cookie', 'ice', 'cream', 'cake'],
 ['apple', 'nut', 'muffins'],
 ['cornmeal', 'mush']]
```

So now we can clearly see our topics starting to come together.

#### Trials of Topic Modelling

1. Latent Dirichlet Allocation (LDA) with 250 Topics
1. Hierarchical Dirichlet Process
1. Non-negative matrix factorization

Each of these produced different results. Some more accurate than others. I still need to fully read up on each of these topics as they are very interesting. But for now let's get this code working and in a later post I will dwelve into much more detail about the forms of Topic Modelling.

## Latent Dirichlet Allocation (LDA)

I also couldn't get any results for the first LDA I tried. I am yet to discover why this is the reason. But I assume it has something to do with the small dataset I am making use of.

We need to ensure we are using proper English words and to do that we make use of a library called `nltk`. We also then tokenise our sample set.

```python
dictionary = corpora.Dictionary(final_names)
# save dictionary
dictionary.save('input/test/topic_modeling_dictionary_2.dict')
corpus = [dictionary.doc2bow(text) for text in final_names]
# save corpus
corpora.MmCorpus.serialize('input/test/corpus_2_lda.mm', corpus)
```

Now to create the model.

```python
%%time
# generate LDA model
ldamodel = models.ldamodel.LdaModel(corpus, num_topics=250, id2word = dictionary, passes=15)
ldamodel.save('input/test/categories_250_61052_lda.model')
```

After saving our model. We then load it and inspect it.

```python
ldamodel = models.ldamodel.LdaModel.load('input/test/categories_250_61052_lda.model')
ldamodel.print_topics()[:10]
```

We should get and output similar to something like this.

```
[(99,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"'),
 (93,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"'),
 (198,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"'),
 (85,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"'),
 (245,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"'),
 (120,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"'),
 (76,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"'),
 (140,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"'),
 (204,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"'),
 (125,
  '0.000*"rocks" + 0.000*"elsyes" + 0.000*"muesli" + 0.000*"sfinge" + 0.000*"middles" + 0.000*"fazul" + 0.000*"marnier" + 0.000*"church" + 0.000*"lenas" + 0.000*"windows"')]
```

From the output above you can see that there is already something not quite right about this model. Why is everything `0.000*`

I still need to figure this out. But moving on to the next modelling technique.

## Hierarchical Dirichlet Process

This technique did produce some results which I found to be farely accurate.

The difference to LDA here is that with HDP no number of topics must be determined from the outset. The number of recommended topics is determined during the run itself. With parameter T you can determine how many topics have to be calculated at least.

```python
%%time
# generate HDP model
hdp = models.hdpmodel.HdpModel(corpus, dictionary, T=100)
hdp.save('input/test/categories_hdp_new.model')
```

```python
hdp = models.hdpmodel.HdpModel.load('input/test/categories_hdp_new.model')
hdp.print_topics()[:10]
```

Output

```
[(0,
  '0.003*tuppakaka + 0.002*crispy + 0.002*shoo + 0.002*carroty + 0.002*totally + 0.002*flips + 0.002*wonders + 0.002*jennys + 0.002*rays + 0.002*dirty'),
 (1,
  '0.002*dulces + 0.002*stacks + 0.002*regular + 0.002*lovely + 0.002*poulet + 0.002*cooked + 0.002*panettone + 0.002*cock + 0.002*korean + 0.002*coming'),
 (2,
  '0.003*teddy + 0.003*bellas + 0.002*apples + 0.002*hour + 0.002*shiny + 0.002*cantucci + 0.002*whiz + 0.002*abernathy + 0.002*rorys + 0.002*amby'),
 (3,
  '0.003*devils + 0.003*amariette + 0.002*ix + 0.002*rican + 0.002*monstrosity + 0.002*sloppy + 0.002*ds + 0.002*turkey + 0.002*autumn + 0.002*get'),
 (4,
  '0.004*cherokee + 0.003*fruitcake + 0.002*leekie + 0.002*daniels + 0.002*root + 0.002*holly + 0.002*hoppin + 0.002*indiana + 0.002*spaghetti + 0.002*neecies'),
 (5,
  '0.003*ricotta + 0.003*welfare + 0.002*turtle + 0.002*bread + 0.002*eggplant + 0.002*neecies + 0.002*sugarless + 0.002*saute + 0.002*deee + 0.002*stone'),
 (6,
  '0.003*nogada + 0.002*cabbage + 0.002*clouds + 0.002*wacky + 0.002*thimble + 0.002*famous + 0.002*jerky + 0.002*processor + 0.002*cantaloupe + 0.002*jeweled'),
 (7,
  '0.004*escabeche + 0.003*amazing + 0.002*oklahoma + 0.002*bubbly + 0.002*paint + 0.002*goodbar + 0.002*beauty + 0.002*fail + 0.002*mist + 0.002*popcorn'),
 (8,
  '0.003*liquors + 0.002*ritz + 0.002*edies + 0.002*tostones + 0.002*yung + 0.002*haystacks + 0.002*club + 0.002*barbequed + 0.002*freeze + 0.002*pimento'),
 (9,
  '0.003*noel + 0.002*bettys + 0.002*giardino + 0.002*aargau + 0.002*banana + 0.002*york + 0.002*ekmek + 0.002*jens + 0.002*ortega + 0.002*congee')]
```

This produces a much clearer result. Which we can visualise using the `pyLDAvis` library.

```python
vis_data_hdp = gensimvis.prepare(hdp, corpus, dictionary)
pyLDAvis.display(vis_data_hdp)
```

You should now see something similar to the following:

![PLyDAVIS](assets/images/plydavis-graph.png)
