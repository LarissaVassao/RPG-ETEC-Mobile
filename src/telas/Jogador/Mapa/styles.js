import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  he: {
     paddingHorizontal: 25,
    paddingTop: 20,
    },
buttonsContainer: {
  flexDirection: 'row',
  justifyContent: 'center', // Centraliza os botões
  alignItems: 'center',
  marginVertical: 10,
  gap: 20, // 20px de distância entre os botões
},
button: {
  backgroundColor: '#124A69',
  width: 120,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5,
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
},
  buttonPermanent:{
    backgroundColor: '#124A69',
    width: 120,
    height: 40,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },

  formContainer: {
    padding: 20,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    textAlign: 'center',
  },
    header: {
    backgroundColor: '#124A69',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
 headerTitle: {
  color: '#fff',
  fontSize: 20,
  fontWeight: '600',
  letterSpacing: 0.3,
  textAlign: 'center',
  flex: 1, 
  marginHorizontal: 10,
  top: 5
},
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
