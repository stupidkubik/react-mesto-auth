import { useContext } from 'react';
import AppContext from '../contexts/AppContext.js';
import LoginUserContext from '../contexts/LoginUserContext.js';
import usePopupClose from '../hooks/usePopupClose.js';
import { useNavigate } from 'react-router';

function InfoTooltip({ isOpen, popupTitle, cssClass }) {
  const { closeAllPopups } = useContext(AppContext);
  const { Paths } = useContext(LoginUserContext);

  const navigate = useNavigate();
  navigate(Paths.Login); // ??

  usePopupClose(isOpen, closeAllPopups);

  return (
    <div className={`popup popup_type_info popup_opened`}>
      <div className="popup__container">
        <div className={cssClass} />
        <h2 className="popup__info">{popupTitle}</h2> {/* <==== */}
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={usePopupClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
