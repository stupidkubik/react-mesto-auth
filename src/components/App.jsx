import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import AppContext from '../contexts/AppContext.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

import api from '../utils/api.js';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from '../components/EditProfilePopup.jsx';
import AddPlacePopup from '../components/AddPlacePopup.jsx';
import EditAvatarPopup from '../components/EditAvatarPopup.jsx';

function App() {
  const [openPopupProfile, setOpenPopupProfile] = useState(false);
  const [openPopupAdd, setOpenPopupAdd] = useState(false);
  const [openPopupAvatar, setOpenPopupAvatar] = useState(false);
  const [openPopupDelete, setOpenPopupDelete] = useState(false);
  const [openPopupImage, setOpenPopupImage] = useState(false);

  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
  });
  const [deletedCardId, setDeletedCardId] = useState('');

  const [currentUser, setCurrentUser] = useState(null); // Загрузка данных текущего юзера
  const [cards, setCards] = useState([]); // Загрузка карточек с сервера
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getCards(), // Запрашиваем массив карточек с сервера
      api.getUserInfo(), // Запрашиваем данные юзера
    ])
      .then(([cardsData, user]) => {
        setCurrentUser(user);
        setCards(cardsData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Общая функция запроса к серверу
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  // Логика попапа обновления профиля
  function handleEditProfileClick() {
    setOpenPopupProfile(true);
  }

  function handleEditProfileSubmit(evt, inputValues) {
    evt.preventDefault();
    function makeRequest() {
      return api.updateProfile(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  // Логика попапа добавления карточки
  function handleAddPlaceClick() {
    setOpenPopupAdd(true);
  }

  function handleAddPlaceSubmit(evt, inputValues) {
    evt.preventDefault();
    function makeRequest() {
      return api.postCard(inputValues).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    }
    handleSubmit(makeRequest);
  }

  // Логика попапа обновления аватара
  function handleEditAvatarClick() {
    setOpenPopupAvatar(true);
  }

  function handleAvatarSubmit(evt, inputValues) {
    evt.preventDefault();
    function makeRequest() {
      return api.updateAvatar(inputValues).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  // Логика попапа удаления карточки
  function handleCardDelete(evt, cardData) {
    if (openPopupDelete) {
      // Если попап уже открыт
      evt.preventDefault();
      function makeRequest() {
        return api
          .deleteCard(deletedCardId)
          .then(
            setCards((cards) => cards.filter((c) => c._id !== deletedCardId))
          );
      }
      handleSubmit(makeRequest);
    } else {
      // Открываем попап
      setOpenPopupDelete(true);
      setDeletedCardId(cardData._id);
    }
  }

  function handleCardClick(evt) {
    // Открытие попапа с картинкой
    setSelectedCard({ link: evt.target.src, name: evt.target.alt });
    setOpenPopupImage(true);
  }

  function handleCardLike(card) {
    // Обработчик лайков
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    function makeRequest() {
      return api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    }
    handleSubmit(makeRequest);
  }

  function closeAllPopups() {
    // Закрытие всех попапов
    setOpenPopupProfile(false);
    setOpenPopupAdd(false);
    setOpenPopupAvatar(false);
    setOpenPopupDelete(false);
    setOpenPopupImage(false);

    setSelectedCard({ name: '', link: '' });
    setDeletedCardId('');
  }

  return (
    <div className="App">
      <AppContext.Provider value={{ isLoading, closeAllPopups }}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onOpenImage={handleCardClick}
                  onDelete={handleCardDelete}
                  handleCardLike={handleCardLike}
                />
              }
            />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </Routes>

          <EditProfilePopup
            isOpen={openPopupProfile}
            onSubmit={handleEditProfileSubmit}
          />

          <AddPlacePopup
            isOpen={openPopupAdd}
            onSubmit={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={openPopupAvatar}
            onSubmit={handleAvatarSubmit}
          />

          <PopupWithForm
            isOpen={openPopupDelete}
            onSubmit={handleCardDelete}
            name="delete"
            title="Вы уверены?"
            buttonTitle="Да"
          />

          <ImagePopup card={selectedCard} isOpen={openPopupImage} />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
