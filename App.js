import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Easing,
} from "react-native";
import moment from "moment";
import { Animated } from "react-native";
import { TouchableOpacity } from "react-native";

const Timezone = {
  Brasil: "-03:00",
  Londres: "+01:00",
  Japao: "+09:00",
};

export default function App() {
  const [currentDate, setCurrentDate] = useState("");
  const [timezone, setTimezone] = useState(Timezone.Brasil);
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  const [actualCountry, setActualCountry] = new useState("do Brasil")

  useEffect(() => {
    let date = moment().utcOffset(timezone).format("DD/MM/YYYY HH:mm:ss");
    setCurrentDate(date);

    const intervalId = setInterval(() => {
      date = moment().utcOffset(timezone).format("DD/MM/YYYY HH:mm:ss");

      setCurrentDate(date);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  function mudarHorarioBrasil() {
    setTimezone(Timezone.Brasil);
    setActualCountry("do Brasil")
    console.log("Timezone set to Brazil");
  }

  function mudarHorarioLondres() {
    setTimezone(Timezone.Londres);
    setActualCountry("de Londres")
    console.log("Timezone set to London");
  }

  function mudarHorarioJapao() {
    setTimezone(Timezone.Japao);
    setActualCountry("do Japão")
    console.log("Timezone set to Japan");
  }

  function spinClock() {
    Animated.timing(spinValue, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => setSpinValue(new Animated.Value(0)));
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View>
        <Animated.Image
          source={require("./assets/img/crono3.png")}
          style={[styles.img, { transform: [{ rotate: spin }] }]}
        />
        <Text style={[styles.horaStyle]}>Data e Hora atual {actualCountry}</Text>
        <Text style={[styles.horaAtual]}> {currentDate}</Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              timezone == Timezone.Brasil
                ? styles.btnDisabled
                : styles.btnEnabled,
            ]}
            activeOpacity={0.8}
            onPress={() => {
              mudarHorarioBrasil();
              spinClock();
            }}
            disabled={timezone == Timezone.Brasil}
          >
            <Text style={[styles.btnText]}>Horario do Brasil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              timezone == Timezone.Londres
                ? styles.btnDisabled
                : styles.btnEnabled,
            ]}
            activeOpacity={0.8}
            onPress={() => {
              mudarHorarioLondres();
              spinClock();
            }}
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
            onPress={() => {
              mudarHorarioJapao();
              spinClock();
            }}
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
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  horaAtual: {
    fontFamily: "lugrasimo",
    alignSelf: "center",
    marginTop: 5,
    fontSize: 15,
    color: "#eee",
    fontWeight: "bold",
    textShadowRadius: 12,
    textShadowColor: 'green',
  },
  btnContainer: {
    height: 50,
    width: "100%",
    fontSize: 20,
    paddingTop: 85,
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
    height: 392,
    marginBottom: -210,
   
    resizeMode: "contain",
    //transform: [{ rotate: '180deg'}]
  },
});
