import { StyleSheet } from 'react-native';
import ThemeColors from '../../../themes/Colors';

const styles = StyleSheet.create({


  titleInformation: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  backButton: {
    padding: 8,
    position: 'absolute',
    zIndex: 1,
  },
  infoBox: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderColor: '#C3C3C3',
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    gap: 5,
  },
  infoBoxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBoxDescription: {
    fontSize: 14,
    color: "#898A8D"
  },
  infoContainer: {
    flex: 0.5,
    backgroundColor: ThemeColors.loginbuttonbackground,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    alignItems: 'center',
  },

  searchIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: ThemeColors.buttonBackground,
  },

  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: ThemeColors.background,
    padding: 10,
    zIndex: 1,
  },
  inputSearch: {
    flex: 1,
    backgroundColor: ThemeColors.buttonBackground,
    color: ThemeColors.TextColorButtons,
    padding: 16,
    marginVertical: 8,
    fontSize: 16,
  },
  infoHeader: {

  },
  inputShowSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: ThemeColors.buttonBackground,
    color: ThemeColors.TextColorButtons,
    padding: 16,
    marginVertical: 8,
    fontSize: 16,
  },
  selectInput: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: ThemeColors.buttonBackground,
  },
  searchButton: {
    backgroundColor: ThemeColors.loginbuttonbackground,
    borderRadius: 15,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,

  },
  searchButtonText: {
    color: ThemeColors.textbuttoncolor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: ThemeColors.loginbuttonbackground,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  startButtonText: {
    color: ThemeColors.textbuttoncolor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: ThemeColors.buttonBackground,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  finishButtonText: {
    color: ThemeColors.loginbuttonbackground,
    fontSize: 16,
    fontWeight: 'bold',
  },
  carText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  infoContainerGreen: {
    flex: 1,
    backgroundColor: ThemeColors.loginbuttonbackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  infoContainerWhite: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
  },
  carDetails: {
    color: ThemeColors.buttonBackground,
    fontSize: 14,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 10,
  },
  infoBoxDetail: {
    alignItems: 'center',
    width: '40%',
    backgroundColor: '#FFF',
    borderColor: '#C3C3C3',
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    gap: 5,
  },











/* SELECT */

  containerSelect: {
    flex: 1,
    marginVertical: 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  picker: {
    color: ThemeColors.TextColorButtons,
    fontSize: 16,
    backgroundColor: ThemeColors.buttonBackground,
    padding: 16,

  },



});

export default styles;
