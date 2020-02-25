---
layout: post
title: Automatic Reference Counting
date: 2020-02-25 22:27 +0200
comments: true
permalink: automatic-reference-counting/
---

So recently I was asked what Automatic Reference Counting was and I couldn't answer someone. This really shocked me. How could I not know what it was. So I decided to write an article about it.

---

## Automatic Reference Counting

I mean really it does explain it in the title. After some thought.

What is a reference? Basically in laymans terms a reference is a hold onto a block of memory. If you think carefully and remember that _Classes_ are reference types and that _Structs_ are value types.

Then I started thinking further. What holds onto this block of memory. Well it's mostly `self` and closures. Then I started thinking about the name.

_Automatic Reference Counting_. In the end I came to the conclusion that ARC is just Apple's fancy way of say garbage collection. It's the automatic allocation and deallocation of memory.

| 💡 Alas. Remember that names of terms are very useful in deducing what they mean and how they are used.

So for the most part Swift manages the memory for you in your application for _reference_ types.

### However, in a few cases ARC requires more information about the relationships between parts of your code in order to manage memory for you.

| 🚨 Remember reference counting only applies to _instances_ of classes. Other value types such as Structures and Enumerations are not stored and passed by reference.

## How does ARC Work?



