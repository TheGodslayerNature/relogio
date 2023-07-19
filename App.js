import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  Pressable,
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
      let date = moment().utcOffset(timezone).format("DD/MM/YYYY HH:mm:ss");

      setCurrentDate(date);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  function mudarHorarioBrasil() {
    setTimezone(Timezone.Brasil);
  }

  function mudarHorarioLondres() {
    setTimezone(Timezone.Londres);
  }

  function mudarHorarioJapao() {
    setTimezone(Timezone.Japao);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View>
        <Animated.Image
          source={require("./src/img/crono.png")}
          style={[styles.img]}
        />
        <Text style={[styles.horaStyle]}>Data e Hora </Text>
        <Text style={[styles.horaAtual]}>{currentDate}</Text>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[
              styles.btn,
              timezone == Timezone.Brasil
                ? styles.btnDisabled
                : styles.btnEnabled,
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
            disabled = {timezone == Timezone.Londres}
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
            disabled = {timezone == Timezone.Japao}
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
    justifyContent: "center",
    alignItems: "center",
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
    //transform: [{ rotate: '180deg'}]
  },
});
