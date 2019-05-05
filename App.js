/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

const declarations =
  'document.body.style.fontSize = "300%";' +
  'var xx=" |xx| ";' +
  'yy=" |yy| ";' +
  'function f() { document.body.innerHTML += "<p>Function f was called.</p>"; };'

export default class App extends Component {
  componentDidMount () {
    setTimeout(() => {
      this.webRef.injectJavaScript(
        'var msg="";' +
          'try { msg += xx } catch (ex) { msg += ex.message };' +
          'try { msg += yy } catch (ey) { msg += ey.message };' +
          'try { f() } catch (ef) { msg += ef.message };' +
          'setTimeout(function() { window.alert(msg) })' // setTimeout so that f() can update DOM before alert is displayed
      )
    }, 1000)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <WebView
          ref={r => (this.webRef = r)}
          source={{ html: '<h1>Hi WebView!</h1>' }}
          injectedJavaScript={declarations + '; true'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
