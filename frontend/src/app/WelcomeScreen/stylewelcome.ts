import { StyleSheet, Dimensions } from 'react-native';
import ThemeColors from '../../../themes/Colors';

const { width } = Dimensions.get('window'); 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.background, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logo: {
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    width: width * 0.8, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ThemeColors.textColor, 
    textAlign: 'left', 
    marginBottom: 10, 
  },
  subtitle: {
    fontSize: 16,
    color: ThemeColors.textColor, 
    textAlign: 'left', 
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: ThemeColors.buttonBackground,
    width: width * 0.8, 
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center', 
  },
  buttonText: {
    fontSize: 18,
    color: ThemeColors.TextColorButtons,
    fontWeight: 'bold',
  },
});
