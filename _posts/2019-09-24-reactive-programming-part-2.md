---
layout: disqus
title: Reactive Programming - Part 2
date: 2019-09-24 17:48 +0200
comments: true
---

__Observables__! What are they and why do they exist..

_This is code from RXSwift_

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

