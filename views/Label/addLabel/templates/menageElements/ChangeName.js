import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Text, View, AsyncStorage } from 'react-native';
import { Input, Button } from 'rap-gra/components';
import AppContext from 'rap-gra/context/context';

const StyledWrapper = styled(View)`
  transform: ${({ changeNameDisplay }) =>
    changeNameDisplay ? 'translateX(-1000px) scale(0.01)' : 'translateX(0) scale(1)'};
  justify-content: center;
  align-content: center;
  align-items: center;
  position: absolute;
  top: 10%;
  background-color: ${({ theme }) => theme.greenL};
  z-index: 3;
  width: 100%;
  height: 200px;
  border: solid black 3px;
`;

const ChangeName = ({ changeNameDisplay, setChangeNameDisplay }) => {
  const [value, onChangeText] = useState('Nazwa wytwórni');
  const context = useContext(AppContext);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('label', value);
      await AsyncStorage.setItem('yourLabel', value);
      console.log('gitówka');
    } catch (error) {
      console.log('error', typeof value);
    }
  };

  const buttonFn = name => {
    context.yourLabelFn(name);
    context.labelFn(name);
    setChangeNameDisplay(!changeNameDisplay);
    storeData();
  };

  return (
    <StyledWrapper changeNameDisplay={changeNameDisplay}>
      <Input onChangeText={text => onChangeText(text)} value={value} />
      <Button title="potwierdź" onPress={() => buttonFn(value)}>
        <Text>Potwierdź</Text>
      </Button>
    </StyledWrapper>
  );
};

export default ChangeName;
