import { useContext } from 'react';
import AppContext from '../contexts/AppContext.js';
import usePopupClose from '../hooks/usePopupClose.js';

function InfoTooltip(isOpen, image, title) {
  const { closeAllPopups } = useContext(AppContext);

  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className={`popup popup_type_info popup_opened`}>
      <div className="popup__container">
        <img className="popup__image" src={image} alt="ответ от сервера" />
        <h2 className="popup__info">{title}</h2>

        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={closeAllPopups}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
