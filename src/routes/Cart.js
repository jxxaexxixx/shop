import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changeName } from './../store';
import { addCount } from './../store';




function Cart() {

    //스토어.js에있는거 가져오는함수
    // let cart = useSelector((state)=>{return state.cart})
    let store = useSelector((state) => state);

    let dispatch = useDispatch();
    let cart = useSelector((state) => state.cart);


    console.log(cart);

    return (
        <div>
            <h4>{store.user}의 장바구니</h4>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                    <td>
                                        <button onClick={() => {
                                            dispatch(addCount(item.id));
                                        }}>+</button>

                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;
