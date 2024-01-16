import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames';

export default function Modal({ btn, children, type }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const toggleModal = () => {
    setIsOpen((prev: any) => !prev);
  };

  useEffect(() => {
    const handleClick = (e: any) => {
      if (
        !modalRef.current ||
        !modalRef.current.contains(e.target) ||
        e.target.dataset.dim === 'dim' ||
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON'
      ) {
        setIsOpen(false);
      }
    };

    const handleESC = (e: any) => {
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      setTimeout(() => {
        window.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleESC);
      });
    }

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleESC);
    };
  }, [isOpen]);

  return (
    <div className={styles.modal} ref={modalRef}>
      <button
        className={classNames(styles.modal__button, styles[type])}
        type="button"
        onClick={toggleModal}>
        {btn}
      </button>
      {isOpen && (
        <div className={classNames(styles.modal__content, styles[type])}>
          {children}
        </div>
      )}
    </div>
  );
}
