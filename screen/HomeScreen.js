import React, { useEffect, useState } from "react";
import { Text, View, Button, FlatList, StyleSheet,ScrollView } from "react-native";
const HomeScreen = ({ params, navigation }) => {
  const [state, setState] = useState({
    loading: true,
    cities: [],
  });
  useEffect(() => {
    fetchCities();
  }, []);
  const fetchCities = async () => {
    console.log("hello");
    try {
      const fetchResponse = await fetch(`https://secure.drivezy.com/city`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const res = await fetchResponse.json();
      // console.log("response",res)
      if (res) {
        setState((prev) => ({ ...prev, loading: false, cities: res.response }));
      }
      // return response;
    } catch (err) {
      console.log("err", err);
    }
  };
  // console.log("state",state)
  const navigateToDetail = (id)=>{
      navigation.navigate("Detail",{
          id:id
      })
  }
  return (
    <ScrollView scrollEnabled={true} style={styles.container}>
      <Text style={styles.heading}>Cities list</Text>
      {state.loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <View style={{ ...styles.head, ...styles.row }}>
            <Text style={styles.column}>Name</Text>
            <Text style={styles.column}>Contact Person</Text>
            <Text style={styles.column}>Contact Number</Text>
            <Text style={styles.column}>Minimum Fuelless hours</Text>
            <Text style={styles.column}>Action</Text>
          </View>
          <FlatList
            scrollEnabled={false}
            data={state.cities}
            renderItem={({ index, item }) => {
              //    console.log("each item",item)
              return (
                <View style={styles.row} key={index}>
                  <Text style={styles.column}>{item.name}</Text>
                  <Text style={styles.column}>{item.contact_person}</Text>
                  <Text style={styles.column}>{item.contact_number}</Text>
                  <Text style={styles.column}>
                    {item.minimum_fuelless_hours}
                  </Text>
                  <View style={styles.column}>
                      <Button   onPress={()=>navigateToDetail(item.id)} title="Detail"/>
                  </View>
                </View>
              );
            }}
          />
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
  },
  heading:{
      fontSize:20,
      fontWeight:"700",
      paddingBottom:20,
      textAlign:"center",
      textTransform:"uppercase"
  },
  head: {
    backgroundColor: "#82B1F7",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    flexWrap: "wrap",
    paddingTop: 5,
    paddingBottom: 5,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
export default HomeScreen;
