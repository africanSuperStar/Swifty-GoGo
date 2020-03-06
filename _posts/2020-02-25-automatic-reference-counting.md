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

![Automatic Reference Counting](/assets/images/ARC/ARC.001.png)

Each time you create a reference type. ARC allocates a chunk of memory to that pointer to store information about that instance. This memory contains information about the type of the instance, together with any stored values. _Hence my mission to code without too many stored references_.

So additionally once an instance is no longer needed the pointer is deallocated from the block of memory. __This is why we need to call the dispose method in RxSwift__.

| 🚨But what happens if the _Class_ is deallocated while some of it's properties still have strong references.

While it is most likely that your application will cause a runtime exception. 😱 Which is not a great thing. To make sure that instances don't disappear while they are still needed, ARC tracks how many properties, constants, and variables are currently referring to each class instance. 

| 💡ARC will not deallocate the class instance until all of it's children properties are dealocated.

So in order to keep track Swift will create a _strong reference_ to the class instance each time a constant, variable, function, closures is allocated. It is called a strong reference, because it won't deallocate itself until it's firm grip on the instance is released.


# Why counting though?

So looking at the following example:

```swift
class Truck {
	let name: String

	init(name: String) {
		self.name = name
	}
}

var ref1: Truck?
let ref2: Truck?
var ref3: Truck? // Currently assigned the value of nil

ref1 = Truck(name: "Monster Truck")
// One reference to Truck counted
ref2 = Truck(name: "Mahindra")
// Two references to Truck counted
ref1 = nil
// One reference to Truck counted
ref2 = nil
// All strong references are broken. Truck is now deallocated.
```

ARC does not deallocate the Truck instance until all strong references are broken.


