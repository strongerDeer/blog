import { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.scss';

export default function Modal({ btn, children }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const toggleModal = () => {
    setIsOpen((prev: any) => !prev);
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.cssText = `
  //     overflow: hidden;
  //     position: relative;
  //     height: 100%;`;
  //   }
  //   return () => {
  //     document.body.removeAttribute('style');
  //   };
  // }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        !modalRef.current ||
        !modalRef.current.contains(e.target) ||
        e.target.dataset.dim === 'dim'
      ) {
        setIsOpen(false);
      }
    };
    const handleESC = (e: any) => {
      console.log('ddd');
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('keydown', handleESC);
      });
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleESC);
    };
  }, [isOpen]);

  return (
    <div className={styles.modal} ref={modalRef}>
      <button
        className={styles.modal__button}
        type="button"
        onClick={toggleModal}>
        {btn}
      </button>
      {isOpen && <div className={styles.modal__content}>{children}</div>}
    </div>
  );
}
