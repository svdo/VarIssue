# Var Issue

This repo demonstrates an issue that I'm experiencing and have trouble explaining.
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

Please note that declaring the variables and function using `injectJavaScript`
instead of `injectedJavaScript` causes everything to work as expected, both on
Android and on iOS.

[webview]: https://github.com/react-native-community/react-native-webview
[injectedjavascript]: https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#injectedjavascript
[ios]: ./iOS.png
[android]: ./Android.png
