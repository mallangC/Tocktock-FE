import React, { useState, useRef, useEffect } from 'react';
import './ButtonModal.css';
import {Link} from "react-router-dom"; // 아래 CSS 코드를 저장할 파일

function ButtonModal() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태
  const buttonRef = useRef(null); // 버튼 요소의 참조를 얻기 위함
  const modalRef = useRef(null); // 모달 요소의 참조를 얻기 위함

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  // 모달 외부 클릭 시 닫기 로직 (선택 사항이지만 권장)
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, buttonRef]); // 참조 객체는 변경되지 않으므로 사실상 한 번만 실행

  return (
        <div className="modal-trigger-container" ref={buttonRef}>
          <button onClick={toggleModal} className="open-modal-button">
            설정 열기
          </button>
          {isModalOpen && (
            <div className="custom-modal" ref={modalRef}>
          <div className="modal-content">
            <Link to="/complete">완료 목록</Link>
            <Link to="/">할일 목록</Link>
            <Link to="/profile">내 정보</Link>
          </div>
        </div>
        )}
      </div>
);
}

export default ButtonModal;