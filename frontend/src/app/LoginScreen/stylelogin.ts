import { StyleSheet } from 'react-native';
import ThemeColors from '../../../themes/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.background, 
    paddingHorizontal: 20,
    paddingTop: 62,
  },
  backButton: {
    position: 'absolute',
    top: 40, 
    left: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: ThemeColors.textColor, 
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFBE6', 
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    color: ThemeColors.TextColorButtons, 
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: ThemeColors.loginbuttonbackground, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    color: ThemeColors.textbuttoncolor, 
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: ThemeColors.textColor, 
    marginTop: 10,
    fontSize: 14,
  },
  createAccountText: {
    color: ThemeColors.textColor, 
    marginTop: 30,
    fontSize: 16,
  },
});
