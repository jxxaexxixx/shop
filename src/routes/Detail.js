import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './../store';




// let YellowBtn = styled.button`
//     background : ${ props => props.bg };
//     color : ${ props => props.bg  == 'blue' ? 'white' : 'black'};
//     padding : 10px;
// `
// let Box = styled.div`
//     background : grey;
//     padding : 20px;
// `
// let NewBtn = styled.button(YellowBtn)`
//     padding : 20px;
// `

class Detail2 extends React.Component{//옛날문법
    componentDidMount() {}
    componentDidUpdate(){}
    componentDidUnMount(){}
}

function Detail(props) {

    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let { id } = useParams();
    let [input, setInput] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    let [tab, setTab] = useState(0);

    let [fade2, setFade2] = useState('');
    let dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

     useEffect(() => {
        console.log(cart);
    }, [cart]);


    useEffect(()=>{
        setFade2('end')
        return ()=>{
            setFade2('')
        }
    },[])

    useEffect(() => {
        //mount,update(재랜더링)시 실행됨
        //html을 다 읽고(랜더링) 후 실행됨
        //시간이 오래걸리는 코드를 여따 쓰는게 조음 랜더링이 끝난 후 실행되기때문에!
        //어려운연산
        //api
        //타이머장착
        // for (var i = 0; i < 100; i++) {
        //     console.log(1);
        // }
        let timer = setTimeout(() => {
            {setAlert(false)}
        }, 5000);
        //useEffect 동작전에 실행됨
        return () => {
            //클린업함수- 기존함수들 제거해줘~
            clearTimeout(timer);
            //기존데이터요청은 제거해주세용 이런걸해조야대
            //리액트는 재랜더링이 자주되기떄문엥
        }
    }, []); //[count]가 변경될때마다 useEffect가 실행되는거임
    //[] 가 없으면 재랜더링될때만 실행되고 업데이트될때는 실행안됨
    //[] 컴포넌트 최초랜더링 1회만 실행하고싶으면 그냥 빈값넣어

    useEffect(() => {
        return () => {
            setShowWarning(isNaN(input) && input.trim() !== '');
        }
    }, [input]);


    return (
        <div className={'container start ' + fade2}>
            {/* <Box>
                <YellowBtn bg="blue">버튼</YellowBtn>
                <YellowBtn bg="orange">버튼</YellowBtn>
            </Box> */}
            {/* {count} */}
            {
                alert == true ?
                    <div className='alert alert-warning'>
                    5초 이내 구매시 할임
                    </div>
                : null
            }
            {/* <button onClick={()=>{setCount(count+1)}}>버튼</button> */}
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id, 10)+1}.jpg`} width="100%" />
                </div>
                {/* <input type="text" onChange={(e) => {
                    setInput(e.target.value)
                }} /> */}
                {showWarning && (
                    <div className='alert alert-warning'>
                        숫자만 입력해주세요.
                    </div>
                )}
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem({ id: props.shoes[id].id, name: props.shoes[id].title, count: 1 }))
                    }}>주문하기</button>
                </div>
            </div>
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ setTab(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} shoes={props.shoes[id]}/>
        </div>
    )
}
// function TabContent({ tab }) {
//   if (tab === 0) {
//     return <div>내용0</div>;
//   }
//   if (tab === 1) {
//     return <div>내용1</div>;
//   }
//   if (tab === 2) {
//     return <div>내용2</div>;
//   }
// }
// function TabContent(props){
//   return [ <div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][props.tab]
// }

function TabContent({ tab ,shoes}) {
    let [fade, setFade] = useState('');

    useEffect(()=>{
        setTimeout(() => { setFade('end') }, 100);
    return ()=>{
        setFade('');
    }
    }, [tab])
    return (
        <div className={'start ' + fade}>
            { [<div>{shoes.title}</div>, <div>{shoes.content}</div>, <div>{shoes.price}</div>][tab] }
        </div>
    )
}


export default Detail;