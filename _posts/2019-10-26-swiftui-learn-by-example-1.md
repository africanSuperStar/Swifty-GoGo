---
layout: disqus
title: SwiftUI - Learn by Example 1
comments: true
permalink: swift-ui-learn-by-example-1/
date: 2019-10-26 19:02 +0200
---
Hello and welcome to this series on `SwiftUI`. The hot new framework by Apple. not entirely sure it's a framework but okay. I'm traditionally an iOS Developer, but I have done a lot of experimentation with Flutter and so I will be basing a lot of what might seem like bias opinion into thie series.

As always you can watch the screencast [here]() and then read through this written tutorial in your own time.

### So let's get started.

Apple boasts that `SwiftUI` is an easy to use `declarative` API which can be used across all platforms. So I will be putting this to the test by building a Recipe Recogniser which make use of Topic Modelling. The application will be able to receive an image of a food and will spit out a relevant recipe according to the classification of the image. It may seem like a difficult task. But shouldn't be too difficult. I will also be experimenting with the Tensorflow Swift API for the first time.

Notes:

1. Minimap
1. AppDelegate
  1. No storyboards
  1. Called when a new scene session is being created.
  1. Scene session
  1. Window to Provider in the scene delegate.
    1. Multiple windows for split views
1. CMD+R

```swift
import SwiftUI

let items = ["WWDC19", "Swift5"]

struct ContentView: View {
  var body: some View {
    List {
      Text(items[0])
      Text(items[1])
    }
  }
}
```

Add comments from Docs...

```swift
import SwiftUI

let items = ["WWDC19", "Swift5"]

struct ContentView: View {
  var body: some View {
    NavigationView {
      List {
        Text(items[0])
        Text(items[1])
      }
    }
  }
}
```

### Add a fullview Background

Can pass in any particular view into the background


```swift
import SwiftUI

struct ContentView: View {
  var body: some View {
    VStack {
      Spacer(),
      Spacer()
    }
    .background(image("background")
      .resizable()
      .scaleToFill()
      .clipped())
    .edgesIgnoringSafeArea([.top, .bottom])
  }
}
```

### A tabbed view
SFSymbols.com

To ensure tabs work properly you need to set a tag.

```swift
import SwiftUI

struct ContentView: View {
  var body: some View {
    TabbedView {
      WatchNowView()
        .tabItem {
          VStack {
            Image(systemName: "tv.fill")
            Text("Watch Now")
          }
        }
        .tag(0)

      LibraryView()
        .tabItem {
          VStack {
            Image(systemName: "rectangle.stack.fill")
            Text("Library")
          }
        }
        .tag(1)

      SearchView()
        .tabItem {
          VStack {
            Image(systemName: "magnifyingglass")
            Text("Search")
          }
        }
        .tag(2)
    }
  }
}

/// Make as a new .swift file
struct WatchNowView: View {
	var body: some View {
		NavigationView {
			List(0 ..< 5) { item in
				Text("👋 Watch Now")
			}.navigationBarTitle("Watch now")
		}
	}
}

/// Make as a new .swift file
struct LibraryView: View {
	var body: some View {
		NavigationView {
			List(0 ..< 15) { item in
				Text("👋 Library")
			}.navigationBarTitle("Library")
		}
	}
}

/// Make as a new .swift file
struct SearchView: View {
	var body: some View {
		NavigationView {
			Text("🤔")
				.font(.largeTitle)
				.navigationBarTitle("Search")
		}
	}
}
```

Pickers in SwiftUI and State, very important to use tags.

```swift
import SwiftUI

struct ContentView: View {

	@State private var countryIndex = 0

	let countries = [
		"South Africa",
		"Germany",
		"Russia"
		"Canada"
	]

	var body: some View {
		NavigationView {
			Form {
				Section {
					Picker(
						selection: $countryIndex,
						label: Text("Conutry")) {
							ForEach(0 ..< countries.count) {
								Text(self.countries[$0]).tag($0)
							}
						}
				}
			}.navigationBarTitle(Text("Country"))
		}
	}
}
```

Group {}
Section {}

| @State
| Simple properties like String or Int, Belongs to a specific view, Never used outside that view

| @ObservedObject
| Can be shared across views
| More complex properties (e.g. custom type)
| External reference type that has to be managed (Create an instance of the class, create its own properties, ...)
| Class should confomr to ObservableObject
| @Published property wrapper used to mark properties that should force a view to refresh.

| @EnvironmentObject
