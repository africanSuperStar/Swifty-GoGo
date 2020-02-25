---
layout: post
title: Multiple Inheritence in Swift
date: 2019-11-26 15:19 +0200
---

In Swift, a class can conform to multiple protocols but inherit from only one class

A mixin is a class that contains methods for use by other classes without having to be the parent class of those other classes:

- Mixins contain both behaviour and state
- Is not supposed ot be initialised
- Is highly specialised and narrow in its functionality
- Is not intended to be sub-classed by other mixins

```swift
import UIKit
import PlaygroundSupport

protocol Flashable {
	func flash()
}

extension Flashable where Self: UIView {
	func flash() {
		alpha = 1

		UIView.animate(
			withDuration: 0.3,
			delay: 0.25,
			options: [.repeat, .autoreverse],
			animations: {
				self.alpha = 0
			}
		)
	}
}

protocol Raisable {
	func raise()
}

extension Raisable where Self: UIView {
	func raise() {
		transform  = .identity

		UIView.animate(
			withDuration: 1,
			delay: 0.25,
			options: [.repeat, .autoreverse],
			animations: {
				self.transform = CGAffineTransform(scaleX: 1, y: 3)
			}
		)
	}
}

class NewView: UIView, Raisable, Flashable {}

class ViewController: UIViewController {
	override func loadView() {
		let view = NewView()
		view.backgroundColor = .orange
		view.raise()
		view.flash()
		self.view = view
	}
}

PlaygroundPage.current.liveView = ViewController()
```
