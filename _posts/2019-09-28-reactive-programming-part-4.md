---
layout: post
title: Reactive Programming - Part 4
date: 2019-09-28 19:35 +0200
comments: true
permalink: rxswift-part4
---

In this post I will continue the discussion on `Observables` by going through the list of `Observables Operators` from the source code. So please forgive me if I miss any.

There is a very long list of `Observable Operators` what makes it longer is that these operators are declarative and transposable. Meaning we can chain them onto one another to create custom combined operations on sequences of events.

Before you go through this list I recommend you skip to [Part 5](/rxswift-part5).

So from the list going in alphabetical order.

* [AddRef]()
* [Amb]()
* [AsMaybe]()
* [AsSingle]()
* [Buffer]()
* [Catch]()
* [CombineLatest]()
* [CompactMap]()
* [Concat]()
* [Create]()
* [Debounce]()
* [Debug]()
* [DefaultIfEmpty]()
* [Deferred]()
* [Delay]()
* [DelaySubscription]()
* [Dematerialize]()
* [DistinctUntilChanged]()
* [Do]()
* [ElementAt]()
* [Empty]()
* [Enumerated]()
* [Error]()
* [Filter]()
* [First]()
* [Generate]()
* [GroupBy]()
* [Just]()
* [Map]()
* [Materialize]()
* [Merge]()
* [Multicast]()
* [Never]()
* [ObserveOn]()
* [Optional]()
* [Producer]()
* [Range]()
* [Reduce]()
* [Repeat]()
* [RetryWhen]()
* [Sample]()
* [Scan]()
* [Sequence]()
* [ShareReplayScope]()
* [SingleAsync]()
* [Sink]()
* [Skip]()
* [SkipUntil]()
* [SkipWhile]()
* [StartWith]()
* [SubscribeOn]()
* [Switch]()
* [SwitchIfEmpty]()
* [Take]()
* [TakeLast]()
* [TakeUntil]()
* [TakeWhile]()
* [Throttle]()
* [Timeout]()
* [Timer]()
* [ToArray]()
* [Using]()
* [Window]()
* [WithLatestFrom]()
* [Zip]()