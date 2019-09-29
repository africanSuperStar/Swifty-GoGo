---
layout: post
title: Building a Reactive App - Part 1
date: 2019-09-28 21:09 +0200
comments: true
permalink: practical-rxswift-part1
---

Asynchronous prgramming library.

Sequences of events or data. Horizontal line time. data/events are the marbles.

Button taps, keyboard animations, downloading data, processing images, writing to disk, playing audio/video.

notification center, KVO/KVC, GCD and operation queues, closures, target actions, delegates

declarative, functional, consistent patterns and operators, handles mutable state, compositional, decoupled, code isolation, multi-platform

steep learning curve, dependencies, paradigm shift, adoption, great power comes great responsibility, not a panacea

observer, iterator

observable won't emit anything unless it has one subscriber.

Observable.of()
Observable.from()
Observable.just()

observable.subscribe { event in
    print(event.element ?? event) // Optional Element property
}

observable.subscribe(onNext: {
    element in

    print(element)
})

// An observable that emits no events

let observable = Observable<Void>.empty()

observable.subscribe(onNext: { element in
    print(element)
},
onCompleted: {
    print("Completed")
})

// Never an infinite duration

let observable = Observable<Any>.never()

observable.subscribe(onNext: { event in
    print(element)
},
onCompleted: {
    print("Completed")
})

// Disposable to cancel a subscription

let mostPopular = observable.of(episodeV, episode,IV, episodeVI)

let subscription = mostpopular.subscribe {
    event in

    print(event)
}

subscription.dispose()

// Cancel subscriptions to avoid memory leaks.

let disposeBag = DisposeBag()

Observable.of(episodeVII, episodeI, rogueOne)
    .subscribe {
        print($0)
    }
    .disposed(by: disposeBag)

enum Droid: Error {
    case OUB12
}

let disposeBag = disposeBag()

Observable<String>.create {
    observer in

    observer.onNext("R2-D2")
    observer.onError(Droid.OU812)
    observer.onNext("C-3PO")
    observer.onNext("K-2S0")
    observer.onCompleted()

    // Use disposable to dispose of subscriptions to Observables.
    return Disposables.create()
}
.subscribe(
    onNext { print($0) }
    onError { print("Error: ", $0) }
    onCompleted { print("Completed") }
    onDisposed { print("Disposed") }
)
.disposed(by: disposedBag)


// Traits

Single
Completable
Maybe

let disposeBag = DisposeBag()

enum FileReadError: Error {
    case fileNotFound, unreadable, encodingFailed
}

func loadText(from fileName: String) -> Single<String> {
    return Single.create { single in
        let disposable = Disposables.create()

        guard let path = Bundle.main.path(forResource: fileName, ofType: "txt") else {
            single(.error(FileReadError.filenotFound))
            return disposable
        }

        guard let data = FileManager.default.content(atPath: path) else {
            single(.error(FileReadError.unreadable))
            return disposable
        }

        guard let content = String(data: data, encoding: .utf8) else {
            single(.error(FileReadError.encodingFailed))
            return disposable
        }

        single(.succes(contents))

        return disposable
    }
}

loadText(from: "ANewHope)
    .subscribe {
        switch $0 {
        case.succes(let string):
            print(string)
        case .error(let error)
            print(error)
        }
    }
    .disposed(by: disposeBag)

do side effect (onSubscribe: side effects before subscription)

Subjects (Observable and Observer)

publishsubject (starts as an empty sequence and only new one's are emitted once subscribed)


let quotes = PublishSubject<String>()

quotes.onNext(itsNotMyFault)

let subscriptionOne = quotes
    .subscribe {
        print(label: "1", event: $0)
    }

    quotes.on(.next(doOrNot))
    
let subscriptionTwo = quotes
    .subscribe {
        print(label: "2", event: $0)
    }

    quotes.on(.next(lackOfFaith))

subscriptionOne.dispose()

quotes.onNext(eyesCanDeceive)

let subscriptionThree = quotes
    .subscribe {
        print("3", $0)
    }

quotes.onNext(stayOnTarget)


// Include handlers for stop events in your code.

// BehaviorSubject -
    
