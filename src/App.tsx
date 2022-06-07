import "./styles.css";
import {useState, useReducer, useEffect} from "react";
import axios from "axios";

export default function App() {
  const initialState = {
    posts:[],
    error: ""
  }
  const reducer = (state, action) => {
    console.log('--',state)
    switch(action.type){
      case "SUCCESS":
          return {...state, posts: action.payload}
      case "ERROR":
          return {error: "Something went wrong"}
      default:
        return state
    }

      
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(res=> dispatch({type: "SUCCESS", payload: res.data}))
    .catch(err=> dispatch({type: "ERROR"}))
  }, [])
  

  console.log(state)
  return (
    <div className="App">
      <div>
        <p>Results: </p>
        <div>
          <ul>
          {state.posts  ? state.posts.map(post=>
            <li key={post.id}>{post.title}</li>
          ): state.error}
          </ul>
        </div>
      </div>
    </div>
  );
}
