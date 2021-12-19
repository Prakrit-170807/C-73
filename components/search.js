import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput, FlatList, TouchableOpacity} from 'react-native';
var teams = ['red', 'blue', 'green', 'yellow'];

import database from "../config"
export default class Look extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Search: "",
      allTrasaction: [],
      lastTransaction: null,
    }
  }
  SearchTransaction = async (SearchPhrase) => {
    SearchPhrase = SearchPhrase.toUpperCase();
    var A_lphabet = SearchPhrase.split('')[0]

    if (A_lphabet == 'B') {
      const FindPhrase = await database.collection('Transac').where('BookID', '==', SearchPhrase).limit(5).get();
      FindPhrase.docs.map(doc => {
        this.setState({
          allTrasaction: [...this.state.allTrasaction, doc.data()],
          lastTransaction: doc
        })
      })
    }
    else if (A_lphabet == 'S') {
      const FindPhrase = await database.collection('Transac').where('StudentID', '==', SearchPhrase).limit(5).get();
      FindPhrase.docs.map(doc => {
        this.setState({
          allTrasaction: [...this.state.allTrasaction, doc.data()],
          lastTransaction: doc
        })
      })
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={{ width: 200, height: 40, borderWidth: 1.5, fontSize: 20 }}
            placeholder="Enter BookID or StudentID"
            onChangeText={(BOOKE) => { this.setState({ Search: BOOKE }) }}></TextInput>
          <TouchableOpacity style={styles.button} onPress={() => { this.SearchTransaction(this.state.Search) }}> <Text> SEARCH </Text> </TouchableOpacity>
        </View>
        <FlatList data={this.state.allTrasaction}
          keyExtractor={(item, index) => { index.toString }}
          renderItem={({ item }) => (
            <View style={{ margin: "10%", borderBottomWidth: 5, }}>
              <Text>{"BookID" + item.BookID}</Text>
              <Text>{"StudentID" + item.StudentID}</Text>
              <Text>{"Transction Type" + item.transactionType}</Text>
              <Text>{"Date" + item.Date.toDate()}</Text>
            </View>
          )}/>
      </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
  },
  button: {
    backgroundColor: '#66BB6A', width: 50, borderWidth: 1.5, borderLeftWidth: 0
  },
});
