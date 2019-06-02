import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Image,
  TouchableHighlight,
  Button,
  AppState,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import PushNotification from 'react-native-push-notification';
import SplashScreen from 'react-native-splash-screen';

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = { seconds: '0' };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
  }

  componentWillMount() {
    alert('az');
    this.animatedValue = new Animated.Value(0);
    // this.animatedValue2 = new Animated.Value(0);
  }

  componentDidMount() {
    // SplashScreen.hide();
    this.animate();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleCounter = sec => {
    this.setState({
      seconds: sec,
    });
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  onDoneCountdown = () => {
    this.setState({
      seconds: '',
    });
    Animated.timing(this.animatedValue, {
      toValue: 2,
      duration: 1000,
    }).start();
  };

  handleAppStateChange(appState) {
    if (appState === 'background') {
      const date = new Date(Date.now() + this.state.seconds * 1000);
      const minutes = parseInt((this.state.seconds / 60) % 60);
      if (minutes > 0) {
        const secondes = parseInt(this.state.seconds % 60);
        PushNotification.localNotificationSchedule({
          message: `Votre repos de ${minutes} minutes et ${secondes} secondes est terminé.`,
          date,
          playSound: true,
        });
      } else {
        PushNotification.localNotificationSchedule({
          message: `Votre repos de ${this.state.seconds} secondes est terminé.`,
          date,
          playSound: true,
        });
      }
    }
  }

  render() {
    const marginLeft = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 500],
    });
    const movingMargin = this.animatedValue2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 300, 0],
    });

    const interpolateRotation = this.animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['0deg', '180deg', '360deg'],
    });
    const animatedStyle = {
      transform: [{ rotate: interpolateRotation }],
    };
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#fff" />
        <View style={styles.countdown}>
          {this.state.seconds > 0 && (
            <CountDown
              until={parseInt(this.state.seconds)}
              timeToShow={this.state.seconds >= 60 ? ['M', 'S'] : ['S']}
              timeLabels={{ m: '', s: '' }}
              onFinish={this.onDoneCountdown}
              digitStyle={{ backgroundColor: '#1D222C' }}
              digitTxtStyle={{ color: '#fff' }}
              onPress={this.onPressCountdown}
              size={50}
            />
          )}
        </View>

        <Animated.View style={[styles.box, animatedStyle]}>
          <Image
            source={require('./assets/sablier.png')}
            style={{ width: 200, height: 200 }}
          />
        </Animated.View>

        <View style={styles.times}>
          <TouchableHighlight style={styles.TouchableHighlight}>
            <Button
              onPress={() => this.handleCounter(5)}
              title="30 sec"
              color="#fff"
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.TouchableHighlight}>
            <Button
              onPress={() => this.handleCounter(60)}
              title="60 sec"
              color="#fff"
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.TouchableHighlight}>
            <Button
              onPress={() => this.handleCounter(90)}
              title="1 min 30 sec"
              color="#fff"
            />
          </TouchableHighlight>
          <TouchableHighlight style={styles.TouchableHighlight}>
            <Button
              onPress={() => this.handleCounter(120)}
              title="2 min"
              color="#fff"
            />
          </TouchableHighlight>
        </View>
        <Animated.View
          style={{
            marginLeft,
            height: 30,
            width: 40,
            backgroundColor: 'red',
          }}
        />
        <Animated.View
          style={{
            marginLeft: movingMargin,
            height: 30,
            width: 500,
          }}
        >
          <Image
            source={require('./assets/sablier.png')}
            style={{ width: 200, height: 200 }}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D222C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    color: '#fff',
    width: '50%',
    marginBottom: 30,
    height: 100,
    fontSize: 0,
  },
  TouchableHighlight: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'stretch',
    alignItems: 'center',
    width: '46%',
    backgroundColor: '#282D36',
    marginTop: 20,
    padding: 10,
  },
  times: {
    padding: 10,
    width: 320,
    height: 320,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'stretch',
    alignItems: 'stretch',
  },
  countdown: {
    height: 150,
  },
});
