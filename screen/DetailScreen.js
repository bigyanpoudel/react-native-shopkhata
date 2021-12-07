import React, { useEffect, useState } from "react";
import { Text, View,Image,StyleSheet } from "react-native";

const DetailScreen = ({ params, route }) => {
  const [state, setState] = useState({
    loading: true,
    city: null,
    error: null,
  });
  const id = route?.params?.id;
  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id]);
  const fetchDetail = async (id) => {
    console.log("hello");
    try {
      const fetchResponse = await fetch(
        `https://secure.drivezy.com/city/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const res = await fetchResponse.json();
      console.log("response", res);
      if (res.success) {
        setState((prev) => ({ ...prev, loading: false, city: res.response }));
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Oops! Something went wrong",
        }));
      }
      // return response;
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Detail Screen</Text>
      {
          state.loading ? <Text>Loading...</Text> :
          state.error ? <Text>{state.error}</Text>:
          <View>
              <Image style={styles.image} source={{uri:state.city.image}}/>
              <View>
                  <Text>Name : {state.city.name}</Text>
                  <Text>Contact Number : {state.city.contact_number}</Text>
                  <Text>Contact Person : {state.city.contact_person}</Text>
                  <Text>Car Allowed : {state.city.is_car_allowed}</Text>
                  <Text>Bike Allowed : {state.city.is_bike_allowed}</Text>
                  <Text>Bike Allowed : {state.city.is_bike_allowed}</Text>
                  <Text>Latitude : {state.city.latitude}  Longitude: {state.city.longitude}</Text>
              </View>
          </View>
      }
    </View>
  );
};
const styles = StyleSheet.create({
    container:{
        padding:10
    },
    image:{
        width:"100%",
        height:300,
        resizeMode:"contain"
    }
})
export default DetailScreen;
