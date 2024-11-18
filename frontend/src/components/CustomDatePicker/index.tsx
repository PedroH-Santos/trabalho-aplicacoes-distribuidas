import React, { useState } from "react";
import {
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import DatePicker from "react-native-modal-datetime-picker";

interface CustomDatePickerProps {
  data: Date | null,
  placeholder: string,
  onConfirm: (data: Date) => void;
}

export const CustomDatePicker = ({ data, onConfirm, placeholder }: CustomDatePickerProps) => {
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity style={styles.input}
        onPress={() => {
          setOpenDatePicker(true);
          Keyboard.dismiss();
        }}
      >
        <TextInput
          value={data ? data.toLocaleDateString() : placeholder}
          placeholderTextColor="#000"
          editable={false} // Mantém o campo não editável
          style={styles.inputDate}
        />
      </TouchableOpacity>

      <DatePicker
        isVisible={openDatePicker}
        date={data || new Date()}
        mode="date"
        onCancel={() => setOpenDatePicker(false)}
        onConfirm={(date) => {
          onConfirm(date);
          setOpenDatePicker(false);
        }}
      />
    </>
  );
};
