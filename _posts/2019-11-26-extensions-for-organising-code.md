---
layout: post
title: Extensions for Organising Code
date: 2019-11-26 15:32 +0200
---

Starting off with:

```swift
import UIKit

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

	@IBOutlet weak var tableView: UITableView!

	override func viewDidLoad() {
		super.viewDidLoad()
		tabelView.delegate = self
		loadData()
	}

	overrride func viewWillAppear(_ animated: Bool) {
		super.viewWillAppear(animated)
	}
}

// Delegate into own section
// Isolate th viewcontroller

extension ViewController: UITableViewDelegate, UITableVIewDataSource {
	func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
		return 0
	}

	func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
		return UITableViewCell()
	}
}

private extension ViewController {
	func loadData() {

	}
}
// Separate into private and public functions
```

Use extensions to preserve initialsers

```swift
struct Pet {
	let name: String
	let type: String
}

extension Pet {
	init(dictionary: [String: String]) {
		self.name = dictionary["name"] ?? "Gerry"
		self.type = dictionary["type"] ?? "Cat"
	}
}

let pet = Pet(name: "Gerry", type: "Cat")
let pet = (dictionary: [:])
```
