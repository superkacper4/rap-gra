import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import AddSong from 'rap-gra/views/Songs/addPanels/AddSong';
import AddSubject from 'rap-gra/views/Songs/addPanels/AddSubject';
import AddRecord from 'rap-gra/views/Songs/addPanels/AddRecord';
import AddSongRec from 'rap-gra/views/Songs/addPanels/AddSongRec';
import { Button, RowContainer, Title, Paragraph } from 'rap-gra/components';
import { Link } from 'react-router-native';
import ListItem from 'rap-gra/views/Songs/ListItem';
import AppContext from 'rap-gra/context/context';

const StyledContainer = styled(ScrollView)`
  flex-grow: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.greenL};
`;

const StyledRowContainer = styled(RowContainer)`
  width: 100%;
  height: 70px;
  padding: 15px;
`;

const StyledButton = styled(Button)`
  height: 100%;
`;

const StyledTitle = styled(Title)`
  width: 100%;
  text-align: center;
  margin-bottom: 0;
`;

const StyledSubtitle = styled(Title)`
  font-size: 17px;
  width: 100%;
  text-align: center;
`;

const StyledLink = styled(Link)`
  border: 2px solid ${({ theme }) => theme.greenD};
  padding: 5px;
`;

const Songs = () => {
  /* songs state */

  const [openSong, setOpenSong] = useState(false); // Otwarcie lub zamknięcie okna piosenek
  const [openSubject, setOpenSubject] = useState(false); // Otwarcie lub zamknięcie wyboru tematów
  const [id, setId] = useState([]); // Zapisywanie id piosenek
  const [subj, setSubj] = useState('');

  /* record state */

  const [openRec, setOpenRec] = useState(false); // Otwarcie lub zamknięcie tworzenia płyty(bez piosenek)
  const [rec, setRec] = useState({ full: false }); // Zapisanie parametrów płyty(bez piosenek)
  const [openRecSub, setOpenRecSub] = useState(false); // Otwracie lub zamknięcie wyboru piosenek do płyty

  return (
    <AppContext.Consumer>
      {context => (
        <StyledContainer id={id}>
          <StyledTitle>Piosenki</StyledTitle>
          <StyledContainer>
            <>
              <StyledRowContainer>
                <StyledButton onPress={() => setOpenSubject(!openSubject)}>
                  <Paragraph>Dodaj piosenkę</Paragraph>
                </StyledButton>
                <StyledButton onPress={() => setOpenRec(!openRec)}>
                  <Paragraph>Stwórz płytę</Paragraph>
                </StyledButton>
              </StyledRowContainer>
              <StyledSubtitle>Ostatnie piosenki</StyledSubtitle>
              {/* Wyświetlanie 3 ostatnich piosenek, od najnowszej do najstarszej, [...] ->  skopiowanie tablicy, aby reverse działało po odświerzeniu, slice do wyświetlenia 3 ostatnich */}
              {context.state.isLoading ? (
                <RowContainer>
                  <Paragraph>Ładowanie...</Paragraph>
                </RowContainer>
              ) : (
                [...context.state.songs]
                  .reverse()
                  .slice(0, 3)
                  .map(songData => (
                    <ListItem
                      key={songData.id}
                      title={songData.title}
                      place={songData.place}
                      type={songData.type}
                      earnings={songData.cash}
                      fans={songData.fans}
                      rate={songData.rating}
                      value={songData.views}
                    />
                  ))
              )}
            </>
            <StyledRowContainer>
              <StyledLink underlayColor="transparent" to="/allsongs">
                <Paragraph>Wszystkie piosenki</Paragraph>
              </StyledLink>
              <StyledLink underlayColor="transparent" to="/allrecords">
                <Paragraph>Wszystkie płyty</Paragraph>
              </StyledLink>
            </StyledRowContainer>
          </StyledContainer>

          <AddSong
            open={openSong} // Otwarta czy zamknięta piosenka
            songsL={context.state.songsL} // Pobrana z AS ilość piosenek
            songs={context.state.songs} // Pobrane piosenki z AS
            onPress={() => setOpenSong(!openSong)} // Obsługa otwarcia/zamknięcia okna
            openSubject={() => setOpenSubject(!openSubject)} // Otworzenie kolejnego okna z wyborem tematu
            state={context.state} // pobieranie stanu, ale potrzebne było do statystyk
            setLength={context.setLength} // Ustalenie ilości piosenek
            setSong={context.setSong} // Zapisanie piosenki do tablicy w App
            subj={subj}
            setSubj={setSubj}
            stats={context.state.stats} // statystki ze stanu
            setStats={context.setStats} // zapisanie statystyk przy dodawaniu piosenki
          />
          <AddSubject
            open={openSubject} // Otwarty czy zamknięty wybór tematu piosenki
            onPress={() => setOpenSubject(!openSubject)} // Zamknięcie okna wybrania tematu
            openAddSong={() => setOpenSong(!openSong)} // Przy ewentualnym powrocie otworzenie okna wyboru statystyk piosenki
            songsL={context.state.songsL} // Ilość piosenek
            subjects={context.state.subjects} // Pobranie tematów z App context
            subj={subj}
            setSubj={setSubj}
          />
          <AddRecord
            open={openRec} // Otwarta czy zamknięta płyta
            setRec={setRec} // Zapisanie danych płyty
            onPress={() => setOpenRec(!openRec)} // Obsługa otwarcia/zamknięcia okna
            openSubject={() => setOpenRecSub(!openRecSub)} // Otworzenie kolejnego okna z wyborem piosenek
            songsL={context.state.songsL} // Ilość piosenek
            recordsL={context.state.recordsL} // Ilośc płyt
          />
          <AddSongRec
            onPress={() => setOpenRecSub(!openRecSub)} // Obsługa otwarcia/zamknięcia okna
            open={openRecSub} // Otwarty czy zamknięty wybór piosenek do płyty
            rec={rec} // Wartości płyty z poprzedniego okna
            openAddRec={() => setOpenRec(!openRec)} // Ewentualny powrót do wyboru statystyk płyty
            songs={context.state.songs} // Pobranie piosenek
            setId={setId} // Ustalenie aktywnych ID
            setRecord={context.setRecord} // Dodanie płyty do tablicy płyt
            recordsL={context.state.recordsL} // Ilość płyt
            setLengthRec={context.setLengthRec} // Ustalenie ilości płyt
            deleteAndAddSong={context.deleteAndAddSong} // dodaj i usuń
            retrieveData={context.retrieveData}
          />
        </StyledContainer>
      )}
    </AppContext.Consumer>
  );
};
export default Songs;
