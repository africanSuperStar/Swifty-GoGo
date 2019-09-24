---
layout: disqus
title: Panda Series Part 1
date: 2019-09-14 23:11 +0200
comments: true
---

### Series is ndarray-like

Series acts very similarly to a ndarray, and is a valid argument to most NumPy functions. However, things like slicing also slice the index.

```python
In [12]: s[0]
Out[12]: -2.7827595933769942

In [13]: s[:3]
Out[13]: 
a   -2.783
b    0.426
c   -0.650
dtype: float64

In [14]: s[s > s.median()]
Out[14]: 
b    0.426
d    1.146
dtype: float64

In [15]: s[[4, 3, 1]]
Out[15]: 
e   -0.663
d    1.146
b    0.426
dtype: float64

In [16]: np.exp(s)
Out[16]: 
a    0.062
b    1.532
c    0.522
d    3.147
e    0.515
dtype: float64
```

### Series is dict-like

A Series is like a fixed-size dict in that you can get and set values by index label:

```python
In [17]: s['a']
Out[17]: -2.7827595933769942

In [18]: s['e'] = 12.

In [19]: s
Out[19]: 
a    -2.783
b     0.426
c    -0.650
d     1.146
e    12.000
dtype: float64

In [20]: 'e' in s
Out[20]: True

In [21]: 'f' in s
Out[21]: False
```

If a label is not contained, an exception is raised:

```python
>>> s['f']
KeyError: 'f'
```

Using the `get` method, a missing label will return None or specified default:

```python
In [22]: s.get('f')

In [23]: s.get('f', np.nan)
Out[23]: nan
```