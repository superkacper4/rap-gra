import React from 'react';
import styled from 'styled-components';
import AddPanelTemplate from 'rap-gra/templates/AddPanelTemplate';
import { Text } from 'react-native';
import { Title } from 'rap-gra/components/Title';
import { Paragraph } from 'rap-gra/components/Paragraph';
import { Button } from 'rap-gra/components/Button';

const StyledParagraph = styled(Paragraph)`
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 25px;
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
  clickedLabelRequaierments,
  clickedLabelProfits,
  setCurrentLabel,
}) => {
  const buttonFn = () => {
    setCurrentLabel(clickedLabelName);
    onPress();
  };

  return (
    <AddPanelTemplate open={openLabelDetails} onPress={onPress} top>
      <StyledTitle>{clickedLabelName}</StyledTitle>
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

      <Button onPress={buttonFn}>
        <StyledText>Dołącz</StyledText>
      </Button>
    </AddPanelTemplate>
  );
};

export default LabelDetails;
