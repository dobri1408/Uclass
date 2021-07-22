import { createStore } from 'redux';
import { db, auth } from '../components/firebase/firebase';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

let meetingsData = [];
let obj = {};
export const getData = async () => {
    await auth.onAuthStateChanged((user)=>{
      if(user){
        db.collection('users').doc(user.uid).get().then((snap)=>{
          if(snap.exists) {
            snap.data().meetings.forEach((element, index)=>{
              db.collection('meetings').doc(element).get().then((s)=>{
                if(meetingsData.length < snap.data().meetings.length) {meetingsData.push(s.data())}
              })
            })
          }
        obj = {
            userData: snap.data(),
            meetingsData: meetingsData
        }
  
        })
      }
    })
  }

//ACTIONS

export const refresh = () => {
    getData();
    return {
        type: 'REFRESH'
    }
}

export const set = () => {
    return {
        type: 'SET'
    }
}

//REDUCER

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}

const reducer = (state={}, action) => {
    switch(action.type) {
        case "SET":
            return obj;
        case "REFRESH":
            return obj
            
        default:
            return null;
    }
}

const pReducer = persistReducer(persistConfig, reducer);

export const data = createStore(pReducer);
export const persistor = persistStore(data);

// persistor.dispatch(refresh());
data.dispatch(refresh());

// export const getNewData = () => {
//   persistor.dispatch(refresh());
//   data.dispatch(refresh());
// }