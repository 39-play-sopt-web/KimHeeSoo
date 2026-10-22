import * as styles from './Modal.css.js';

const Modal = ({ level, time, onConfirm }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <h2 className={styles.title}>Level {level} 클리어!</h2>
        <p className={styles.time}>{time}초</p>
        <button type="button" className={styles.button} onClick={onConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;