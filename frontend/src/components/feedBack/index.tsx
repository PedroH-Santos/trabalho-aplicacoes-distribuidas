import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

interface AvaliacaoProps {
  titulo: string;
  descricao: string;
  onAvaliar: (nota: number) => void; 
}

const screenWidth = Dimensions.get('window').width;

const Avaliacao: React.FC<AvaliacaoProps> = ({ titulo, descricao, onAvaliar }) => {
  const [avaliacao, setAvaliacao] = useState<number>(0);

  const avaliar = (nota: number) => {
    setAvaliacao(nota);
    onAvaliar(nota);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
      </View>
      
      <View style={styles.estrelasContainer}>
        {[1, 2, 3, 4, 5].map((estrela) => (
          <AntDesign
            key={estrela}
            name="star" // Todas as estrelas são preenchidas
            size={screenWidth / 6}
            color={estrela <= avaliacao ? '#FFD700' : '#FEFEE3'} // Selecionadas são #FFD700, não selecionadas são #FEFEE3
            onPress={() => avaliar(estrela)}
            style={styles.estrela}
          />
        ))}
      </View>
    </View>
  );
};

export default Avaliacao;
