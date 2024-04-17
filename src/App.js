import './App.scss';
import { Container, Nav, Navbar, NavDropdown, Row, Col } from 'react-bootstrap';
import bgimg from './img/mainbg.jpg';
import { lazy, memo, Suspense, useEffect, useTransition, useState } from 'react'
import data from './data.js';

import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
//서버요청 라이브러리
import axios from 'axios';

import { useQuery } from "react-query";

//메인페이지 로딩할때 디테일이랑 카트는 보일필요없으니까 lazy시킴
const Detail = lazy(() => import('./routes/Detail.js'))
const Cart = lazy(() => import('./routes/Cart.js'))

let Child = memo(function () {
    console.log('재랜더링됨');
    return <div>자익임</div>
})

function App() {

    let [shoes,setShoes] = useState(data);
    let [count, setCount] = useState(0);
    let a = new Array(1).fill(0)
    let [name, setName] = useState('')
    let [isPending, startTransition] = useTransition();
    //페이지 이동을 도와주는 훅
    //useNavigate(1) : 앞으로 이동
    //useNavigate(-1) : 뒤로 이동
    let navigate = useNavigate();

    let result = useQuery('작명', () =>
        axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
            console.log('요청됨');
            return a.data
        }),
        {staleTime : 2000 }//2초안에는 리패치가 되지않음
    )
    // result.data
    // result.isLoading
    // result.error

    return (
        <div className="App">
            <input onChange={(e) => {
                startTransition(() => {
                    setName(e.target.value)
                })
            }} />
            {/* {
                isPending ? "로딩중기다리셈" :
                a.map(() => {
                    return <div>{name}</div>
                })
            } */}
            <Child count={count}></Child>
            <button onClick={() => setCount(count + 1)}></button>

            {/* <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Shop</Navbar.Brand>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="About" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/about">About</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/about/member">Member</NavDropdown.Item>
                                <NavDropdown.Item href="/about/location">Location</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="/">Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav className="me-auto">
                            <NavDropdown title="About" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/about">About</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/about/member">Member</NavDropdown.Item>
                                <NavDropdown.Item href="/about/location">Location</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav.Link href="/cart">Cart</Nav.Link>
                        <Nav.Link href="/">{ result.isLoading ? '로딩중' : result.data.name}</Nav.Link>
                        <Nav.Link href="/">{result.error && '에러남'}</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* <Link to="/">홈</Link> */}
            {/* <Link to="/detail">상세페이지</Link> */}
            <Suspense fallback={<div>로딩중임</div>}>
                <Routes>
                    <Route path='/' element={
                        <div>
                            <div className="main_bg" style={{ backgroundImage: `url(${bgimg})` }}>
                            </div>
                            <button onClick={() => {
                                let copy = [...shoes];
                                copy.sort((a, b) => a.id - b.id);
                                setShoes(copy);
                            }}>초기화</button>
                            <button onClick={() => {
                                let copy = [...shoes];
                                copy.sort((a, b) => a.title.localeCompare(b.title));
                                setShoes(copy);
                            }}>ABC순정렬</button>
                            <button onClick={() => {
                                let copy2 = [...shoes];
                                copy2.sort((a, b) => b.price - a.price);
                                setShoes(copy2);
                            }}>금액높은순정렬</button>
                            <Container fluid>
                                <Row>
                                    <Card shoes={shoes} />
                                    {/* <Col>
                                        www.aa.com/aaa 요 aaa가 있을때 process.env.PUBLIC_URL 이거쓰면 에러안남
                                        <img src={process.env.PUBLIC_URL + '/logo192.png'} width="100%" />
                                        <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                                        <h4>{shoes[0].title}</h4>
                                        <p>{shoes[0].price}</p>
                                    </Col> */}
                                </Row>
                            </Container>
                            <button onClick={() => {
                                axios.get('https://codingapple1.github.io/shop/data2.json').then((result) => {
                                    console.log(result.data);
                                    let copy2 = [...shoes, ...result.data];
                                    setShoes(copy2);

                                }).catch(() => {
                                    console.log('실패함ㅅㄱ');
                                });

                                //axios.post('/', { name: 'kim' });
                                //두개 동시에 보내고싶을때
                                //axios 은 제이슨형태를 자동으로 파싱해줌
                                //Promise.all( [axios.get('URL1'), axios.get('URL2')] ).then(()=>{})

                                //"{"name" : "kim"}" -> json

                                //fetch는 파싱해야함
                                //fetch('URL').then(결과 => 결과.json()).then((결과) => { console.log(결과) } )
                            }}>더보기</button>
                        </div>
                    } />
                    {/* :id -> url파라미터라고함 */}
                    <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
                    <Route path='/cart' element={<Cart shoes={shoes} />} />
                    {/*  * 는 없는페이지들 */}
                    <Route path='*' element={<div>없는페이지야</div>} />
                    {/* nested routes임 */}
                    {/* 여러 유사한 페이지가 필요할 때 */}
                    <Route path='/about' element={<About />}>
                        <Route path='member' element={<div>멤버임</div>} />
                        <Route path='location' element={<div>위치정보임</div>} />
                    </Route>
                    {/* <Route path='/about/member' element={<About />} />
                    <Route path='/about/location' element={<About />} /> */}
                </Routes>
            </Suspense>
        </div>
    );
}

function Card(props) {
    return (
        props.shoes.map(function (a, i) {
            return (
                <Col>
                    <Link to={`/detail/${props.shoes[i].id}`}>
                        <img src={`https://codingapple1.github.io/shop/shoes${parseInt(props.shoes[i].id, 10)+1}.jpg`} width="100%" />
                        <h4>{props.shoes[i].title}</h4>
                        <p>{props.shoes[i].price}</p>
                    </Link>
                </Col>
            )
        })
    )
}

function About() {
    return (
        <div>
            <h4>회사정보임</h4>
            <Outlet></Outlet>
        </div>
    )
}



export default App;
