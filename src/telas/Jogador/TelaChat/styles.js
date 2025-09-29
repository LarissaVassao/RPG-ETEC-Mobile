import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#effffdff",
  },
  itensCOntainer:{
    top: '15%',
    alignItems: 'center',

  },
  
  logotitulo:{
  fontSize: 20,
  bottom: 420,
  fontWeight: '600',
  left: 100,
  color: '#fff'
  },
  digitarNome:{
  width: '80%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',

    width: '100%',
    alignItems: 'center',
    
  },
  branco: {
    backgroundColor: '#effffdff',
    width: '100%',
    position: 'absolute',
    height: '75%',
    bottom: 0

  },
  icon: {
  width: 150,
  height:150,
  borderRadius: 100,
  bottom: '25%',
  borderWidth: 15,
  borderColor: '#fff'
  },
  titulo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitulo: {
    fontSize: 20,
    marginBottom: 20,
    color: "#555",
    fontWeight: 'bold'
  },
  botaoEntrar: {
    backgroundColor: "#31cacfff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
    width: 150,
    alignItems: 'center'
},
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#e6ebf2",
    padding: 10,
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#333",
  },
  msg: {
    maxWidth: "75%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
  },
  msgMinha: {
    backgroundColor: "#31cacfff",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  msgOutro: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  paciente: {
    fontWeight: "bold",
    marginBottom: 3,
    color: "#444",
  },
  texto: {
    color: "#000",
    fontSize: 15,
  },
  linhaHora: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 3,
  },
  hora: {
    fontSize: 11,
    color: "#666",
    marginRight: 5,
  },
  status: {
    fontSize: 12,
    color: "#666", 
  },
  statusLido: {
    color: "#1e90ff", 
  }, 
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dffeffff",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 10,
    elevation: 3,
    bottom: 35

  },
  inputMensagem: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  botaoEnviar: {
    backgroundColor: "#31cacfff",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  input:{
    width: '100%',
    borderColor: '#31cacfff',
    borderRadius: 100,
    borderWidth: 2,
    fontSize: 15,
    backgroundColor: 'rgba(203, 255, 251, 1)acfff',
    padding: 20
  },
  flatlistContent:{
    marginBottom: 27  
  }
});