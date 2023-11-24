import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";

const PopularMovies = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const styles = useStyle();

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
        console.log(JSON.stringify(response.data, null, 2));
        console.log(response.data);
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
      <Text>Test1</Text>
      {/* {data.results.map((movie) => {
        console.log(movie);
        return (
          <View>
            <Text>{movie.original_title}</Text>
          </View>
        );
      })} */}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          //   console.log(item);
          return (
            <View>
              {/* <Image style={styles.img} source={{ uri: item.poster_path[0] }} /> */}
              <Text>{item.title}</Text>
              <Text>{item.overview}</Text>
            </View>
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
      height: 100,
      width: 50,
    },
  });
  return styles;
};
