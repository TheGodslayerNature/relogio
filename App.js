import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  Easing,
} from "react-native";
import moment from "moment";
import { Animated } from "react-native";
import { TouchableOpacity } from "react-native-web";

const Timezone = {
  Brasil: "-03:00",
  Londres: "+01:00",
  Japao: "+09:00",
};

export default function App() {
  const [currentDate, setCurrentDate] = useState("");
  const [timezone, setTimezone] = useState(Timezone.Brasil);

  useEffect(() => {    
    let date = moment().utcOffset(timezone).format("DD/MM/YYYY HH:mm:ss");
    setCurrentDate(date);
    
    const intervalId = setInterval(() => {
       date = moment().utcOffset(timezone).format("DD/MM/YYYY HH:mm:ss");

      setCurrentDate(date);
    }, 3000);

    return () => clearInterval(intervalId);
  },[timezone]);

  function mudarHorarioBrasil() {
    imageRotate();
    setTimezone(Timezone.Brasil);
    console.log("Timezone set to Brazil");
  }

  function mudarHorarioLondres() {
    rotateImg();
    setTimezone(Timezone.Londres);
    console.log("Timezone set to London");
  }

  function mudarHorarioJapao() {
    rotateImg();
    setTimezone(Timezone.Japao);
    console.log("Timezone set to Japan");
  }

  let rotateValue = new Animated.Value(0)

  function rotateImg() {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }

  const imageRotate = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }

  const RotateData = rotateValue.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View>
        <Animated.Image
          source={require("./assets/img/crono.png")}
          style={[styles.img, {transform: [{rotate: RotateData}]}]}
        />
        <Text style={[styles.horaStyle]}>Data e Hora </Text>
        <Text style={[styles.horaAtual]}>{currentDate}</Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              timezone == Timezone.Brasil
                ? styles.btnDisabled
                : styles.btnEnabled, imageRotate
            ]}
            activeOpacity={0.8}
            onPress={mudarHorarioBrasil}
            disabled={timezone == Timezone.Brasil}
          >
            <Text style={[styles.btnText]}>Horario Do Brasil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              timezone == Timezone.Londres
                ? styles.btnDisabled
                : styles.btnEnabled,
            ]}
            activeOpacity={0.8}
            onPress={mudarHorarioLondres}
            onPressIn={rotateImg()}
            disabled={timezone == Timezone.Londres}
          >
            <Text style={[styles.btnText]}>Horario de Londres</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              timezone == Timezone.Japao
                ? styles.btnDisabled
                : styles.btnEnabled,
            ]}
            activeOpacity={0.8}
            onPress={mudarHorarioJapao}
            disabled={timezone == Timezone.Japao}
          >
            <Text style={[styles.btnText]}>Horario do Japão</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18af75",
  },
  horaStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  horaAtual: {
    fontFamily: "lugrasimo",
    alignSelf: "center",
    marginTop: 5,
    fontSize: 17,
    color: "#fff",
  },
  btnContainer: {
    height: 50,
    width: "100%",
    fontSize: 20,
    paddingTop: 80,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 25,
    marginTop: 5,
    borderWidth: 2,
    borderColor: "#7EE759",
  },
  btnText: {
    color: "#fff",
    letterSpacing: 0.5,
  },
  btnEnabled: {
    backgroundColor: "black",
  },
  btnDisabled: {
    backgroundColor: "gray",
  },
  img: {
    width: 220,
    height: 250,
    marginBottom: -100,
    opacity: 0.7,
    resizeMode: "contain",
    //transform: [{ rotate: '180deg'}]
  },
});
