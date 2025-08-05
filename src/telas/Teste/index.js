import React, {useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

export default function Home({ navigation }) {
 const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
    <View style={{flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: -10,
  },
  logo: {
    width: 200,
    height: 200,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#623372',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  actionButton: {
    width: '100%',
    height: 55,
    borderRadius: 8,
    backgroundColor: '#623372',  
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  helpButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#623372',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
