import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';


// 페이지 이동 방지
//    event.preventDefault();
// register


const BoardRegister = () => {

  const [board, setBoard] = useState({});
  const { host } = useContext(Context);
  // navigate 페이지 이동 시 사용
  const navigate = useNavigate();
  
  const token = useSelector(state => state.member.token);



  // 등록 화면에서는 등록 버튼을 클릭할 때 AP 호출됨
  const handlerSubmit = async (event) => {
    event.preventDefault();

    // 파라미터 형식 : json문자열 또는 폼데이터
    const formDate = new FormData();
    // 폼데이터 형식
    formDate.append('title', board.title);
    formDate.append('content', board.content);
    formDate.append('uploadFile', board.uploadfile);


    // 사용자가 입력한 게시물 데이터를 꺼내서 등록 처리 post 처리
    // post는 매개변수가 3개이며 순서대로 주소, 게시물데이터, 헤더이다.
    const respone = await axios.post(`${host}/board/register`, formDate, {
      headers: {
        Authorization : token
      }
    });


    if(respone.status === 201){
      navigate('/board/list');
    }
  }





  // 값 입력 시 이벤트 발생
  const handlerChange = (event) => {
    //console.log(event.target.name, event.target.value, event.target.files); // 이런식으로 데이터 추출하기

    const {name, value, files} = event.target;

    // 기존 데이터 복사후 다음에 새로운 프로퍼티 추가
    let newBoard = { ...board }

  if(name === 'uploadFile'){
    newBoard[name] = files[0];
  } else {
    newBoard[name] = value;
  }


    setBoard(newBoard);
  }


  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 등록</h3>
        <Form onSubmit={handlerSubmit}>
          <Form.Group className="mb-3" controlId="board.title">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" name='title' onChange={ handlerChange } />
          </Form.Group>
          <Form.Group className="mb-3" controlId="board.content">
            <Form.Label>내용</Form.Label>
            <Form.Control as="textarea" name='content' rows={3} onChange={ handlerChange } />
          </Form.Group>

          {/* 파일 첨부 */}
          <Form.Group className="mb-3" controlId="board.uploadfile">
            <Form.Label>이미지</Form.Label>
            <Form.Control type="file" name='uploadFile' onChange={ handlerChange } />
          </Form.Group>

          <Button variant="primary" type="submit">
            등록
          </Button>
        </Form>
      </CustomContainer>
    </CustomCard>
  )
}

export default BoardRegister




// 게시물 정보
// 번호, 제목, 내용, 작성자, 등록일, 수정일
// 번호 => auto increament에 의해 자동으로 생성됨
// 작성자 => 로그인 후 시큐리티에 의해 자동으로 생성됨
// 등록일, 수정일 => jpa에 의해 현재시간으로 자동으로 저장됨