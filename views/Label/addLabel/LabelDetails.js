import React from 'react';
import styled from 'styled-components';
import AddPanelTemplate from 'rap-gra/templates/AddPanelTemplate';
import { Text, Alert, AsyncStorage } from 'react-native';
import { Paragraph, Title, Button } from 'rap-gra/components';

const StyledParagraph = styled(Paragraph)`
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 25px;
`;

const StyledParagraphHistory = styled(Paragraph)`
  font-size: 15px;
  text-align: justify;
  margin: 0 10px;
`;

const StyledText = styled(Text)`
  font-size: 20px;
  color: ${({ theme }) => theme.fontColor};
`;

const StyledTitle = styled(Title)`
  font-size: 30px;
`;

const LabelDetails = ({
  openLabelDetails,
  onPress,
  clickedLabelName,
  clickedLabelHistory,
  clickedLabelRequaierments,
  clickedLabelProfits,
  labelFn,
  stats,
  currentLabel,
  setLabelMultipler,
  yourLabel,
}) => {
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('label', clickedLabelName);
      await AsyncStorage.setItem('labelMultipler', JSON.stringify(value));
    } catch (error) {
      // console.log('error');
    }
  };

  const buttonFn = increase => {
    // funkcja sprawdza czy nie jesteś juz w danej wytwórnii, jeśli nie to sprawdza czy spełniasz kryteria i dodaje cię do niej
    if (currentLabel !== clickedLabelName && yourLabel === false) {
      if (
        stats.fans >= clickedLabelRequaierments.fans &&
        stats.reputation >= clickedLabelRequaierments.reputation &&
        stats.flow >= clickedLabelRequaierments.flow &&
        stats.rhymes >= clickedLabelRequaierments.rhymes &&
        stats.style >= clickedLabelRequaierments.style
      ) {
        labelFn(clickedLabelName);
        storeData(increase);
        onPress();
        setLabelMultipler(increase);
        Alert.alert(`Gratulacje dołączyłeś do ${clickedLabelName}!`);
      } else {
        Alert.alert('Nie spełniasz wymagań.');
        onPress();
      }
    } else {
      Alert.alert('Już jesteś w tej wytwórni lub masz swoją.');
      onPress();
    }
  };

  return (
    <AddPanelTemplate open={openLabelDetails} onPress={onPress} top>
      <StyledTitle>{clickedLabelName}</StyledTitle>
      <StyledParagraphHistory>{clickedLabelHistory}</StyledParagraphHistory>
      <StyledParagraph>Wymagania: </StyledParagraph>
      <StyledText>Fani: {clickedLabelRequaierments.fans}</StyledText>
      <StyledText>Reputacja: {clickedLabelRequaierments.reputation}</StyledText>
      <StyledText>
        Flow: {clickedLabelRequaierments.flow} Styl: {clickedLabelRequaierments.style} Rymy:{' '}
        {clickedLabelRequaierments.rhymes}
      </StyledText>

      <StyledParagraph>Przywileje: </StyledParagraph>
      <StyledText>Przyrost Fanów: {clickedLabelProfits.fansIncrease}x</StyledText>
      <StyledText>Przyrost Reputacji: {clickedLabelProfits.reputationIncrease}x</StyledText>
      <StyledText>Przyrost Kasy: {clickedLabelProfits.cashIncrease}x</StyledText>

      <Button onPress={() => buttonFn(clickedLabelProfits.cashIncrease)}>
        <StyledText>Dołącz</StyledText>
      </Button>
    </AddPanelTemplate>
  );
};

export default LabelDetails;
