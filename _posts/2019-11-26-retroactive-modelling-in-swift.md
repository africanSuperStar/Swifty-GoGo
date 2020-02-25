---
layout: post
title: Retroactive Modelling in Swift
date: 2019-11-26 15:08 +0200
---

Protocol Extensions and Protocol Oriented Programming Techniques

 - Extension add new functionality to an existing class, structure, enumeration, or protocol type

 Extension in Swift can:
    - Add computed instance propterties and computed type properties
    - Define instance methods and type methods
    - Provide new initializer
    - Define subscripts
    - Define and use new nested types
    - Make an existing type conform to a protocol

Example extending the type of `Double`

```swift
extension Double {
  // Meters
  var m: Double { return self }
  
  // Millimeters
  var mm: Double { return self / 1000 }

  func descriptionInMeters() -> String {
    return "\(self)m"
  }

  // Mutating function: Value type of Struct
  mutating func resetToZero() {
    self = 0.0
  }
}

var oneInch = 25.4.mm
var description = 2.3.descriptionInMeters()

value = 2.0
value.resetToZero()
```
