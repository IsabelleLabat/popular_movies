import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Movie = ({ route, navigation }) => {
  const movieId = route.params.id;
  // console.log("id>>", route.params.id);
  // console.log(movieId);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM3NzdkNjJjOTRkNDAwMTQ4NTRkMWUiLCJlbWFpbCI6ImxhYmF0LmlzYWJlbGxlQGdtYWlsLmNvbSIsImV4cGlyYXRpb25EYXRlIjoiMjAyNC0wMy0wOFQwMDowMDowMC4wMDBaIiwiaXNUcmFpbmluZyI6dHJ1ZSwiaWF0IjoxNzAwNzQ0NTY1fQ.QpJgTPBbX3NZxsAA4rw_m8i5vzil2Fl5VeOmXOGCPLM";

  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const styles = useStyle();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/popular/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response>>", response.data.results);
        setMovie(response.data);

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
      {/* <Image style={styles.img} source={{ uri: movie.poster_path.w342 }} /> */}
      {/* <View style={styles.infos}>
        <Text>{movie.title}</Text>
        <Text style={styles.description} numberOfLines={4} ellipsizeMode="tail">
          {movie.overview}
        </Text>
      </View> */}
    </View>
  );
};

export default Movie;

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
