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
    fontSize: 16,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFBE6',
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
  },
  registerButtonText: {
    color: ThemeColors.textbuttoncolor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
