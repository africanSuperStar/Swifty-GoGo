---
layout: disqus
title: What is Dask?
date: 2019-10-01 00:38 +0200
comments: true
permalink: what-is-dask/
---

Dask is a flexible library for parallel computing in Python. That's what it is. 

Huh??? Oh no. Parallel computing. Yes let's thank the demi-gods who created this library. Why I say this is, because parallel execution is really difficult. It's specifically more difficult at scale.

Dask is able to scale from a single computer to multiple clusters running with Kubernetes in the cloud.

_From the Dask Tutorial Project_

| High level collections:
| Dask provides high-level Array, Bag, and DataFrame collections that mimic NumPy, lists, and Pandas but can operate in parallel on datasets that don't fit into memory. Dask's high-level collections are alternatives to NumPy and Pandas for large datasets.

| Low Level schedulers: 
| Dask provides dynamic task schedulers that execute task graphs in parallel. These execution engines power the high-level collections mentioned above but can also power custom, user-defined workloads. These schedulers are low-latency (around 1ms) and work hard to run computations in a small memory footprint. Dask's schedulers are an alternative to direct use of threading or multiprocessing libraries in complex cases or other task scheduling systems like Luigi or IPython parallel.

I've gone through the tutorial and I've modified it slightly. I will be using this series of posts to create CNN for Food Recipe Recognition.

### Prepare

Start off by cloning the repository at [https://github.com/africanSuperStar/swgg-dask.git](`https://github.com/africanSuperStar/swgg-dask.git`){:target="_blank"}.

The included file `environment.yml` in the binder subdirectory contains a list of all of the packages needed to run this tutorial. To install them using conda, you can do

```bash
conda env create -f binder/environment.yml
conda activate swgg-dask
```

Once that's done we'll be using `Dask` and `Selenium` to get recipes from various websites.

| This is an experiment for a hackathon I'm participating in. Please ensure your use of the data from scraping these websites is permitted if you decide to use any of this information in a commercial application.

__TODO: Write on getting the data with Dask__

_From the tutorial section of the Dask Tutorial_ 

| Foundations: 
| An explanation of what Dask is, how it works, and how to use lower-level primitives to set up computations. Casual users may wish to skip this section, although we consider it useful knowledge for all users.
| Distributed:
| Information on running Dask on the distributed scheduler, which enables scale-up to distributed settings and enhanced monitoring of task operations. The distributed scheduler is now generally the recommended engine for executing task work, even on single workstations or laptops.
| Collections:
| Convenient abstractions giving a familiar feel to big data
| Bag:
| Python iterators with a functional paradigm, such as found in func/iter-tools and toolz - generalize lists/generators to big data; this will seem very familiar to users of PySpark's RDD
| Array:
| Massive multi-dimensional numerical data, with Numpy functionality
| DataFrames:
| Massive tabular data, with Pandas functionality