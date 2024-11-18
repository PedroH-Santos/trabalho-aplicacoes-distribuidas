import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width; // Obtem a largura da tela

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
    padding: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: "#4C956C",
  },
  textContainer: {
    alignSelf: 'flex-start', // Alinha o título e a descrição à esquerda
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    color: "#FEFEE3",
  },
  descricao: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'left',
  },
  estrelasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Espaça as estrelas uniformemente
    width: screenWidth * 0.9, // Ocupa 90% da largura da tela
  },
  estrela: {
    marginHorizontal: 0, // Espaçamento horizontal entre as estrelas
  },
});

export default styles;
