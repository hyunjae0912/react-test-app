
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '../index';
import axios from 'axios';


const BoardModify = () => {
  const token = useSelector(state => state.member.token);
  
  // 게시물 데이터
  let [board , setBoard]= useState(null);
  const { host } = useContext(Context);
  const params = useParams();
  
  
  
  const apiCall = async () => {
    const respone = await axios.get(`${host}/board/read?no=${params.no}`, {
      headers: {
        Authorization : token
      }
    })
    if(respone.status === 200){
      setBoard(respone.data);
    }
  }

  useEffect( () => {
    apiCall();
  }, [] )
  
  
  const navigate = useNavigate();
  // 값바꾸면 실행됨
  const handlerChange = (event) => {
    const { name, value, files } = event.target;
    const newBoard = {...board};

    
    // 파라미터 형식 : json문자열 또는 폼데이터

    
    if(name === 'uploadfile'){
      newBoard[name] = files[0];
    }
    else{
      newBoard[name] = value;
    }
    newBoard[name] = value;
    setBoard(newBoard);
  }


  const handlerSubmit = async (event) => {
    event.preventDefault();

        const formDate = new FormData();
    // 폼데이터 형식
    formDate.append('no', board.no);
    formDate.append('title', board.title);
    formDate.append('content', board.content);
    
    // 파일은 값이 존제하면 넣기
    if(board.uploadfile != null){
    formDate.append('uploadfile', board.uploadfile);
    }
    // api 호출해서 게시물 수정
    const respone = await axios.put(`${host}/board/modify`,formDate ,{
      headers: {
        Authorization : token
      }
    })
    setBoard(respone.data);
    if(respone.status === 204){
      navigate(`/board/read/${board.no}`)
    }

  };

  const handleRemove = async () => {
    
    const respone = await axios.delete(`${host}/board/remove?no=${board.no}`, {
      headers: {
        Authorization : token
      }
    });

    // react 내부주소
    navigate('/board/list');

  }





  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 수정</h3>
        { 
          board!==null && 
          <Form onSubmit={handlerSubmit}>
            <Form.Group className="mb-3" controlId="board.no">
              <Form.Label>번호</Form.Label>
              <Form.Control type="text" value={board.no} readOnly/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="board.title" >
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" name="title" value={board.title} onChange={handlerChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="board.content">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" name="content" rows={2} value={board.content} onChange={handlerChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="board.writer">
              <Form.Label>작성자</Form.Label>
              <Form.Control type="text" value={board.writer} readOnly/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="board.uploadfile">
              <Form.Label>이미지</Form.Label>
              <Form.Control type="file" name='uploadfile' onChange={ handlerChange } />
            </Form.Group>

            <Form.Group className="mb-3" controlId="board.regDate">
              <Form.Label>등록일</Form.Label>
              <Form.Control type="text" value={board.regDate} readOnly/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="board.modDate">
              <Form.Label>수정일</Form.Label>
              <Form.Control type="text" value={board.modDate} readOnly/>
            </Form.Group>

            <Button variant="primary" type="submit">
              저장
            </Button>


            <Button variant="danger" onClick={handleRemove}>삭제</Button>
          </Form>        
        }
      </CustomContainer>
    </CustomCard>
  )
}

export default BoardModify

// 게시물 수정 화면: 상세화면과 같이 게시물의 모든 내용이 표시
// 수정 가능한 필드와 수정 불가능한 필드를 구분
// 번호, 제목, 내용, 작성자, 등록일, 수정일
// 번호: 데이터 식별자라서 수정하면 안됨
// 작성자: 로그인하면 자동으로 id가 입력됨
// 등록일: 등록일은 처음 입력되고 다음부터는 수정 안됨
// 수정일: 수정시 현재시간으로 자동으로 입력됨
// 수정화면: 상세화면과 등록화면의 특징을 모두 가지고 있음!
// 1. 기존 게시물 조회
// 2. 일부 데이터 수정 가능
// 3. 수정 버튼 클릭 시 데이터 업데이트