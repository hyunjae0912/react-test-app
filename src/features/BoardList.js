import React, { useContext, useEffect, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '..';
import { useSelector } from 'react-redux';

// useNavigate: 다른 페이지로 이동하는 기능


const BoardList = () => {

  // navigate함수 생성
  const navigate = useNavigate();
  let [data, setDate] = useState(null);
  const { host } = useContext(Context);
  const token = useSelector(state => state.member.token);
  
  const apiCall = async () => {

    // 나중에 배포를 위해 api를 바뀜 
    const respone = await axios.get(`${host}/board/list`, {
      headers: {
        Authorization : token
      }
    });

    setDate(respone.data);
  }

  useEffect( () => {
    apiCall();
  }, [] );




  return (
    <CustomCard>
      <CustomContainer>
        <Row>
            <Col sm={8}>
              <h3>게시물 리스트</h3>
            </Col>
            <Col sm={4}>
              <Button variant="secondary" onClick={ ()=>{
                // 게시물등록 페이지로 이동
                navigate('/board/register');
              } } >게시물 등록</Button>
            </Col>
        </Row>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
            </tr> 
          </thead>
          <tbody>
            {
              // and문은 둘 중 하나만 있어도 not이 반환되어서 그냥 아무것도 안나옴
              data !== null && data.map( (board)=>{
                // jsx를 동적으로 생성할때는 key값을 삽입해야함
                return (
                      <tr key={board.no}>
                        {/* 상세화면 URL 예시: /board/read/1 */}
                        <td><Link to={ '/board/read/'+board.no  }>{board.no}</Link></td>
                        <td>{board.title}</td>
                        <td>{board.writer}</td>
                        <td>{board.regDate}</td>
                      </tr>
                );
              })
            }
          </tbody>
        </Table>

      </CustomContainer>
    </CustomCard>
  )
}

export default BoardList