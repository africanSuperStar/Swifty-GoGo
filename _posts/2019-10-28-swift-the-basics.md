---
layout: post
title: Swift - The Basics
date: 2019-10-28 14:21 +0200
---

Types, Constants, Variables, Optionals, Tuples, Type Safety

Declaring Variables and Constants

```swift
var x = 0.0, y = 0.0, z = 0.0
```

Type Annotations

You can define multiple related variables of the same type on a single line, separated by commas, with a single type annotation after the final variable name:

```swift
var red, green, blue: Double
```

Type Inference

Naming Constants and Variables

“Constant and variable names can’t contain whitespace characters, mathematical symbols, arrows, private-use Unicode scalar values, or line- and box-drawing characters. Nor can they begin with a number, although numbers may be included elsewhere within the name.

Once you’ve declared a constant or variable of a certain type, you can’t declare it again with the same name, or change it to store values of a different type. Nor can you change a constant into a variable or a variable into a constant.”

> Excerpt From: Apple Inc. “The Swift Programming Language (Swift 5.1)”. Apple Books. 

Printing Constants and Variables

`print(_:separator:terminator:)`

Default Parameter Values

String Interpolation

Comments
Multiline Comments

Multiline Comments can be nested in Swift

Semicolons

Integers - Signed or Unsigned, 8, 16, 32 and 64 bit forms.

Integer Bounds (min, max)

UInt - Same size as the platforms native word size.

Floating-Point Numbers

Double, Float (Double is preferred).

Type Safety and Type Inference

Literal Values

Numeric Literals 
  - A decimal number
  - A binary number, with a 0b prefix
  - An octal number, with a 0o prefix
  - A hexidecimal number, with a 0x prefix

1.25e2 means 1.25 x 10^2

For hexadecimal numbers with an exponents of exp, the base number is multiplied by 2^exp.

0xFp2 means 15 x 2^2, or 60.0

Numeric Literals can have extra padding. `1_000_000_000`

Numeric Type Conversion

Integer Conversion - Opt-in to Numeric Type Conversion

Extending Initializers for new types is covered in Extensions

Integer and Floating-Point Conversion

Booleans - Referred to as `logical`

```swift
if turnipsAreDelicious {

} else {

}
```

Swift's Type Safety prevents non-Boolean values from being substituted for Bool.

Tuples

You can `decompose` a tuple's contents into separate constants or variables

Named Tuples

“Tuples are particularly useful as the return values of functions. A function that tries to retrieve a web page might return the (Int, String) tuple type to describe the success or failure of the page retrieval. By returning a tuple with two distinct values, each of a different type, the function provides more useful information about its outcome than if it could only return a single value of a single type.”

Excerpt From: Apple Inc. “The Swift Programming Language (Swift 5.1)”. Apple Books. 

Optionals

```swift
var surveyAnswer: String?

// surveyAnswer is automatically set to nil
```

in Swift, nil isn't a pointer -- it's the absence of a value of a certain type. Optionals of any type can be set to nil, not just object types.

If Statements and Forced Unwrapping

_forced unwrapping of an optional's value_

Trying to use ! to access a nonexistent optional value triggers a runtime error.

__Optional Binding__

```swift
if let constantName = someOptional {
    // statements
}

if var constantName = someOptional {
    // statements
}

if let constantName = someOptional, let constantName = someOptional {
    // statements
}
```

| “Constants and variables created with optional binding in an if statement are available only within the body of the if statement. In contrast, the constants and variables created with a guard statement are available in the lines of code that follow the guard statement”

Excerpt From: Apple Inc. “The Swift Programming Language (Swift 5.1)”. Apple Books. 

__Implicitly Unwrapped Optionals__


