
import { createSlice } from "@reduxjs/toolkit";
import reducer from "../accounts/accountSlice";

const initialState = {
    fullName: "",
    nationalId: "",
    createdAt: "",
  };
  
  const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
      createCustomer:{
        prepare(fullName, nationalId) {
          return { payload: { fullName, nationalId, createdAt: new Date().toISOString() } };
        },
        reducer(state, action) {
          state.fullName = action.payload.fullName;
          state.nationalId = action.payload.nationalId;
          state.createdAt = action.payload.createdAt;
      }},
      updateName(state, action) {
        state.fullName = action.payload;
      },
    },
  })
  
  
 export default function customerReducer(state=initialState,action) {
    switch (action.type) {
      case "customer/createCustomer":
        return {...state,fullName:action.payload.fullName,nationalId:action.payload.nationalId,createdAt:action.payload.createdAt}
        
    case "customer/updateName":
      return{...state,fullName:action.payload}
      default:
   return state 
    }
  }
  
  export const { createCustomer, updateName } = customerSlice.actions;
    
  
  
  
  
//  export function createCustomer(fullName,nationalId){
//     return {type:"customer/createCustomer",payload:{fullName,nationalId,createdAt:new Date().toISOString()}}
//   }
  
//  export function updateName(fullName) {
//     return{type:"customer/updateName",payload:fullName}
    
//   }
  
  