# Var Issue

This repo demonstrates [an issue that I'm experiencing][issue] and have trouble explaining.
This issue is this.

I have a React Native app that uses a [WebView component][webview]. The webview
has some static HTML (i.e. does not load anything external). I then use the
[`injectedJavaScript`][injectedjavascript] property to load Javascript into it.
This piece of JavaScript declares two variables in the "global" scope (i.e.
`window` in this case): `xx` and `yy`. The difference is that `xx` is declared
with the `var` keyword, whereas `yy` is not. Furthermore, it declares a function
`f` that appends a string to the WebView's body.

Next, after a timeout of a second, another piece of JavaScript is executed on
the WebView using `injectJavaScript`. This demonstrates that on iOS both variables
and the function are available and can be used. On Android, however, only `yy`
is available; both `xx` and the function `f` are unavailable.

## iOS Output

On iOS you can see that the function `f` was called and that the two variables are available:

![iOS][ios]

## Android Output

On Android both `xx` and `f` are not defined.

![Android][android]

## Note / Workaround

Please note that declaring the variables and function using `injectJavaScript`
instead of `injectedJavaScript` causes everything to work as expected, both on
Android and on iOS.

## Versions

- Android 9 / iOS 11
- react-native-webview: 5.8.1
- `yarn react-native info`:
  ```
  React Native Environment Info:
    System:
      OS: macOS 10.14.4
      CPU: (12) x64 Intel(R) Core(TM)   i7-8850H CPU @ 2.60GHz
      Memory: 18.87 MB / 16.00 GB
      Shell: 5.3 - /bin/zsh
    Binaries:
      Node: 11.14.0 - /var/folders/0d/  5_t6qk7s06qf94jnypzwh6yh0000gp/T/  yarn--1557086445011-0.  06815149805556375/node
      Yarn: 1.15.2 - /var/folders/0d/  5_t6qk7s06qf94jnypzwh6yh0000gp/T/  yarn--1557086445011-0.  06815149805556375/yarn
      npm: 6.9.0 - ~/.homebrew/bin/npm
    SDKs:
      iOS SDK:
        Platforms: iOS 12.2, macOS   10.14, tvOS 12.2, watchOS 5.2
    IDEs:
      Xcode: 10.2.1/10E1001 - /usr/bin/  xcodebuild
    npmPackages:
      react: 16.8.3 => 16.8.3
      react-native: 0.59.5 => 0.59.5
  ```

[issue]: https://github.com/react-native-community/react-native-webview/issues/554
[webview]: https://github.com/react-native-community/react-native-webview
[injectedjavascript]: https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#injectedjavascript
[ios]: ./iOS.png
[android]: ./Android.png
