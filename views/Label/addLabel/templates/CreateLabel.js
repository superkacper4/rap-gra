import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Text, View, AsyncStorage, Alert } from 'react-native';
import AppContext from 'rap-gra/context/context';
import { Input, Button, Paragraph } from 'rap-gra/components';

const StyledWrapper = styled(View)`
  height: 100%;
  width: 100%;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const CreateLabel = ({ onPress, labelFn, yourLabelFn, setStats, saveStats }) => {
  const [value, onChangeText] = useState('Nazwa wytwórni');
  const context = useContext(AppContext);
  const cost = 2000;

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('label', value);
      await AsyncStorage.setItem('yourLabel', value);
      await AsyncStorage.setItem('cash', JSON.stringify(context.state.cash));
      console.log('gitówka');
    } catch (error) {
      console.log('error', typeof value);
    }
  };

  const buttonFn = () => {
    console.log(context.state.currentLabel);
    if (context.state.cash >= cost && !context.state.currentLabel) {
      storeData();
      labelFn(value);
      yourLabelFn(value);
      setStats({
        cash: -cost,
        stats: {
          fans: 0,
          flow: 0,
          style: 0,
          rhymes: 0,
          reputation: 0,
          labelMultipler: 0,
        },
      });
      onPress();
      saveStats();
      Alert.alert(`Gratulacje założyłeś swoją wytwórnię o nazwie ${value}!`);
    } else {
      Alert.alert(`Nie masz dość kasy żeby założyć wytwórnię lub jesteś już w jakiejś`);
    }
  };
  return (
    <StyledWrapper>
      <Input onChangeText={text => onChangeText(text)} value={value} />
      <Paragraph>Koszt założenia własnej wytwórni to:</Paragraph>
      <Paragraph>{cost}$</Paragraph>
      <Button title="potwierdź" onPress={buttonFn}>
        <Text>Potwierdź</Text>
      </Button>
    </StyledWrapper>
  );
};

export default CreateLabel;
