import React, { useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Diary from './pages/Diary';
import Edit from './pages/Edit';
import Home from './pages/Home';
import New from './pages/New';


const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) => it.id === action.targetId ? { ...action.data } : { it })
      break;
    }
    default:
      return state;
  }

  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: '오늘의 일기1',
    date: 1667286698488,
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기2',
    date: 1667286759686,
  },
  {
    id: 3,
    emotion: 3,
    content: '오늘의 일기3',
    date: 1667286766612,
  },
  {
    id: 4,
    emotion: 4,
    content: '오늘의 일기4',
    date: 1667286804631,
  }
  ,
  {
    id: 5,
    emotion: 5,
    content: '오늘의 일기5',
    date: 1667286814262,
  }
]
function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  //create
  const dataId = useRef(0);
  const onCreate = ({ date, content, emotion }) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current++,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    })
  }
  //remove
  const onRemove = ({ targetId }) => {
    dispatch({ type: "REMOVE", targetId })
  }
  //edit
  const onEdit = ({ date, targetId, content, emotion }) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      }
    })
  }
  const onDispatch = () => {

  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
