---
layout: disqus
title: Reactive Programming - Part 3
date: 2019-09-24 18:49 +0200
comments: true
---

In this post we will take a look at the creation of `Observables` by using the factory design pattern.

Often you’ll want to create Observables and then get stuck, but realise that there is a bunch of setup code required to fulfill the needs of your specific objective. Sometimes all you want is a simple solution for creating Observables that when used at the call site, become easily maintainable.

Or you go ahead and create an Observable but realise that you need another similar Observable with just a bit of tweaking. So you go ahead and create a very similar Observable. Or you are unsure of all the Observable type that you need before you create your solution.

Let’s take a look at creating `Observables` with the factory design pattern by using extensions.

Observable Creation with Defer

_From reactivex.io_

| The Defer operator waits until an observer subscribes to it, and then it generates an Observable, typically with an Observable factory function. It does this afresh for each subscriber, so although each subscriber may think it is subscribing to the same Observable, in fact each subscriber gets its own individual sequence.

```swift
extension Observable {
    static func deferred(value: Int) -> Observable<Int> {
        return Observable<Int>.deferred {
            return .just(value)
        }
    }
}

extension Observable {
    static func deferred(string: String) -> Observable<String> {
        return Observable<String>.deferred {
            return .just(string)
        }
    }
}
```

Then to use the observable extension we’d do it as follows:

```swift
let observable = Observable<Int>.deferred(value: 2)
```

Obviously this is avery simple use case of a static factory method. But you could potentially add a bunch more setup code within your extension.
