
## SliConf v0.0.1

# Content

-	[Screens](#screens)
-	[Technologies](#technologies)
-	[Get Started](#get-started)


## Screens
 

## Technologies

### [React Native](https://github.com/facebook/react-native)
React Native helps in making the development work easier and allowing the developers to focus on the core app features in every new release. It is the fastest-developing mobile app development that essentially permits you to create an isolated product with often outcomes.

**The hymn of React Native — learn once, write anywhere.**

React Native takes charge of the view controllers and programmatically generates native views using javascript. This means that you can have all the speed and power of a native application, with the ease of development that comes with React.


### [NativeBase](https://nativebase.io/)

NativeBase is a free and open source framework.

This framework enable developers to build high-quality mobile apps using React Native iOS and Android apps with a fusion of ES6. NativeBase builds a layer on top of React Native that provides you with basic set of components for mobile application development.

The applications stack of components is built using native UI components and because of that, there are no compromises with the User Experience of the applications.  NativeBase is targeted specially on the look and feel, and UI interplay of your app.

NativeBase without a doubt fits in well with mobile applications which cut downs one huge part of your app The Front end.

-	*[On GitHub](https://github.com/GeekyAnts/NativeBase)*
-	*[Docs](https://docs.nativebase.io/Components.html#Components)*



### [Redux](http://redux.js.org)

As the requirements for JavaScript single-page applications have become increasingly complicated, our code must manage more state than ever before. UI state is also increasing in complexity, as we need to manage the active route, the selected tab, whether to show a spinner or not, should pagination controls be displayed, and so on.

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

Redux attempts to make state mutations predictable by imposing certain restrictions on how and when updates can happen. These restrictions are reflected in the steps of three.

-	The **state** of whole application is stored in an object tree within a single **store**.
-	The only way to mutate the state is to emit an **action**, an object describing what happened.
-	To specify how the state tree is transformed by actions, you write pure **reducers**.



### [React Navigation](https://reactnavigation.org/)
[React Navigation](https://reactnavigation.org/) is a routing package that allows you to:
  * Declare different kinds of Routers.
  * Routers fall into the category of **StackNavigator ,** **DrawerNavigator ,** and **TabNavigator**.
  * We can also nest these Routers for more complex transitions.



### [React Native Easy Grid](https://github.com/GeekyAnts/react-native-easy-grid)

React Native Easy Grid is an open source package for grid layout from the team of [NativeBase](https://nativebase.io/).

The layout system is an essential concept that needs to be mastered in order to create great layouts and UIs. [React Native](https://github.com/facebook/react-native) uses Flexbox to create the layouts, which is great when we need to accommodate our components and views in different screen sizes or even different devices. Flexbox is awesome but it could be tiresome for newbies.

Easy Grid is very powerful and flexible layout system. No more worries about props of Flexbox such as alignItems, flexDirection, justifyContent, margin, padding, position, width etc. You can create any layout with all the available options that we have. Flexbox makes it look like percentages, however what actually is happening is just ratios. On the easier part, ratios are easier to represent than percentage/decimals. For this reason, the Easy Grid takes in ratios in place of percentage.
Performance wise, Easy Grid is noteworthy and works as fine as Flexbox, not much of calculation.

[More Examples](https://docs.nativebase.io/Components.html#Layout) . . .


## Get Started

### 1. System Requirements

* Globally installed [node](https://nodejs.org/en/)

* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html)


### 2. Installation

On the command prompt run the following commands

```sh
$ git clone https://github.com/altuga/sliconf-mobil.git


$ npm install
```

```sh
$ react-native link
```



### 3. Simulate for iOS

**Method One**

*	Run the following command in your terminal

```sh
$ react-native run-ios
```

**Method Two**

*	Open the project in XCode from **ios/SliConf.xcodeproj**

*	Hit the play button.




### 4. Simulate for Android

*	Make sure you have an **Android emulator** installed and running.

*	Run the following command in your terminal

```sh
$ react-native run-android
```

