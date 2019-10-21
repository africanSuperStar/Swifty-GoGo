---
layout: disqus
title: SQL Alchemy - Part 1
date: 2019-10-14 13:59 +0200
comments: true
permalink: sqlalchemy-part1/
---

So as part of my quest to learning I take part in writing articles to help myself better understand concepts. This particular post will be about `SQL Alchemy`. A popular python library for writing SQL statements.

Directly from the documentation you can read:

| The SQLAlchemy Expression Language presents a system of representing relational database structures and expressions using Python constructs. These constructs are modeled to resemble those of the underlying database as closely as possible, while providing a modicum of abstraction of the various implementation differences between database backends. While the constructs attempt to represent equivalent concepts between backends with consistent structures, they do not conceal useful concepts that are unique to particular subsets of backends. The Expression Language therefore presents a method of writing backend-neutral SQL expressions, but does not attempt to enforce that expressions are backend-neutral.

So that's quite a lot to take in. So I've simplified it to certain points.

1. SQLAlchemy uses python to represent relational database structures.
1. The constructs model the underlying architecture as closely as possible. (SQLLite, SQL, PostgreSQL)
1. While providing a lot of flexibility with platform agnostic expressions.

Now I will dedicate my time to writing a tutorial on a Flask Project making use of SQL Alchemy.

### Part One: 

Set up a local development environment and then deploy both a staging and a production environment on Firebase. (current)

First things first. Let's setup a new Flask project.

```shell
mkdir flask-project && cd flask-project
```

I've decided to use `Pipenv` to manage my dependencies. You could however use something else.

