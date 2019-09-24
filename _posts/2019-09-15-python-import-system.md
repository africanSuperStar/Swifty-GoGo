---
layout: post
title: Python Import System
date: 2019-09-15 06:55 +0200
author: Cameron de Bruyn
categories: import python
---

#### Packages

Packages are a way of structuring Python’s module namespace by using “dotted module names”. For example, the module name `A.B` designates a submodule named `B` in a package named `A`. Just like the use of modules saves the authors of different modules from having to worry about each other’s global variable names, the use of dotted module names saves the authors of multi-module packages like NumPy or Pillow from having to worry about each other’s module names.

Suppose you want to design a collection of modules (a “package”) for the uniform handling of sound files and sound data. There are many different sound file formats (usually recognized by their extension, for example: .wav, .aiff, .au), so you may need to create and maintain a growing collection of modules for the conversion between the various file formats. There are also many different operations you might want to perform on sound data (such as mixing, adding echo, applying an equalizer function, creating an artificial stereo effect), so in addition you will be writing a never-ending stream of modules to perform these operations. Here’s a possible structure for your package (expressed in terms of a hierarchical filesystem):

```
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

| When importing the package, Python searches through the directories on sys.path looking for the package subdirectory.

The **__init__.py** files are required to make Python treat directories containing the file as packages. This prevents directories with a common name, such as string, unintentionally hiding valid modules that occur later on the module search path. In the simplest case, **__init__.py** can just be an empty file, but it can also execute initialization code for the package or set the **__all__** variable, described later.

Users of the package can import individual modules from the package, for example:

```python
import sound.effects.echo
```

This loads the submodule sound.effects.echo. It must be referenced with its full name.

sound.effects.echo.echofilter(input, output, delay=0.7, atten=4)

An alternative way of importing the submodule is:

```python
from sound.effects import echo
```

This also loads the submodule echo, and makes it available without its package prefix, so it can be used as follows:

```python
echo.echofilter(input, output, delay=0.7, atten=4)
```

Yet another variation is to import the desired function or variable directly:

```python
from sound.effects.echo import echofilter
```

Again, this loads the submodule echo, but this makes its function echofilter() directly available:

```python
echofilter(input, output, delay=0.7, atten=4)
```

#### Absolute imports

An absolute import specifies the resource to be imported using its full path from the project’s root folder.

Let's say you have the following project structure:

```
└── project
    └── package
        ├── __init__.py
        ├── module1.py
        ├── module2.py
        └── subpackage
            └── module3.py
```

You should edit `package/__init__.py` and place the following code in there:

```python
name = "package"
```

This is just so that you can verify that it installed correctly later in this tutorial and is not used by PyPI.

[1]: 'https://docs.python.org/3/library/importlib.html#importlib.import_module'
[2]: 'https://docs.python.org/3/library/functions.html#__import__'
