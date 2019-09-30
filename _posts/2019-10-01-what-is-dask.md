---
layout: disqus
title: What is Dask?
date: 2019-10-01 00:38 +0200
comments: true
permalink: what-is-dask/
---

Dask is a flexible library for parallel computing in Python. That's what it is. 

Huh??? Oh no. Parallel computing. Yes let's thank the demi-gods who created this library. Why I say this is, because parallel execution is really difficult. it's specifically more difficult at scale.

Dask is able to scale from a single computer to multiple clusters running with Kubernetes in the cloud.

_From the Dask Tutorial Project_

| High level collections:
| Dask provides high-level Array, Bag, and DataFrame collections that mimic NumPy, lists, and Pandas but can operate in parallel on datasets that don't fit into memory. Dask's high-level collections are alternatives to NumPy and Pandas for large datasets.

| Low Level schedulers: 
| Dask provides dynamic task schedulers that execute task graphs in parallel. These execution engines power the high-level collections mentioned above but can also power custom, user-defined workloads. These schedulers are low-latency (around 1ms) and work hard to run computations in a small memory footprint. Dask's schedulers are an alternative to direct use of threading or multiprocessing libraries in complex cases or other task scheduling systems like Luigi or IPython parallel.