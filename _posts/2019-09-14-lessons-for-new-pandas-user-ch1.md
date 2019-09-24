---
layout: disqus
title: Lessons for new Pandas User's Chapter 1
author: Cameron de Bruyn
comments: true
---

The lesson for this post can be found in [this][1] Jupyter notebook.

Today we'll go simply through 5 core steps for understanding `Pandas`.

  * Create Data
  * Get Data
  * Prepare Data
  * Analyze Data
  * Present Data

| The pandas library is used for all the data analysis excluding a small piece of the data presentation section. The matplotlib library will only be needed for the data presentation section. Importing the libraries is the first step we will take in the lesson.

```python
# Import all libraries needed for the tutorial

# General syntax to import specific functions in a library: 
##from (library) import (specific library function)
from pandas import DataFrame, read_csv

# General syntax to import a library but no functions: 
##import (library) as (give the library a nickname/alias)
import matplotlib.pyplot as plt
import pandas as pd #this is how I usually import pandas
import sys #only needed to determine Python version number
import matplotlib #only needed to determine Matplotlib version number

# Enable inline plotting
%matplotlib inline
```

```python
print('Python version ' + sys.version)
print('Pandas version ' + pd.__version__)
print('Matplotlib version ' + matplotlib.__version__)
```

### Create Data

We begin by creating our own data set for analysis. This prevents the end user reading this tutorial from having to download any files to replicate the results below. We will export this data set to a text file so that you can get some experience pulling data from a text file.

The data set will consist of 5 baby names and the number of births recorded for that year (1880).

```python
# The inital set of baby names and birth rates
names = ['Bob','Jessica','Mary','John','Mel']
births = [968, 155, 77, 578, 973]
```

To merge these two lists together we will use the __zip__ function.

```python
zip?
```

```python
BabyDataSet = list(zip(names,births))
BabyDataSet
```

The output returned from *zipping* is:

```python
[('Bob', 968), ('Jessica', 155), ('Mary', 77), ('John', 578), ('Mel', 973)]
```

We are basically done creating the data set. We now will use the ***pandas*** library to export this data set into a csv file.

***df*** will be a ***DataFrame*** object. You can think of this object holding the contents of the BabyDataSet in a format similar to a sql table or an excel spreadsheet. Lets take a look below at the contents inside ***df***.

```python
df = pd.DataFrame(data = BabyDataSet, columns=['Names', 'Births'])
df
```

|   | Names	  | Births |
| - | ------- | ------ |
| 0	| Bob	    | 968    |
| 1	| Jessica	| 155    |
| 2	| Mary	  | 77     |
| 3	| John	  | 578    |
| 4	| Mel	    | 973    |

Export the dataframe to a ***csv*** file. We can name the file births1880.csv. The function ***to_csv*** will be used to export the file. The file will be saved in the same location of the notebook unless specified otherwise.

```python
df.to_csv?
```

The only parameters we will use is index and header. Setting these parameters to False will prevent the index and header names from being exported. Change the values of these parameters to get a better understanding of their use.

### Get Data


[1]: https://nbviewer.jupyter.org/urls/bitbucket.org/hrojas/learn-pandas/raw/master/lessons/01%20-%20Lesson.ipynb
