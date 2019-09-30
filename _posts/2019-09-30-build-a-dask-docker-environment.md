---
layout: disqus
title: Build a Dask Docker Environment
date: 2019-09-30 21:13 +0200
comments: true
permalink: dask-docker-environment/
---

In this post I will discuss the steps needed to install Docker and create a Dask / Jupyter environment.

Docker has come a really long way since it started. It's a constantly evolving technology. So this post may be outdated by the time you read it.

Bearing that in mind let's get started.

__Head over to [Getting Started](https://www.docker.com/get-started){:target="_blank"}__ to download Docker. These days they require you to create an account and register. If you're on a Mac or Windows you can just download the installer and run the application.

They now also have a nice walkthrough which you can follow.

After that run the following command to pull the Docker image:

```
docker pull daskdev/dask-notebook
```

Then literally create your `Dockerfile` in your project as such.

```ruby
FROM daskdev/dask-notebook

USER root
```

And `RUN` any other docker commands you see fit.

Then inside the project from the command line run:

```
docker build --tag=<TAG_NAME> .
```

If you're a linux you need to follow the extra steps outline [here](https://docs.docker.com/get-started/part2/){:target="_blank"}.

Then to run the application is as simple as:

```
docker run -it -p 8888:8888 <TAG_NAME>
```

You should get a message like this in your console:

```
To access the notebook, open this file in a browser:
    file:///home/jovyan/.local/share/jupyter/runtime/nbserver-6-open.html
Or copy and paste one of these URLs:
    http://81781b6a3bd6:8888/?token=f9bf857ad2c87ec176307ba76bfa346824e985ab4b5cda73
    or http://127.0.0.1:8888/?token=f9bf857ad2c87ec176307ba76bfa346824e985ab4b5cda73
```

Navigate to one of the links. You will need the token to be able to access the materials.

That's it. You should now be setup to use Dask and Jupyter.