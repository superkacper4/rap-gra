import React, { useContext } from 'react';
import styled from 'styled-components';
import { Text, View, AsyncStorage } from 'react-native';
import { Button } from 'rap-gra/components';
import AppContext from 'rap-gra/context/context';

const StyledWrapper = styled(View)`
  transform: ${({ deleteYourLabelDisplay }) =>
    deleteYourLabelDisplay ? 'translateX(-1000px) scale(0.01)' : 'translateX(0) scale(1)'};
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

const DeleteLabel = ({ deleteYourLabelDisplay, setDeleteYourLabelDisplay }) => {
  const context = useContext(AppContext);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('label', '');
      await AsyncStorage.setItem('yourLabel', '');
      await AsyncStorage.setItem('yourRapers_array', JSON.stringify([]));

      console.log('gitówka');
    } catch (error) {
      console.log('error', typeof value);
    }
  };

  const buttonFn = () => {
    context.yourLabelFn('');
    context.labelFn('');
    context.resetYourRapers();
    context.setLabelMultipler(1);
    setDeleteYourLabelDisplay(!deleteYourLabelDisplay);
    storeData();
  };

  return (
    <StyledWrapper deleteYourLabelDisplay={deleteYourLabelDisplay}>
      <Text>
        Czy na pewno chcesz usunąć swoją wytwórnię? Jeśli będziesz chciał założyć nową będziesz
        musiał zdobywać raperów od początku.
      </Text>
      <Button title="potwierdź" onPress={() => buttonFn()}>
        <Text>Potwierdź</Text>
      </Button>
    </StyledWrapper>
  );
};

export default DeleteLabel;
