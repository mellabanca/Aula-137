import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `https://88b6-2001-1284-f034-11a3-a99a-9914-3576-ab27.sa.ngrok.io/planet?name=${
        this.props.navigation.getParam("planet_name")}`
,
    };
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        this.setDetails(response.data.data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/Gas_Giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/Terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/Super_Earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/Neptune-like.png");
        break;
      default:
        imagePath = require("../assets/Gas_Giant.png");
    }

    this.setState({
      details: planetDetails,
      imagePath: imagePath,
    });
  };

  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/bg.png")}
            style={{ flex: 1, paddingTop: 20 }}
          >
            <Image
              source={imagePath}
              style={{
                height: 250,
                width: 250,
                marginTop: 50,
                alignSelf: "center",
              }}
            />
            <View style={{ marginTop: 50 }}>
              <Text style={styles.planetName}>{details.name}</Text>
              <View style={{ alignSelf: "center" }}>
                <Text
                  style={styles.planetData}
                >{`Distância da Terra: ${details.distance_from_earth}`}</Text>
                <Text
                  style={styles.planetData}
                >{`Distância do Sol: ${details.distance_from_their_sun}`}</Text>
                <Text
                  style={styles.planetData}
                >{`Gravidade: ${details.gravity}`}</Text>
                <Text
                  style={styles.planetData}
                >{`Período Orbital: ${details.orbital_period}`}</Text>
                <Text
                  style={styles.planetData}
                >{`Velocidade Orbital: ${details.orbital_speed.toFixed(8)}`}</Text>
                <Text
                  style={styles.planetData}
                >{`Massa do Planeta: ${details.planet_mass}`}</Text>
                <Text
                  style={styles.planetData}
                >{`Raio do Planeta: ${details.planet_radius}`}</Text>
                <Text
                  style={styles.planetData}
                >{`Tipo do Planeta: ${details.planet_type}`}</Text>
                <View style={{ flexDirection: "row",alignSelf:"center" }}>
                  <Text style={styles.planetData}>
                    {details.specifications ? `Especificações: ` : ""}
                  </Text>
                  {details.specifications.map((item, index) => (
                    <Text key={index.toString()} style={styles.planetData}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  planetName: {
    fontSize: 45,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    width: "80%",
    alignSelf: "center",
    fontFamily:"monospace"
  },
  planetData: {
    fontSize: 15,
    color: "white",
    textAlign:"center",
    fontFamily:"monospace"
  },
});