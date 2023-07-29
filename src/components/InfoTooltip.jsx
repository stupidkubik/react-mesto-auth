import { useContext } from 'react';
import AppContext from '../contexts/AppContext.js';
import usePopupClose from '../hooks/usePopupClose.js';

function InfoTooltip({ isOpen, popupTitle, cssClass }) {
  const { closeAllPopups } = useContext(AppContext);

  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className={`popup popup_type_info popup_opened`}>
      <div className="popup__container">
        <div className={cssClass} />
        <h2 className="popup__info">{popupTitle}</h2>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
