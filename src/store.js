import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState: 'kim',
    reducers: {
        changeName(state) {
            return 'john ' + state
        }
    }
})

let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12],
})

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1},
    ],
    reducers: {
        addCount(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.count++;
            }
        },
        addItem(state, action){
            state.push(action.payload)
        }
    }
})

export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer,
    }
})

export let { addCount, addItem } = cart.actions
export let { changeName } = user.actions