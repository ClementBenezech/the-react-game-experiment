import { createStore } from 'redux'
import AppReducer from "./AppReducer"

//Creating the store
let store = createStore(AppReducer);
//chacking initial value
console.log('Initial state: ', store.getState());

export default store