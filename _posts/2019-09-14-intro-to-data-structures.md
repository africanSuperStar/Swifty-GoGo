---
layout: post
title: Pandas - Intro to Data Structures
author: Cameron de Bruyn
date: 2019-09-14 22:43 +0200
categories: data structures intro
---

# Intro to Data Structures

We’ll start with a quick, non-comprehensive overview of the fundamental data structures in pandas to get you started. The fundamental behavior about data types, indexing, and axis labeling / alignment apply across all of the objects. To get started, import numpy and load pandas into your namespace:

```python
import numpy as np

# will use a lot in examples
randn = np.random.randn

from pandas import *
```

Here is a basic tenet to keep in mind: ***data alignment is intrinsic***. The link between labels and data will not be broken unless done so explicitly by you.

We’ll give a brief intro to the data structures, then consider all of the broad categories of functionality and methods in separate sections.

When using pandas, we recommend the following import convention:

```python
import pandas as pd
```

### [Series][1]

| **Warning** In 0.13.0 Series has internaly been refactored to no longer sub-class ndarray but instead subclass NDFrame, similarly to the rest of the pandas containers. This should be a transparent change with only very limited API implications (See the Internal Refactoring)

---
<br/>

**[Series][1]** is a one-dimensional labeled array capable of holding any data type (integers, strings, floating point numbers, Python objects, etc.). The axis labels are collectively referred to as the index. The basic method to create a Series is to call:

```python
s = Series(data, index=index)
```

The passed index is a list of axis labels. Thus, this separates into a few cases depending on what data is:

#### **From ndarray**

If data is an ndarray, index must be the same length as data. If no index is passed, one will be created having values [0, ..., len(data) - 1].

```python
In [4]: s = Series(randn(5), index=['a', 'b', 'c', 'd', 'e'])

In [5]: s
Out[5]: 
a   -2.783
b    0.426
c   -0.650
d    1.146
e   -0.663
dtype: float64

In [6]: s.index
Out[6]: Index([u'a', u'b', u'c', u'd', u'e'], dtype='object')

In [7]: Series(randn(5))
Out[7]: 
0    0.294
1   -0.405
2    1.167
3    0.842
4    0.540
dtype: float64
```

#### **From dict**

If data is a dict, if index is passed the values in data corresponding to the labels in the index will be pulled out. Otherwise, an index will be constructed from the sorted keys of the dict, if possible.

```python
In [8]: d = {'a' : 0., 'b' : 1., 'c' : 2.}

In [9]: Series(d)
Out[9]: 
a    0
b    1
c    2
dtype: float64

In [10]: Series(d, index=['b', 'c', 'd', 'a'])
Out[10]: 
b     1
c     2
d   NaN
a     0
dtype: float64
```

#### **From scalar value**

If data is a scalar value, an index must be provided. The value will be repeated to match the length of index

```python
In [11]: Series(5., index=['a', 'b', 'c', 'd', 'e'])
Out[11]: 
a    5
b    5
c    5
d    5
e    5
dtype: float64
```

[1]: ''
