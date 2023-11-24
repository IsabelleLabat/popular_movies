import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/core";

const PopularMovies = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const styles = useStyle();
  const navigation = useNavigation();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3NzdkNjJjOTRkNDAwMTQ4NTRkMWUiLCJlbWFpbCI6ImxhYmF0LmlzYWJlbGxlQGdtYWlsLmNvbSIsImV4cGlyYXRpb25EYXRlIjoiMjAyNC0wMy0wOFQwMDowMDowMC4wMDBaIiwiaXNUcmFpbmluZyI6dHJ1ZSwiaWF0IjoxNzAwNzQ0NTY1fQ.QpJgTPBbX3NZxsAA4rw_m8i5vzil2Fl5VeOmXOGCPLM";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/popular",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(JSON.stringify(response.data, null, 2));
        // console.log("response>>", response.data.results);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return loading ? (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 100 }} />
  ) : (
    <View>
      {/* {data.results.map((movie) => {
        console.log(movie);
        return (
          <View>
            <Text>{movie.original_title}</Text>
          </View>
        );
      })} */}

      <FlatList
        data={data.results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          //   console.log(item);
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => navigation.navigate("Movie", { id: item.id })}
            >
              <Image
                style={styles.img}
                source={{ uri: item.poster_path.w342 }}
              />
              <View style={styles.infos}>
                <Text>{item.title}</Text>
                <Text
                  style={styles.description}
                  numberOfLines={4}
                  ellipsizeMode="tail"
                >
                  {item.overview}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default PopularMovies;

const useStyle = () => {
  const styles = StyleSheet.create({
    img: {
      height: 150,
      width: 100,
    },
    container: {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "red",
      flexDirection: "row",

      padding: 20,
      paddingRight: 20,
    },
    infos: {
      flex: 2,
      marginLeft: 10,
    },

    description: {
      color: "gray",
    },
  });
  return styles;
};
