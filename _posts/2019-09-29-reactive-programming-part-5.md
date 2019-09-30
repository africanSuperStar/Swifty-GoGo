---
layout: disqus
title: Reactive Programming - Part 5
date: 2019-09-29 17:46 +0200
comments: true
permalink: rxswift-part5/
---

In this post we will go through `PublishSubject` for __RxSwift 5.0.0__.

The problem with a lot of the posts out there on the Interwebs about RxSwift is that information becomes outdated. As I suppose the information in this post will eventually be outdated as well, even though I will try my best to keep it up to date. This post will focus on the newest and greatest features by actually reviewing the source code of __RxSwift__ to ensure I can provide you with the best possible information.

So from the top of the code:

```swift
public final class PublishSubject<Element>
    : Observable<Element>
    , SubjectType
    , Cancelable
    , ObserverType
    , SynchronizedUnsubscribeType {}
```

Here we can see that `PublishSubject` takes a generic type of `Element` as we've seen before with `Observables`. But going through these inherited protocols we see that it conforms to `ObserverType` as well as the class `Observable<Element>`. What important to not is that `Element` is of the same type for both.

Let's go through a bit of theory with `Subjects` before we continue. In many articles you will find that the `PublishSubject` is coupled with an analogy of a Publisher. Events which happen before the `Subject` subcribes to the `Sequence` are ignored. Just as old news is ignored by publishers once it has been covered. Because the `PublishSubject` is both an `ObserverType` and an `Observable` new events can be subscribed to and new events can be emitted. This is useful because now we start dealing with sequences which are not finite. Except we start focusing on data which is handled at run time.

This is the code for the `on` method in the `PublishSubject`:

_From RxSwift Code_

```swift
/// Notifies all subscribed observers about next event.
///
/// - parameter event: Event to send to the observers.
public func on(_ event: Event<Element>) {
    #if DEBUG
        self._synchronizationTracker.register(synchronizationErrorMessage: .default)
        defer { self._synchronizationTracker.unregister() }
    #endif
    dispatch(self._synchronized_on(event), event)
}
```

It's okay if you don't fully understand this code. What's important to take away from this is that the (`next`, `completed` or `error`) event is dispatched to all it's __CURRENT__ subscribers. It's very important to note that the subscriptions need to already be created for new events to be subscribed to. Remember that old news talk we had.

| Another important note. _PublishSubject_ does not start with an initial value. It instead start with an empty value. Unlike _BehaviorSubject_ which we will see in a little while.

Okay let's see this in an example now.

```swift
import Foundation
import RxSwift
  
let subject = PublishSubject<String>()

/// Convenience Method
subject.onNext("Hello, It's me")

/// Underlying API
subject.on(.next("Can you hear me?"))

/// The above events will not have any effect on any new subscriptions which are created.
/// Let's create the first subscription.

let firstSubscription = subject.subscribe(onNext: { element in
    print("1: \(element)")
})

/// The first event subscribed to:
subject.onNext("I've come to tell you the news!")

/// Then the first event is forgotten and the second event becomes the new event subscribed to
subject.on(.next("What is this now? I couldn't hear you the first time"))

/// Now we create another subscription. What do you think will happen?
/// I deliberately use the other subscribe method for you to notice the difference.
let secondSubscription = subject.subscribe { event in
    print("2: \(event.element ?? "")")
}

/// Now both the initial and second subscription will pick up this event. But this will only be the first event for the second subscription.
subject.onNext("Oh my apologies. Greetings. I'm a reporter from BBC News.")

/// What do you think will happen now?
firstSubscription.dispose()

subject.onNext("What do you want?")

subject.onCompleted()

/// And now?
subject.onNext("Door slams before he can speak!")

/// As you can see the second subscription is still hanging around which is why it is still important to dispose it to avoid memory leaks.
secondSubscription.dispose()

subject.onNext("Excuse me!")
```

You should get the following output:

```txt
1: I've come to tell you the news!
1: What is this now? I couldn't hear you the first time
1: Oh my apologies. Greetings. I'm a reporter from BBC News.
2: Oh my apologies. Greetings. I'm a reporter from BBC News.
2: What do you want?
2: 
```

Run this from the sample code in the [Github Project](https://github.com/africanSuperStar/swgg-rxswift).

Let's take a look at the marble diagram for the `PublishSubject`. Remember this horizontal lines are sequences over time. The down arrows are events and the up arrows are subscriptions.

![PublishSubject](/assets/images/Subjects/PublishSubject.001.png)

So from this diagram we can see that