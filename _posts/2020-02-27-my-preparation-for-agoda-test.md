---
layout: post
title: My Preparation for Interview Test
date: 2020-02-27 10:14 +0200
permalink: my-preparation-for-interview-test/
comments: true
---

I have 3 days to do the challenge. This is going to be my strategy.

1. Read through and make notes on Swift Language Guide and Swift Language Reference
2. Read through my Objc.io PDF on the MVVM, MVC pattern etc.
3. Read up on Core Data, NSNotification, UITableView, UICollectionView.
4. Read through how NSURLSession, NSURL and iOS Networking works
5. Practice some Hackerrank challenges.

If this is possible or not I'm not sure. But I will sure try to achieve it.

## Swift Basics

* Fundamental Types: Bool, Double, Float, Int, sString
* Collection Types: Array, Set, Dictionary
* Tuples
* Optionals

> Swift is a _type-safe language_

* Constants vs Variables.
* Type Annotations
* Type Safety and Type Inference
* Naming Constants and Variables
* Printing Constants and Variables
* Default Parameter Values
* String Interpolation
* Comments, Multiline Comments, Nested Multiline Comments
* Semicolons

### Integers

Integers are whole numbers with no fractional component, such as 42 and -23. Integers are either signed (positive, zero, or negative) or unsigned (positive or zero).

* Integer Bounds

Swift provides an additional integer type, Int, which has the same size as the current platform’s native word size:

On a 32-bit platform, Int is the same size as Int32.
On a 64-bit platform, Int is the same size as Int64.

* UInt

### Floating-Point Numbers

Floating-point numbers are numbers with a fractional component, such as 3.14159, 0.1, and -273.15. 

| Floating-point types can represent a much wider range of values than integer types, and can store numbers that are much larger or smaller than can be stored in an Int

* Double
* Float

### Type Safety and Type Inference

Swift is a type-safe language. A type safe language encourages you to be clear about the types of values your code can work with. If part of your code requires a String, you can’t pass it an Int by mistake.

* Literal Value

### Numeric Literals

* A decimal number, with no prefix
* A binary number, with a 0b prefix
* An octal number, with a 0a prefix
* A hexadecimal number, with a 0x prefix
* An exponential number, with an e suffix
* An exponential hexadecimal number, with a p suffix

* Number padding, 100_000_000

### Numeric Type Conversion

Use other integer types only when they’re specifically needed for the task at hand, because of explicitly sized data from an external source, or for performance, memory usage, or other necessary optimization.

#### Integer Conversion

You must opt in to numeric type conversion on a case-by-case basis.

```swift
let twoThousand: UInt16 = 2_000
let one: UInt8 = 1
let twoThousandAndOne = twoThousand + UInt16(one)
```

You need to use a type for which UInt16 has an initializer.

#### Integer and Floating-Point Conversion

Conversions between integer and floating-point numeric types must be made explicit.

| Floating-point values are always truncated when used to initialize a new integer value

### Type Aliases

```swift
typealias SpecificType = Array<String>
```

### Booleans

### Tuples

Tuples group multiple values into a single compound value. The values within a tuple can be of any type and don’t have to be of the same type as each other.

__Tuple Decomposition:__

* Tuple Pattern Matching with an _
* Access the individual element values in a tuple using index numbers
* Name the individual elements in a tuple
* Using Tuples and Functions with Multiple Return Values

### Optionals

* Unwrapping an optional value.
* Swift Optionals let you indicate the absence of a value for _any type at all_.
* Assigning _nil_ to an Optional.
* Nil cannot be assigned to non-Optional types.
* Optionals without a default value are automatically set to _nil_.
* In Swift _nil_ isn't a pointer - it's the absence of a value of a certain type. Unlike in ObjC where _nil_ is a pointer to a nonexistent object.

#### If Statements and Forced Unwrapping

* Force Unwrapping. !
* "Not equal" to _nil_

#### Optional Binding

* if let
* while let
* Multiple optional bindings within an if statement separated by commas

| Constants and variables created with optional binding in an if statement are available only within the body of the if statement. In contrast, the constants and variables created with a guard statement are available in the lines of code that follow the guard statement, as described in `Early Exit`.

#### Implicitly Unwrapped Optionals

* Unowned References and Implicitly Unwrapped Optional Properties.

> If an implicitly unwrapped optional is nil and you try to access its wrapped value, you’ll trigger a runtime error.

<br/>

---

<br/>

> Don’t use an implicitly unwrapped optional when there’s a possibility of a variable becoming nil at a later point. Always use a normal optional type if you need to check for a nil value during the lifetime of a variable.

### Error Handling

```swift
func canThrowAnError() throws {
    // this function may or may not throw an error
}
```

* A do statement creates a new containing scope, which allows errors to be propagated to one or more catch clauses.

### Assertions and Preconditions

Assertions and preconditions are checks that happen at runtime. You use them to make sure an essential condition is satisfied before executing any further code.

You use assertions and preconditions to express the assumptions you make and the expectations you have while coding, so you can include them as part of your code. Assertions help you find mistakes and incorrect assumptions during development, and preconditions help you detect issues in production.

#### Debugging with Assertions

```swift
assert(_:_:file:line:)
assertionFailure(_:file:line:)
```

#### Enforcing Preconditions

```swift
precondition(_:_:file:line:)
preconditionFailure(_:file:line:)
fatalError(_:file:line:)
```

## Basic Operators

Arithmetic operators (+, -, *, /, % and so forth) detect and disallow value overflow, to avoid unexpected results when working with numbers that become larger or smaller than the allowed value range of the type that stores them.

* Unary
* Binary
* Ternary

### Assignment Operator

```swift
let a = 10
var b = 20

let (x, y) = (1, 2)
```

### Arithmetic Operators

* Addition (+)
* Subtraction (-)
* Multiplication (*)
* Division (/)

* Overflow Operators

- The addition operator is also supported for `String` concatenation.

#### Remainder Operator

a = (b x some multiplier) + remainder

The sign of b is ignored for negative values of b. This means that a % b and a % -b always give the same answer.

#### Unary Minus Operator

#### Unary Plus Operator

### Compound Assignment Operators

```swift
a += 2
```

- Operator Declarations

### Comparison Operators

* Equal to (a == b)
* Not Equal to (a != b)
* Greater than (a > b)
* Less than (a <> b)
* Greater than or equal to (a >= b)
* Less than or equal to (a <= b)

* Identity Operators

- Tuples are compared from left to right, one value at a time, until the comparison finds two values that aren’t equal. 

```swift
("blue", -1) < ("purple", 1)        // OK, evaluates to true
("blue", false) < ("purple", true)  // Error because < can't compare Boolean values
```

### Ternary Conditional Operator

### Nil-Coalescing Operator

### Range Operators

#### Closed Range Operator

```swift
for index in 1...5 {}
```

#### Half-Open Range Operator

```swift
for i in 0..<count {}
```

#### One-Sided Ranges

```swift
for name in names[2...] {}
for name in names[...2] {}
for name in names[..<2] {}
```

### Logical Operators

* Logical NOT (!a)
* Logical AND (a && b)
* Logical OR (a \|\| b)

* Short-circuit evaluation

#### Combining Logical Operators

> The Swift logical operators && and \|\| are left-associative, meaning that compound expressions with multiple logical operators evaluate the leftmost subexpression first.

#### Explicit Parentheses

## Strings and Characters

> Swift’s String type is bridged with Foundation’s NSString class. Foundation also extends String to expose methods defined by NSString. This means, if you import Foundation, you can access those NSString methods on String without casting.

### String Literals

* Multiline String Literals

```swift
let quote = """
Hello \
Hello
"""
```


![Multiline String](assets/images/Strings/multilineStringWhitespace_2x.png)

#### Special Characters in String Literals

* The escaped special characters \0 (null character), \\ (backslash), \t (horizontal tab), \n (line feed), \r (carriage return), \" (double quotation mark) and \' (single quotation mark)

* An arbitrary Unicode scalar value, written as \u{n}, where n is a 1–8 digit hexadecimal number (Unicode is discussed in Unicode below)

#### Extended String Delimiters

```swift
let stringDelimiters = #"""
Here are three more double quotes: """
"""#
```

### Initializing an Empty String

```swift
let val1 = ""
let val2 = String()
```

### String Mutability

> This approach is different from string mutation in Objective-C and Cocoa, where you choose between two classes (NSString and NSMutableString) to indicate whether a string can be mutated.

### Strings are Value Types

"Swift’s String type is a value type. If you create a new String value, that String value is copied when it’s passed to a function or method, or when it’s assigned to a constant or variable. In each case, a new copy of the existing String value is created, and the new copy is passed or assigned, not the original version."

### Working with Characters

```swift
for character in "Word" {} 

let char: Character = "!"

let catCharacters: [Character] = ["C", "a", "t", "!", "🐱"]
let catString = String(catCharacters)
```

### Concatenating Strings and Characters

```swift
let val = str1 + "str2"
```

### String Interpolation

* You can use extended string delimiters to create strings containing characters that would otherwise be treated as a string interpolation.

### Unicode

_Unicode_ is an international standard for encoding, representing, and processing text in different writing systems. It enables you to represent almost any character from any language in a standardized form, and to read and write those characters to and from an external source such as a text file or web page.

#### Extended Grapheme Clusters

* An extended grapheme cluster is a sequence of one or more Unicode scalars that (when combined) produce a single human-readable character.

### Counting Characters

```swift
var word = "cafe"
print("the number of characters in \(word) is \(word.count)")
// Prints "the number of characters in cafe is 4"

word += "\u{301}"    // COMBINING ACUTE ACCENT, U+0301

print("the number of characters in \(word) is \(word.count)")
// Prints "the number of characters in café is 4"
```

* Because of this, characters in Swift don’t each take up the same amount of memory within a string’s representation. As a result, the number of characters in a string can’t be calculated without iterating through the string to determine its extended grapheme cluster boundaries. If you are working with particularly long string values, be aware that the count property must iterate over the Unicode scalars in the entire string in order to determine the characters for that string.

* The count of the characters returned by the count property isn’t always the same as the length property of an NSString that contains the same characters.

* The length of an NSString is based on the number of 16-bit code units within the string’s UTF-16 representation and not the number of Unicode extended grapheme clusters within the string.

### Accessing and Modifying a String

* As mentioned above, different characters can require different amounts of memory to store, so in order to determine which Character is at a particular position, you must iterate over each Unicode scalar from the start or end of that String. For this reason, Swift strings can’t be indexed by integer values.

* startIndex
* endIndex
* index(before:)
* index(after:)
* index(_:offset:)

```swift
let greeting = "Guten Tag!"
greeting[greeting.startIndex]
// G
greeting[greeting.index(before: greeting.endIndex)]
// !
greeting[greeting.index(after: greeting.startIndex)]
// u
let index = greeting.index(greeting.startIndex, offsetBy: 7)
greeting[index]
// a
```

* Accessing index out of range will cause a runtime error

```swift
for index in greeting.indices {}
```

#### Inserting and Removing

* insert(_:at:)
* insert(contentsOf:at:)
* remove(at:)
* removeSubrange(_:)

```swift
// To create an indices range
let range = welcome.index(welcome.endIndex, offsetBy: -6)..<welcome.endIndex
welcome.removeSubrange(range)
```

* RangeReplaceableCollection

### Substrings

```swift
let greeting = "Hello, world!"
let index = greeting.firstIndex(of: ",") ?? greeting.endIndex
let beginning = greeting[..<index]
// beginning is "Hello"

// Convert the result to a String for long-term storage.
let newString = String(beginning)
```

#### Substring Performance

![Substring Performance](assets/images/Strings/stringSubstring_2x.png)

> Both String and Substring conform to the StringProtocol protocol,

### Comparing Strings

* String and character equality
* Prefix Equality
* Suffix Equality

#### String and Character Equality

> Two String / Character values are considered equal if their extended grapheme clusters are canonically equivalent.

> Extended grapheme clusters are canonically equivalent if they have the same linguistic meaning and appearance, even if they’re composed from different Unicode scalars behind the scenes.

* String and character comparisons in Swift are not locale-sensitive.

#### Prefix and Suffix Equality

* hasSuffix(_:)
* hasPrefix(_:)

### Unicode Representations of Strings

* Each form encodes the string in small chunks known as code units

##### UTF-8 Representation

```swift
for codeUnit in val.ut8 {}
```

##### UTF-16 Representation

```swift
for codeUnit in val.ut16 {}
```

##### Unicode Scalar Representation

```swift
for codeUnit in val.unicodeScalars {
    print("\(scalar.value) ", terminator: "")
}
```

## Collection Types

* Arrays
* Dictionaries
* Sets

### Mutability of Collection

If you create an array, a set, or a dictionary, and assign it to a variable, the collection that is created will be mutable. This means that you can change (or mutate) the collection after it’s created by adding, removing, or changing items in the collection. If you assign an array, a set, or a dictionary to a constant, that collection is immutable, and its size and contents cannot be changed.

