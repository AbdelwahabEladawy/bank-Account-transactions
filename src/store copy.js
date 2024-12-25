import { combineReducers, createStore } from "redux";



const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };

    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

function customerReducer(state=initialStateCustomer,action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {...state,fullName:action.payload.fullName,nationalId:action.payload.nationalId,createdAt:action.payload.createdAt}
      
  case "customer/updateName":
    return{...state,fullName:action.payload}
    default:
 return state 
  }
}

const rootReducer= combineReducers(
{
  account:accountReducer,
  customer:customerReducer
}
)
const store = createStore(rootReducer);

store.dispatch(deposit(800));
console.log(store.getState());

store.dispatch(withdraw(300));
console.log(store.getState());

store.dispatch(requestLoan(1000, "buy a moto"));

console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan(amount) {
  return { type: "account/payLoan" };
}



function createCustomer(fullName,nationalId){
  return {type:"customer/createCustomer",payload:{fullName,nationalId,createdAt:new Date().toISOString()}}
}

function updateName(fullName) {
  return{type:"customer/updateName",payload:fullName}
  
}


store.dispatch(createCustomer("AbdelwahabMohamed","4545454578712341"))
console.log(store.getState());
store.dispatch(deposit(1505))
console.log(store.getState());
store.dispatch(updateName("asdasdljsldk"))
console.log(store.getState());