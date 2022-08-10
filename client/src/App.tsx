import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostCreate from './page/PostCreate/PostCreate';

import PostList from './page/PostList/PostList';
import Post from './page/Post/Post';
import PostUpdate from './page/PostUpdate/PostUpdate';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
      <Route path="/post/:post_id" element={<Post />}/>
      <Route path="/post/update/:post_id" element={<PostUpdate />}/>
      <Route path="/" element={<PostList />} />
        <Route path="/post/new" element={<PostCreate />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
