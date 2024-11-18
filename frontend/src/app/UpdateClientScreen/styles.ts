import { StyleSheet } from 'react-native';
import ThemeColors from '../../../themes/Colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: ThemeColors.background,
    padding: 16,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FEFEE3',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    color: '#FEFEE3',
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFBE6',
    padding: 16,
    borderRadius: 25,
    marginVertical: 8,
    fontSize: 16,
  },
  inputDisabled: {
    width: '100%',
    backgroundColor: '#FFFBE699',
    padding: 16,
    borderRadius: 25,
    marginVertical: 8,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: ThemeColors.loginbuttonbackground,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 16,
    width: "100%",
  },
  registerButtonText: {
    color: ThemeColors.textbuttoncolor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectInput: {
    width: '100%',
    fontSize: 16,
    color: '#000',
  },
  pickerWrapper: {
    width: '100%',
    backgroundColor: '#FFFBE6',
    borderRadius: 25,
    overflow: 'hidden',
  },
  containerInputs: {
    flexDirection: 'column',
    width: "100%",
    gap: 20,
  }
});

export default styles;
