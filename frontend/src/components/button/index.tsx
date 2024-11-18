import React from 'react';
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import styles from './styles';

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title}) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
