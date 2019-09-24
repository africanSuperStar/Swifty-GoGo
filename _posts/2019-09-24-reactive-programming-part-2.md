---
layout: disqus
title: Reactive Programming - Part 2
date: 2019-09-24 17:48 +0200
comments: true
---

__Observables__! What are they and why do they exist.. We also go deep into Observable creation with the `just`, `of`, `from` and `deferred` operators. 

_This is code from RxSwift_

```swift
/// Convenience API extensions to provide alternate next, error, completed events
extension ObserverType {
    
    /// Convenience method equivalent to `on(.next(element: Element))`
    ///
    /// - parameter element: Next element to send to observer(s)
    public func onNext(_ element: Element) {
        self.on(.next(element))
    }
    
    /// Convenience method equivalent to `on(.completed)`
    public func onCompleted() {
        self.on(.completed)
    }
    
    /// Convenience method equivalent to `on(.error(Swift.Error))`
    /// - parameter error: Swift.Error to send to observer(s)
    public func onError(_ error: Swift.Error) {
        self.on(.error(error))
    }
}
```

The observer type observes on an evemt

```swift
/// Notify observer about sequence event.
///
/// - parameter event: Event that occurred.
func on(_ event: Event<Element>)
```

The way I tend to think of Observerables is of the character __Drew__ from the movie _"Despicable Me"_. The `Observable<T>` allows one or more `Observers` to subscribe and react to events in real time and update the UI.

As we can see from the code above. Observables can only emit 3 types of events. You also have noticed that Observables are `Generic`. That's correct because it is possible for events to hold and pass values. What makes this even more powerful is that through series of operations we can transform the values held by these events during the lifecycle of the sequence.

##### Next I'll talk about Marble Diagrams

![Observable](assets/images/Observable-dark/Observable-dark.001.png)

From this marble diagram we can see how one sequence is transformed into another sequence. Later on I'll dive into reactive extensions which is how this is made possible. But for now understand that the resulting sequence is a replica of the original sequence with the exception of being two characters ahead.

The events will continue to be emitted until a cancel event or an error event is emitted by the sequence. For example a connection failure will cause an error event during a download process.

Understand that the diagram is not static and that these events are in fact moving with time along the stream.

## Creating Observables

There are 4 methods I will concentrate on creating `Observables`.

1. .just()
1. .of()
1. .from()
1. .deferred()

### Just Observable Creation

_From RxSwift_

```swift
final private class Just<Element>: Producer<Element> {
    private let _element: Element
    
    init(element: Element) {
        self._element = element
    }
    
    override func subscribe<Observer: ObserverType>(_ observer: Observer) -> Disposable where Observer.Element == Element {
        observer.on(.next(self._element))
        observer.on(.completed)
        return Disposables.create()
    }
}
```

So we can see here from this code that the `.just` operator calls `onNext` exactly once before calling the `onCompleted` event. This confirms that only one event is emitted by this sequence before it terminates. So the code to create a `.just` observable would be as follows. This is useful if you are looking to only capture the first event a user or network sends. For example the first tap on a button.

```swift
 let observable: Observable<String> = Observable<String>.just("Single Event")
```

It is not always necessary to specify the type that is passed through with the event. In the previous case it was a `String`.

### Of Observable Creation

_From RxSwift_

```swift
extension ObservableType {
    // MARK: of

    /**
     This method creates a new Observable instance with a variable number of elements.

     - seealso: [from operator on reactivex.io](http://reactivex.io/documentation/operators/from.html)

     - parameter elements: Elements to generate.
     - parameter scheduler: Scheduler to send elements on. If `nil`, elements are sent immediately on subscription.
     - returns: The observable sequence whose elements are pulled from the given arguments.
     */
    public static func of(_ elements: Element ..., scheduler: ImmediateSchedulerType = CurrentThreadScheduler.instance) -> Observable<Element> {
        return ObservableSequence(elements: elements, scheduler: scheduler)
    }
}
```

The important take away from the code above is that the `of` operator takes a variable number of elements and returns an `Observable` of that type. So remember when I made the reference to __Drew__ from __Despicable Me__. This observable is an example of subscribing to many observers.

```swift
 let minions = [Minion("Jerry"), Minion("Tom")]

 let observable: Observable<Minion> = Observable<Minion>.of(minions)
```

Although I'm passing in an array of Elements. I'm in fact only passing in a single `Element` which is of type `Array<Minion>`. This will return an observable of type `Observable<Array<Minion>>`. To get `Observable<Minion>`. I'd have to create the following.

```swift
 let observable: Observable<Minion> = Observable<Minion>.of(Minion("Jerry"), Minion("Tom"))
```

### From Observable Creation

_From RxSwift_

```swift
/**
    Converts an array to an observable sequence.

    - seealso: [from operator on reactivex.io](http://reactivex.io/documentation/operators/from.html)

    - returns: The observable sequence whose elements are pulled from the given enumerable sequence.
    */
public static func from(_ array: [Element], scheduler: ImmediateSchedulerType = CurrentThreadScheduler.instance) -> Observable<Element> {
    return ObservableSequence(elements: array, scheduler: scheduler)
}

/**
    Converts a sequence to an observable sequence.

    - seealso: [from operator on reactivex.io](http://reactivex.io/documentation/operators/from.html)

    - returns: The observable sequence whose elements are pulled from the given enumerable sequence.
    */
public static func from<Sequence: Swift.Sequence>(_ sequence: Sequence, scheduler: ImmediateSchedulerType = CurrentThreadScheduler.instance) -> Observable<Element> where Sequence.Element == Element {
    return ObservableSequence(elements: sequence, scheduler: scheduler)
}
```

So from the above we are able to see that it is possible to create an Observable either from a `Sequence` or a `[Element]`.

What is also interesting to note. As well as probably only for advanced users is that you can subscribe to an observable to other observables as well. Hence creating a chain of observable / observer patterns.

Remember I mentioned earlier with the `of` operator that passing in an array of `Array<Minion>` would return `Observable<Array<Minion>>`. The difference with `from` is that `Array<Minion>` will return `Observable<Minion>`. `from` only takes an array or a sequence.

A sequence being a `Swift.Sequence`. Which is an `Element` that is able to iterate through it's elements.



