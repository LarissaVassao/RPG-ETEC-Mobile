import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  he: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    gap: 20,
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
  buttonPermanent: {
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
  createButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#124A69',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#124A69',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapScrollView: {
    flex: 1,
  },
});

// Estilos para o modal (agora exportados separadamente)
export const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  // Adicionar ao arquivo styles.js no objeto modalStyles:
contextModalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
contextModalContent: {
  backgroundColor: 'white',
  borderRadius: 15,
  padding: 20,
  width: '80%',
  maxWidth: 300,
},
contextModalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#124A69',
  textAlign: 'center',
  marginBottom: 20,
},
contextMenuItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 15,
  paddingHorizontal: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f0f0f0',
},
contextMenuText: {
  fontSize: 16,
  color: '#333',
  marginLeft: 10,
},
contextMenuDelete: {
  borderBottomWidth: 0,
},
contextMenuDeleteText: {
  color: '#ff6b6b',
},
contextMenuCancel: {
  marginTop: 10,
  paddingVertical: 12,
  alignItems: 'center',
  borderTopWidth: 1,
  borderTopColor: '#f0f0f0',
},
contextMenuCancelText: {
  fontSize: 16,
  color: '#666',
},
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#124A69',
  },
  closeButton: {
    padding: 4,
  },
  tokenList: {
    paddingHorizontal: 20,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: '#000',
  },
  tokenImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  tokenType: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
    fontStyle: 'italic',
  },
});