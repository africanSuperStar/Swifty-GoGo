---
layout: post
title: Error Handling in Swift with Extensions
date: 2019-11-26 15:42 +0200
---

# Representing Errors

Using an enum that conforms to the error protocol

```swift
import Foundation

struct ParsingError: Error {
	enum MyError: Error {
		case minor
		case bad
		case terrible(description: String)
	}

	let line: Int
	let column: Int
	let kind: MyError
}


func parse(_ source: String) throws {
	throw ParsingError(line: 1, column: 1, kind: .bad)
}
```

Probably don't want to use standard enums with asynchronous code.

```swift
enum Result<Value, Error> {
	case success(Value)
	case failure(Error)
}

func fetch(_ request: URLRequest, completion: (Result<(URLResponse, Data), Never>) -> Void) {

}


let request = URLRequest(url: URL(string: "a")!)
fetch(request) {
	request in

	switch result {
		case let .success(response, _): print("Success: \(response)")
	}
}

```

# Handling Errors

```swift
import Foundation

class Fridge {
	enum FridgeError: Error {
		case contentNotPresent
		case contentExpired(name: String)
	}

	private var content = [
		"UID01" = "Juice"
	]

	private var expiredContent = [
		"UID02": "Apple"
	]

	func getContentNameWith(contentID: String) throws -> String {
		if let name = expiredContent[contentID] {
			throw FridgeError.contentExpired(name: name)
		}

		guard let name = content[content] else {
			throw FridgeError.contentNotPresent
		}

		return name
	}

	func getContentWithOperation(operation: () throws -> String) rethrows -> String {
		return try operation()
	}
}


print(contentName)

// To mitigate try

// 1. Do catch
do {
	let fridge = Fridge()
	let  contentName = try fridge.getContentNameWith(contentID: "UdD01")
} catch {
	print("failed")
}

// Optional try?
let contentNameOp = try? fridge.getContentNameWith(contentID: "U101")

// Forceful try! Not recommended
let contentNameOp = try? fridge.getContentNameWith(contentID: "U101")

// Extend String to be an error
extension String: Error {}
throw "Some error"
```

# Unit Testing

A unit test should be automated and repeatable
It should be easy to implement
once it's written, it should remain for fututre use
Anyone should be able to run it
Should be run by the push of a button

```swift
import XCTest

class ScoreKeeper {
	private var score = 0

	func getScore() -> Int {
		return score
	}

	func incrementScore() {
		score += 1
	}

	func incrementScore(_ completion: @escaping (_ newScore: Int) -> Void) {
		incrementScore()
		DispatchQueue.main.asyncAfter(deadline: .now() + 0.5, execute: {
			completion(self.score)
		})
	}
}

class ScoreKeeperTests: XCTestCase {
	var keeper: ScoreKeeper!

	override func setup() {
		super.setUp()
		keeper = ScoreKeeper()
	}

	func testInitialGetScore() {
		XCTAssert(keeper.getScore() = 0)
	}

	func testIncrementScore() {
		keeper.incrementScore()
		XCTAssert(keeper.getScore() == 1)
	}

	func testScoreIncrementPerformance() {
		measure {
			keeper.incrementScore()
		}
	}

	func testAsyncIncrementScore() {
		let scoreExpectation = expectation(description: "Score returned")

		keeper.incrementScore {
			score in

			scoreExpectation.fulfill()
		}

		waitForExpectations(timeout: 0.1) { error in

		}
	}
}

ScoreKeeperTests.defaultTestSuite.run()
```

# Writing Testable Code

Keeping it extensible with a DB.

Using dependency injection

```swift
import XCTest

protocol DataBase {
	func getWith(key: String) -> Int
	func incrementWith(key: String)
}

class RealDatabase: Database {
	func getWith(key: String) -> Int {
		return 1
	}

	func incrementWith(key: String) {
	}
}

// Injection through initializer

class ScoreKeeper {
	private var database: Database

	init(database: Database = RealDatabase()) {
		self.database = database
	}

	func getScore() -> Int {
		return database.getWith(key: scoreKey)
	}

	func incrementScore() {
		database.incrementWith(key: scoreKey)
	}
}

class MockDatabase: Database {
	// Mock everything
	var value = 1

	func getWith(key: String) -> Int {
		return value
	}

	func incrementWith(key: String) {
		value += 1
	}
}

class ScoreKeeperTests: XCTestCase {
	var keeper: ScoreKeeper!

	override func setup() {
		super.setUp()
		let database = MockDatabase()
		database.value = 0

		keeper = ScoreKeeper(database: database)
	}

	func testInitialGetScore() {
		XCTAssert(keeper.getScore() = 0)
	}

	func testIncrementScore() {
		keeper.incrementScore()
		XCTAssert(keeper.getScore() == 1)
	}

	func testScoreIncrementPerformance() {
		measure {
			keeper.incrementScore()
		}
	}

	func testAsyncIncrementScore() {
		let scoreExpectation = expectation(description: "Score returned")

		keeper.incrementScore {
			score in

			scoreExpectation.fulfill()
		}

		waitForExpectations(timeout: 0.1) { error in

		}
	}

	func testAsyncIncrementScore() {
		let scoreExpectation = expectation(description: "Score returned")

		keeper.incrementScore {
			score in

			scoreExpectation.fulfill()
		}

		waitForExpectations(timeout: 0.1) { error in

		}
	}
}

ScoreKeeperTests.defaultTestSuite.run()

```

# Enhance your code with Generics

# Type Constraints

```swift
func exists<T: Equatable>(item: T, in array: [T]) -> Bool {
	for arrayItem in array {
		it item == arrayItem {
			return true
		}
	}
	return false
}

let stringArray = ["a", "b"]
let intArray = [1, 2]
exists(item: "t", in: stringArray)
exists(item: 3, in: intArray)
```

Associated type gives a placeholder name to a type that is used as a part of the protocol

The actual type to use for that associated type isn't specified until the protocol is adopted.

Associated types are specified with the `associatedtype` keyword
 
```swift
protocol GenericProtocol {

	associatedtype MyType

	var property: MyType { get set }
}

class StringImplementation: GenericProtocol {
	typealias MyType = String

	var property: MyType = "a"
}

class IntImplementation: GenericProtocol {
	typealias MyType = Int

	var property: MyType = 1
}

var string = StringImplementation()
print(string.property)

var int = IntImplementation()
print(int.property)
```

# The Where Clause

Where clause are used to define requirements in associated types

```swift
protocol Money {
	associatedtype Currency
	var currency: Currency { get }
	var amount: Float { get }

	func sum<M: Money>(with money: M) -> M? where M.Currency = Currency
}

class Euro {}
class Pound {}

class IrishMoney: Money {
	typealias Currency = Euro

	var currency = Euro()
	var ammount: Float = 10.0

	func sum<M>(with money: M) -> M? where M: Money, Irish.Currency == M.Currency {
		return nil
	}
}
```


 Can only add the same currency with the protocol

```swift
protocol Company {
	associatedtype TradeCurrency
	func buy<T: Tradable, M: Money>(product: T, with money: M) -> T? where M.Currency == TradeCurrency
}

class BershireHathaway: Company {
	typealias tradeCurrency = Euro

	func buy<T, M>(product: T, with money: M) -> T? where T: Tradable, M: Money, BerkshireHathaway.TradeCurrency == M.Currency {
		return nil
	}
}

class Oil: Tradabel {}
var berk =  BerkshireHathaway()
let oil = berk.buy(product: Oil(), with: Irish())
```

# A Generic Networking Example

```swift
import Foundation

protocol Request {
	associatedtype Response
	associatedtype Error

	var baseURL: URL { get }
	var method: String { get }
}
```
