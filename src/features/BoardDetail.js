import React, { useContext, useEffect, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../index';
import { useSelector } from 'react-redux';

// 게시물 상세 화면: 게시물의 모든 정보를 출력

const BoardDetail = () => {

  // navigate 함수 생성
  const navigate = useNavigate();
  // 일반 변수에 데이터를 넣으면 변경이 안돼니 useState를 사용해야함
  let [board, setBoard] = useState(null);
  const { host } = useContext(Context);
  const params = useParams();
  const token = useSelector(state => state.member.token);

  // 파일 기본 경로

  
  // 비동기함수로 응답을 기다렸다가 받아야함
  const IMGSS = '/images/';

  const apiCall = async () => {
    const respone = await axios.get(`${host}/board/read?no=${params.no}`, {
      headers: {
        Authorization : token
      }
    })


    // 응답을 받은 후에 처리
    if(respone.status === 200){
      // 데이터 담기
      setBoard(respone.data);
    }
    else{
      console.log("api error : ", respone.status, respone.statusText)
    }

  }

  useEffect( () => {
    apiCall();
  }, [] )


  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 상세</h3>

        {/* 게시물 데이터가 있다면 폼 표시 */}
        {/* 첫번째조건이 false라면 두번째항은 실행안됨 */}

        {
          board !== null &&
          <Form>
            <Form.Group className="mb-3" controlId="board.no">
              <Form.Label>번호</Form.Label>
              <Form.Control type="text" value={board.no} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.title">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" value={board.title} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.content">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} value={board.content} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.writer">
              <Form.Label>작성자</Form.Label>
              <Form.Control type="text" value={board.writer} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.regDate">
              <Form.Label>등록일</Form.Label>
              <Form.Control type="text" value={board.regDate} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.modDate">
              <Form.Label>수정일</Form.Label>
              <Form.Control type="text" value={board.modDate} readOnly />
            </Form.Group>

            {/* 예) C://upload/file/a.png 
            보안상의 이유로 안됨

            1. 프로젝트 내부에 저장하여 웹투르로 접근
            2. aws같은 사이트를 이용하여 공개주소로 접근 */}

            
            <Form.Group className='mb-3'>
              <img src={`${IMGSS}${board.imgpath}`}>
              </img>
            </Form.Group>

            <Button variant="primary" onClick={() => {
              // 게시물 수정화면으로 이동
              // 주소 예시: /board/modify/1
              navigate(`/board/modify/${board.no}`);
            }} >수정</Button>

          </Form>

        }

      </CustomContainer>
    </CustomCard>
  )
}

export default BoardDetail