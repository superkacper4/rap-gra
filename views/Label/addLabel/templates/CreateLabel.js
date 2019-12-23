import React from 'react';
import styled from 'styled-components';
import { Text, View, AsyncStorage } from 'react-native';
import { Input } from 'rap-gra/components/Input';
import { Paragraph } from 'rap-gra/components/Paragraph';
import { Button } from 'rap-gra/components/Button';

const StyledWrapper = styled(View)`
  height: 100%;
  width: 100%;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const CreateLabel = ({ setYourLabelName, onPress, labelFn }) => {
  const [value, onChangeText] = React.useState('Nazwa wytwórni');

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('label', value);
      console.log('gitówka');
    } catch (error) {
      console.log('error', typeof value);
    }
  };

  const buttonFn = () => {
    setYourLabelName(value);
    storeData();
    labelFn(value);
    onPress();
  };
  return (
    <StyledWrapper>
      <Input onChangeText={text => onChangeText(text)} value={value} />
      <Paragraph>Koszt założenia własnej wytwórni to:</Paragraph>
      <Paragraph>10000$</Paragraph>
      <Button title="potwierdź" onPress={buttonFn}>
        <Text>Potwierdź</Text>
      </Button>
    </StyledWrapper>
  );
};

export default CreateLabel;
