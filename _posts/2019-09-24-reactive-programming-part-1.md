---
layout: disqus
title: Reactive Programming - Part 1
date: 2019-09-24 10:50 +0200
comments: true
permalink: rxswift-part1
---

So you might have heard the lingo before, `Events`, `Sinks`, `Schedulers`, `Streams`. These are just a few of the words used
in the asynchronous coding community. So what is everyone talking about. I must admit the first time I tried to learn about
__Reactive Programming__ I had no idea what was going on. It is difficult to understand and I'm assuming the reader already
has a solid grasp of the Swift Language before continuing with this series of posts.

Two of the best resources I recommend for beginners to start understanding the theory behind this coding style are the following resources

* [Intro to Rx](http://introtorx.com/) by Lee Campbell
* [Your Mouse is a Database](https://queue.acm.org/detail.cfm?id=2169076) by Erik Meijer

The key take away from the [Getting Started](http://introtorx.com/Content/v1.0.10621.0/01_WhyRx.html) section is that reactive programming
consists of the following principles which make it so powerful.

* Integrated
* Unitive
* Extensible
* Declarative
* Composable
* Transformable

So let's try come up with a formal definition for `Reactive Programming`.

| Reactive Programming is a style of programming for composing asynchronous and event-based code. It listens to streams of data by using observable sequences and functional style operators, allowing for parameterized execution via schedulers.

Previously programmers were adept at using `Enumerable` operations which meant they would loop through data on events. But that's just it. Events are not static. They are streams. Imagine them as a flowing living thing. Iterating through data could block a thread. Instead `RxSwift` which is just a library of Reactive Extensions uses the `Observer` / `Observable` pattern to listen to streams of data.

---

## So why all the fuss?

User expect things to happen immediately. On average if a button tap  or mouse click takes longer than 3 seconds to respond. Users get bored and move on to another page. This is not good for business. Responses to events need to happen in near real time for experiences to be engaging. This is true for nearly all domains. Online gaming, push notifications, video streaming, online banking.

![Reactive Description](assets/images/RxSwift-1-dark/RxSwift-1-dark.001.png)

Apple does a great of job of managing multiple processes within an application on multiple thread within different cores on the CPU.

As you come to see that `Reactive Programming` is slightly functional in nature. Hence if you have ever done programming in OCaml, Haskell or Elixer. You will come to acknoledge the declarative and compositional nature of `RxSwift`. Which is why pieces of code such as closures are also asyncronous in nature.

Before I continue. It is imperative that you read through the Apple docs on [@escaping closures](https://docs.swift.org/swift-book/LanguageGuide/Closures.html)

_From the Apple Docs..._

| A closure is said to escape a function when the closure is passed as an argument to the function, but is called after the function returns. When you declare a function that takes a closure as one of its parameters, you can write @escaping before the parameter’s type to indicate that the closure is allowed to escape.

_From the RxSwift Library_

Lists and sequences are probably one of the first concepts mathematicians and programmers learn.

Here is a sequence of numbers:

```
--1--2--3--4--5--6--| // terminates normally
```

Another sequence, with characters:

```
--a--b--a--a--a---d---X // terminates with error
```

Some sequences are finite while others are infinite, like a sequence of button taps:

```
---tap-tap-------tap--->
```

These are called marble diagrams. There are more marble diagrams at [rxmarbles.com](http://rxmarbles.com).

If we were to specify sequence grammar as a regular expression it would look like:

**next\* (error | completed)?**

This describes the following:

* **Sequences can have 0 or more elements.**
* **Once an `error` or `completed` event is received, the sequence cannot produce any other element.**

---

## Events

_Let's take a look at the code_

```swift
/// Represents a sequence event.
///
/// Sequence grammar: 
/// **next\* (error | completed)**
public enum Event<Element> {
    /// Next element is produced.
    case next(Element)

    /// Sequence terminated with an error.
    case error(Swift.Error)

    /// Sequence completed successfully.
    case completed
}
```

This is the code for an event. An event can have 3 different callback modes. An `onNext` mode, `onError` or `onCompleted` mode. This is the foundation upon which Rx is built on. Thinking of this makes sense. Users can only fire events in sequence. Events can continue firing. Or they can complete. Or have an error in which case the signal will end as well.

The next section will continue the discussion on `Observable`.
