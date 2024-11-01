import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [rooms, setRooms] = useState([]);
  const [review, setReview] = useState('');

  useEffect(() => {
    axios.get('https://example.com/api/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handlePayment = () => {
    axios.post('https://example.com/api/payments', { amount })
      .then(response => {
        console.log(response.data);
        // Handle successful payment
      })
      .catch(error => {
        console.error(error);
        // Handle payment error
      });
  };

  const submitReview = (roomId) => {
    axios.post(`https://example.com/api/rooms/${roomId}/reviews`, { review })
      .then(response => {
        console.log(response.data);
        // Handle successful review submission
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Enter Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Submit Payment" onPress={handlePayment} />
      <FlatList
        data={rooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.roomContainer}>
            <Text>{item.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Write a review"
              value={review}
              onChangeText={setReview}
            />
            <Button title="Submit Review" onPress={() => submitReview(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  roomContainer: {
    marginVertical: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default PaymentScreen;
