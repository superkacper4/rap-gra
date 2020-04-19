import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AppContext from 'rap-gra/context/context';
import { ScrollView, View, Text } from 'react-native';
import { Paragraph, Title, Button, RowContainer } from 'rap-gra/components';
import ChangeName from './menageElements/ChangeName';
import DeleteLabel from './menageElements/DeleteLabel';

const StyledWrapper = styled(ScrollView)`
  width: 100%;
  padding-bottom: 50px;
`;

const StyledRaperTile = styled(View)`
  width: 100%;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.greenL};
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
  position: relative;
`;

const StyledRaperStats = styled(View)`
  margin: 0 5px;
`;

const StyledAddButton = styled(Button)`
  height: 40px;
  width: 50px;
  background-color: cadetblue;
  padding: 0;
  margin: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledButton = styled(Button)`
  height: 50px;
`;

const StyledText = styled(Text)`
  text-align: center;
  margin: 0;
  padding: 0;
  flex-basis: 100%;
  color: white;
  margin: 5px;
  font-size: 20px;
`;

const rapers = [
  {
    key: '0',
    name: 'GęGę',
    requaierments: {
      fans: 10000,
      reputation: 1000,
      flow: 75,
      style: 65,
      rhymes: 35,
      cost: 100,
    },
    profits: {
      fansIncrease: 2,
      reputationIncrease: 2,
      cashIncrease: 2,
    },
  },
  {
    key: '`',
    name: 'Young Kigi',
    requaierments: {
      fans: 10000,
      reputation: 1000,
      flow: 25,
      style: 25,
      rhymes: 35,
      cost: 100,
    },
    profits: {
      fansIncrease: 1.5,
      reputationIncrease: 1.5,
      cashIncrease: 1.5,
    },
  },
  {
    key: '2',
    name: 'Young Single',
    requaierments: {
      fans: 10000,
      reputation: 1000,
      flow: 25,
      style: 25,
      rhymes: 35,
      cost: 100,
    },
    profits: {
      fansIncrease: 1.5,
      reputationIncrease: 1.5,
      cashIncrease: 1.5,
    },
  },
  {
    key: '3',
    name: 'Palec',
    requaierments: {
      fans: 10000,
      reputation: 1000,
      flow: 25,
      style: 25,
      rhymes: 35,
      cost: 100,
    },
    profits: {
      fansIncrease: 1.5,
      reputationIncrease: 1.5,
      cashIncrease: 1.5,
    },
  },
  {
    key: '4',
    name: 'Chudson',
    requaierments: {
      fans: 10000,
      reputation: 1000,
      flow: 25,
      style: 25,
      rhymes: 35,
      cost: 100,
    },
    profits: {
      fansIncrease: 2.5,
      reputationIncrease: 1.5,
      cashIncrease: 2.5,
    },
  },
];

const ManageLabel = ({ yourLabelName, setYourRapers, yourRapers }) => {
  const context = useContext(AppContext);
  const [changeNameDisplay, setChangeNameDisplay] = useState(true);
  const [deleteYourLabelDisplay, setDeleteYourLabelDisplay] = useState(true);

  const compare = (a, b) => {
    if (a.key < b.key) {
      return -1;
    }
    if (a.key > b.key) {
      return 1;
    }
    return 0;
  };

  const addToLabelFn = value => {
    const clickedRaper = rapers.find(raper => raper.name === value);

    context.setLabelMultipler(
      context.state.stats.labelMultipler * clickedRaper.profits.fansIncrease,
    );

    context.setStats({
      cash: -clickedRaper.requaierments.cost,
      stats: {
        fans: 0,
        flow: 0,
        style: 0,
        rhymes: 0,
        reputation: 0,
        labelMultipler: 0,
      },
    });

    setYourRapers(yourRapers.concat(clickedRaper));

    const index = rapers.findIndex(raper => raper.name === clickedRaper.name);

    rapers.splice(index, 1);
  };

  const removeFromLabelFn = value => {
    const clickedRaper = yourRapers.find(raper => raper.name === value);

    context.setLabelMultipler(
      context.state.stats.labelMultipler / clickedRaper.profits.fansIncrease,
    );

    setYourRapers(yourRapers.filter(raper => raper.name !== value));

    rapers.sort(compare);
  };

  return (
    <StyledWrapper>
      <Title> {yourLabelName} </Title>
      <RowContainer>
        <StyledButton onPress={() => setChangeNameDisplay(!changeNameDisplay)}>
          <Paragraph>Zmień nazwe</Paragraph>
        </StyledButton>

        <StyledButton onPress={() => setDeleteYourLabelDisplay(!deleteYourLabelDisplay)}>
          <Paragraph>Usuń wytwórnię</Paragraph>
        </StyledButton>
      </RowContainer>

      <ChangeName
        changeNameDisplay={changeNameDisplay}
        setChangeNameDisplay={setChangeNameDisplay}
      />

      <DeleteLabel
        deleteYourLabelDisplay={deleteYourLabelDisplay}
        setDeleteYourLabelDisplay={setDeleteYourLabelDisplay}
      />

      <View>
        <StyledText>Członkowie twojej wytwórni:</StyledText>
        <StyledText>Mnożnik: x{context.state.stats.labelMultipler}</StyledText>
        {yourRapers.map(raper => (
          <StyledRaperTile key={raper.key}>
            <StyledText>{raper.name}</StyledText>
            <StyledAddButton onPress={() => removeFromLabelFn(raper.name)}>
              <Paragraph>-</Paragraph>
            </StyledAddButton>
          </StyledRaperTile>
        ))}
      </View>
      <View>
        <StyledText>Raperzy którzy mogą chcieć dołączyć:</StyledText>
        {rapers
          .filter(({ name: name1 }) => !yourRapers.some(({ name: name2 }) => name2 === name1))
          .map(raper => (
            <StyledRaperTile key={raper.key}>
              <StyledText>{raper.name}</StyledText>
              <StyledRaperStats>
                <Paragraph>Wymagania: </Paragraph>
                <Paragraph>Fani: {raper.requaierments.fans}</Paragraph>
                <Paragraph>Reputacja: {raper.requaierments.reputation}</Paragraph>
                <Paragraph>Flow: {raper.requaierments.flow}</Paragraph>
                <Paragraph>Koszt dodania: {raper.requaierments.cost}</Paragraph>
              </StyledRaperStats>
              <StyledRaperStats>
                <Paragraph>Przywileje: </Paragraph>
                <Paragraph>Przyrost fanów: {raper.profits.fansIncrease}</Paragraph>
                <Paragraph>Przyrost reputacji: {raper.profits.reputationIncrease}</Paragraph>
                <Paragraph>Przyrost kasy: {raper.profits.cashIncrease}</Paragraph>
              </StyledRaperStats>

              <StyledAddButton onPress={() => addToLabelFn(raper.name)}>
                <Paragraph>+</Paragraph>
              </StyledAddButton>
            </StyledRaperTile>
          ))}
      </View>
    </StyledWrapper>
  );
};

export default ManageLabel;
