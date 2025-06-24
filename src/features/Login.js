import React, { useContext, useState } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from "../store/memberSlice"
import { useDispatch } from 'react-redux';

// 사용자가 작성한 로그인 데이터를 이용


const Login = () => {
  
  
  // 로그인 데이터를 저장할 변수
  const [user, setUser] = useState();
  const {host} = useContext(Context);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 사용자가 입력필드에 값을 입력하면 이벤트 발생
  const handleChange = (event) => {
    const {name, value} = event.target;

    const newUser = {...user};
    
    newUser[name] = value;
    setUser(newUser)
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 인증 필요없이 아무나 사용할 수 있는 api를 사용
    // api의 바디데이터(json데이터)
    const respone = await axios.post(`${host}/login`,user);


    // 로그인 처리 후
    // 발급 토큰을 react app에 저장한 다음에 다른 페이지에서 사용
    if(respone.status === 200){

      // 작업에 필요한 데이터를 함께 전달
      dispatch(login(respone.data))

      navigate(`/`)
    }
  }
  
  
  
  
  
  
  
  return (
    <CustomCard>
      <CustomContainer>
        <h3>로그인</h3>
        <Form onSubmit={handleSubmit}>
          {/* 각 입력 필드에 name 추가 */}
          <Form.Group className="mb-3" controlId="member.id">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" name='id' onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="member.password">
            <Form.Label>패스워드</Form.Label>
            <Form.Control type="password" name='password' onChange={handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            로그인
          </Button>
        </Form>
      </CustomContainer>
    </CustomCard>
  )
}

export default Login