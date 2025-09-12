import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  colors: {
    primaryBlue: '#092534',
    secondaryBlue: '#1E3A53',
    lightBlue: '#0A2D42',
    darkBlue: '#124A69',
    gold: '#4cf3ffff',
    white: '#FFFFFF',
    lightGray: '#CCCCCC',
    darkGray: '#333333'
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  //Header quase completa
header: {
  backgroundColor: '#124A69',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 10,
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
  zIndex: 1,
  position: 'absolute',
  left: 10,
  justifyContent: 'center',
  alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 100,
},

//é da modal
  createButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainContent: {
    flex: 1,
    marginTop: 205,
  },
  viewTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffffff',
    textAlign: 'center',
    marginVertical: 10,
    marginTop: 5,
    textShadowColor: '#000000ff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,

  },
  scrollContent: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  columnStyle: {
    position: 'absolute',
    top: 0,
    width: 5,
    height: '10%',
    backgroundColor: '#124A69',
  },
  namePlayer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#124A69',
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 135, 
  },
  playerInput: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    color: '#dfdfdfff',
    fontSize: 16,
  },

  characterBase: {
    position: 'absolute',
    top: 75,
    width: '100%',
    height: 50,
    //backgroundColor: '#cde1ffff'
  },
  nameCharacter: {
    top: 0,
    marginLeft: 110, 
  },
  // Adicione esses estilos ao seu arquivo styles.js
nameInputTouchable: {
  padding: 10,
  borderRadius: 5,
  minHeight: 40,
  justifyContent: 'center',
},
nameText: {
  fontSize: 20,
  color: '#000',
  fontWeight: '600'
},
occupationInputTouchable: {
  padding: 8,
  borderRadius: 5,
  minHeight: 35,
  justifyContent: 'center',
  flex: 1,
},
// Adicione esses estilos ao seu arquivo styles.js
classContainer: {
  marginBottom: 10, // Espaço entre classe e nível
  width: '100%', // Ocupa toda a largura
},
levelContainer: {
  width: '100%', // Ocupa toda a largura
},
ocupationCharacter: {
  flexDirection: 'column', // Muda para coluna para empilhar verticalmente
  alignItems: 'flex-start', // Alinha à esquerda
  width: '100%',
},
occupationItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
  width: '100%',
},
occupationText: {
  fontSize: 14,
},
  name:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  ocupationCharacter: {
    marginLeft: 120,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '-10',
  },
  occupationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '10',
  },
  occupationLabel: {
    fontSize: 15,
    color: '#000',
    marginRight: 5,
  },
  occupationInput: {
    width: 100,
    height: 40,
    borderColor: '#ccc',
  },
  imageStyle: {
    position: 'absolute',
    top: 70,
    left: 5,
    width: 100,
    height: 100,
    //borderBottomRightRadius: 100,
    zIndex: 1,
    //borderBottomColor: '#124A69',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#124A69',
  },

  buttonsContainer: {
    position: 'absolute',
    top: 185, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 0,
  },
  buttons: {
    width: '23%',
    height: 80,
    borderRadius: 10,
    borderBottomEndRadius:0,
    borderBottomLeftRadius:0,
    marginInline: '1%',
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  redView: {
    flex: 1,
    backgroundColor: '#2188C0',
    padding: 10,
  },
  greenView: {
    flex: 1,
    backgroundColor: '#1E7CAE',
    padding: 10,
  },
  blueView: {
    flex: 1,
    backgroundColor: '#18638C',
    padding: 10,
  },
  pinkView: {
    flex: 1,
    backgroundColor: '#124A69',
    padding: 10,
  },
  containerWithBorder: {
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
    marginBottom: 15,
  },
  label: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0A2D42',
    color: '#4cf3ffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    fontSize: 14,
  },
sectionTitle: {
  fontSize: 27,
  fontWeight: 'bold',
  color: '#ffffffff',
  textAlign: 'center',
  marginBottom: 20,
  fontFamily: 'System',
  textShadowColor: '#a19420ff',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
},
tableContainer: {
  flex: 1,
  backgroundColor: '#cccccc8e',
  borderRadius: 12,
  overflow: 'hidden',
  borderWidth: 2,
  borderColor: '#0A2D42',
  marginHorizontal: 2, // Adicione margens laterais menores
},
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0A2D42',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#4cf3ffff',
  },
  headerText: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
headerName: { flex: 2, textAlign: 'center' }, // Adicionei textAlign: 'left'
headerPrice: { flex: 1, textAlign: 'center' },
headerWeight: { flex: 1, textAlign: 'center' },
headerActions: { flex: 0.8, textAlign: 'center' },
      
 tableRow: {
  flexDirection: 'row',
  padding: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#444',
  alignItems: 'center', // Centraliza verticalmente
  backgroundColor: '#333',
  minHeight: 50, // Altura mínima para melhor visualização
},
cellText: {
  fontSize: 14,
  color: '#FFF',
  textAlign: 'center', // Centraliza horizontalmente
  textAlignVertical: 'center', // Centraliza verticalmente (funciona melhor em alguns casos)
},
cellName: { 
  flex: 2,
  fontWeight: 'bold',
  color: '#4cf3ffff',
  textAlign: 'center', // Centralizado
  paddingHorizontal: 5, // Pequeno padding lateral
},
cellPrice: { 
  flex: 1,
  fontWeight: 'bold',
  color: '#4cf3ffff',
  textAlign: 'center', // Centralizado
  paddingHorizontal: 5,
},
cellWeight: { 
  flex: 1,
  fontWeight: 'bold',
  color: '#4cf3ffff',
  textAlign: 'center', // Centralizado
  paddingHorizontal: 5,
},
cellActions: {
  flex: 0.8,
  flexDirection: 'row',
  justifyContent: 'center', // Centraliza os ícones
  alignItems: 'center',
  paddingHorizontal: 5,
},


credit: {
  color: '#4cf3ffff',
  fontWeight: 'bold',
},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: '100%'
  },
  modalContainer: {
    backgroundColor: '#686868ff',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    maxHeight: '80%', 
    borderWidth: 3,
    borderColor: '#ffffffff',
  },
  modalContentScroll: {
  maxHeight: 250, 
  },
  modalContentContainer: {
    paddingBottom: 20, 
  },
  modalHeader: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffffff',
    paddingBottom: 15,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5bb5ffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalType: {
    fontSize: 16,
    color: '#dadadaff',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontStyle: 'italic',
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#5e5e5eff',
    borderRadius: 6,
  },
  modalLabel: {
    color: '#a9e1ffff',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
  },
  modalValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  modalDescription: {
    color: '#CCC',
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
    marginTop: 8,
  },
  modalCloseButton: {
    backgroundColor: '#59a2f7ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ffffffff',
  },
  modalCloseText: {
    color: '#ffffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
// comum: { color: '#FFFFFF' },
// raro: { color: '#0070DD' },
// epico: { color: '#A335EE' },
// lendario: { color: '#FF8000' },
descriptionContainer: {
  marginTop: 20,
  padding: 12,
  backgroundColor: '#6e6e6eff',
  borderRadius: 8,
  borderLeftWidth: 4,
  borderLeftColor: '#092534',
},

  containerBackground: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    marginBottom: 7, 
  },

  lifeBackground: {
    backgroundColor: '#79899D',
    width: '50%',
    height: 45,
    borderRadius: 50,
    borderColor: '#4B617C',
    borderWidth: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  subtractAndAdditionbox: {
    backgroundColor: '#79899D',
    width: '15%',
    height: 45,
    borderWidth: 3,
    borderColor: '#4B617C',
    borderRadius: 3
  },

  three: {
      top: 10,
      justifyContent: 'space-around',
      width: '90%',
      flexDirection: 'row',

  },

    
  scrollView: {
    flex: 1,
  },

  
 skillTitle: {
  fontSize: 27,
  fontWeight: 'bold',
  color: '#4cf3ffff',
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 15,
  textShadowColor: '#251083ff',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
},

skillContainer: {
  marginBottom: 12,
  width: '100%',
  alignSelf: 'center'
},

skillBackground: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#0A2D42',
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: '#4cf3ffff',
},
skillText: {
  flex: 1,
  fontSize: 16,
    textTransform: 'uppercase',
  fontWeight: 'bold',
  color: '#4cf3ffff',
  
},
  skillInputTouchable: {
    width: 100,
    height: 35,
    backgroundColor: '#1E3A53',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5683B9',
  },
  skillInputText: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
skillInput: {
  width: 50,
  height: 35,
  backgroundColor: '#FFF',
  borderRadius: 5,
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#092534',
},
  attributeContainer:{
    position: 'absolute',
    top: 1, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 2, 
  },
  attributesBackgroundTop:{
    width: '30%',
    height: 110,
    backgroundColor: '#0A2D42',
    marginInline: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,

  },
 attributesBackgroundBottom:{
    width: '30%',
    height: 110,
    backgroundColor: '#0A2D42',
    marginInline: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,

  },
   attributeContainerLuck:{
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
  },
  attributeBackgroundLuck: {
    top: 250,
    width: '70%',
    height: 110,
    backgroundColor: '#0A2D42',
    borderRadius: 10
  },
  appearanceTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#4cf3ffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  appearanceContainer: {
    paddingBottom: 30,
  },
  appearanceItem: {
    marginBottom: 15,
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4cf3ffff',
  },
  appearanceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4cf3ffff',
    marginBottom: 8,
  },
  appearanceInput: {
    backgroundColor: '#1E3A53',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    fontSize: 14,
  },
   appearanceInputTouchable: {
    backgroundColor: '#1E3A53',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    fontSize: 14,
    minHeight: 44,
    justifyContent: 'center',
  },
  bioInputTouchable: {
    minHeight: 100,
  },
  appearanceInputText: {
    color: '#FFF',
    fontSize: 14,
  },

  // Estilo para o input modal de biografia
  bioModalInput: {
    minHeight: 180,
    height: 180,
    textAlignVertical: 'top',
    padding: 12,
    fontSize: 16,
  },

  bioInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  redScrollContent: {
    paddingBottom: 30, 
  },
  resourcesContainer: {
    justifyContent: 'center', 
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
    width: '95%',
    alignSelf: 'center',
  },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resourceLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    width: 80,
    fontSize: 16,
    left: 5
  },

  resourceButton: {
    backgroundColor: '#092534',
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  },
  resourceInput: {
    flex: 1,
    color: '#4cf3ffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0A2D42',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#5683B9',
    minWidth: 100,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statContainer: {
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
  },
  statInput: {
    color: '#4cf3ffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 5,
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#5683B9',
  },
  statLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 14,
  },
  creditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
  },
  creditLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  creditInput: {
    flex: 1,
    color: '#4cf3ffff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#5683B9',
    textAlign: 'center',
  },
  attributesGrid: {
    marginBottom: 20,
  },
  attributeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  attributeItem: {
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
  },
  attributeInput: {
    color: '#4cf3ffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0A2D42',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    borderWidth: 1,
    borderColor: '#5683B9',
  },
  attributeLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 13.3,
    textAlign: 'center',
  },
 luckRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  luckContainer: {
    backgroundColor: '#0A2D42',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '32%', 
    borderWidth: 2,
    borderColor: '#4cf3ffff',
  },
  luckInput: {
    color: '#4cf3ffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#0A2D42',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    borderWidth: 1,
    borderColor: '#5683B9',
  },
  luckLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
    createItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A2D42',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4cf3ffff',
    alignSelf: 'center',
    alignItems: 'center'

  },
  createItemIcon: {
    marginRight: 8,
  },
  createItemText: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
    width: '90%',
    textAlign: 'center',
  },
  createModalContainer: {
    backgroundColor: '#2D3748',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 3,
    borderColor: '#4cf3ffff',
  },
  createModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4cf3ffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  createModalScroll: {
    maxHeight: 400,
  },
  createModalScrollContent: {
  paddingBottom: 20,
},
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#4cf3ffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#1E3A53',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    fontSize: 14,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    overflow: 'hidden',
  },
  picker: {
    color: '#FFF',
    height: 50,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#718096',
    borderWidth: 1,
    borderColor: '#4A5568',
  },
  createButton: {
    backgroundColor: '#4cf3ffff',
    borderWidth: 1,
    borderColor: '#2C7A7B',
  },
  cancelButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  createButtonText: {
    color: '#092534',
    fontWeight: 'bold',
  },
    editModalContainer: {
    backgroundColor: '#2D3748',
    padding: 25,
    borderRadius: 15,
    width: '80%',
    borderWidth: 3,
    borderColor: '#4cf3ffff',
  },
  editModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4cf3ffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  editModalInput: {
    backgroundColor: '#1E3A53',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5683B9',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  
  // Estilos para os elementos touchable que substituem os TextInput
  resourceInputTouchable: {
    flex: 1,
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#5683B9',
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceInputText: {
    color: '#4cf3ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statInputTouchable: {
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 5,
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#5683B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statInputText: {
    color: '#4cf3ffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  creditInputTouchable: {
    flex: 1,
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#5683B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditInputText: {
    color: '#4cf3ffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  attributeInputTouchable: {
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    borderWidth: 1,
    borderColor: '#5683B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attributeInputText: {
    color: '#4cf3ffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  luckInputTouchable: {
    backgroundColor: '#1E3A53',
    borderRadius: 8,
    padding: 10,
    minWidth: 70,
    borderWidth: 1,
    borderColor: '#5683B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  luckInputText: {
    color: '#4cf3ffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cellTouchable: {
    flex: 2,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    paddingHorizontal: 5,
  },
actionButton: {
  padding: 5,
  marginHorizontal: 2,
},
headerActions: { 
  flex: 1,
  textAlign: 'center'
},
cellActions: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
},
editNameModalContainer: {
  backgroundColor: '#2D3748',
  padding: 25,
  borderRadius: 15,
  width: '90%',
  borderWidth: 3,
  borderColor: '#4cf3ffff',
},
editNameInput: {
  backgroundColor: '#1E3A53',
  color: '#FFF',
  padding: 12,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#5683B9',
  fontSize: 16,
  marginBottom: 10,
  textAlign: 'center'
},
charCounter: {
  color: '#4cf3ffff',
  textAlign: 'center',
  marginBottom: 20,
  fontSize: 12,
},

});