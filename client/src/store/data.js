import { createStore } from 'redux';
import { db, auth } from '../components/firebase/firebase';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'


//ACTIONS


export const set = () => {
    return {
        type: 'SET'
    }
}

export const change = (something) => {
  return {
      type: 'CHANGE',
      obj: something
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
            return {};
        case "CHANGE":
            return action.obj;
        default:
            return null;
    }
}

const pReducer = persistReducer(persistConfig, reducer);

export const data = createStore(pReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(data);
data.dispatch(set({}));
