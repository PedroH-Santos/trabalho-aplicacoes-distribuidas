import { StyleSheet } from 'react-native';
import  Colors  from "../../../themes/Colors"

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4C956C', // Cor padrão do botão
    width: 147,
    height: 54,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.textColor,
    fontWeight: 'bold',
  },
});

export default styles;
