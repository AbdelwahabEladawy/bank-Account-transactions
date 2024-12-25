import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan:{
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      
      reducer (state, action) {
      if (state.loan > 0) {
        return;
      }
      state.loan = action.payload.amount;
      state.balance += action.payload.amount;
      state.loanPurpose = action.payload.purpose;
    }},
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertCurrency(state) {
      state.isLoading = true;

    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertCurrency"});
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}
  
export default accountSlice.reducer;

/*
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload,isLoading:false };

case "account/convertCurrency":
  return{...state,isLoading:true}

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

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertCurrency"});
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
export function payLoan(amount) {
  return { type: "account/payLoan" };
}
*/
