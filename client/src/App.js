import React, { useEffect } from 'react';
import axios from 'axios';
import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Desktop version:
import Header from './desktop/components/Header';
import MainPage from './desktop/pages/MainPage';
import SignInPage from './desktop/pages/SignInPage';
import SignUpPage from './desktop/pages/SignUpPage';
import ContentPage from './desktop/pages/ContentPage';
import NewPostPage from './desktop/pages/NewPostPage';
import Me from './desktop/pages/Me';
import Logout from './desktop/pages/Logout';
import PostPage from './desktop/pages/PostPage';

import './App.css';

const Data = createContext(null);

function App() {
  const [data, setData] = useState({
    auth: localStorage.getItem("auth") === "true" || false,
    access_token: localStorage.getItem("access_token"),
    username: localStorage.getItem("username"),
    user_id: localStorage.getItem('user_id')
  })

  axios.defaults.baseURL = "https://balabol-app.onrender.com/api"
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
  }, [data])
  
  const setterWithObserver = (data) => {
    setData({...data});
    console.log("Observer: ", data);
    localStorage.setItem("auth", data.auth);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("user_id", data.user_id);
  }

  return (
    <>
      <BrowserView>
      <BrowserRouter>
        {/* desktop version */}
        <Data.Provider value={{user: data, setter: setterWithObserver}}>
          <Header />
          <Routes>
            <Route path='*' element={<MainPage />} />
            <Route path='/sign-in' element={<SignInPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
            <Route path='/me' element={<Me />} />
            <Route path='/user/:user_id' element={<ContentPage />} />
            <Route path='/new/post' element={<NewPostPage />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/post/:post_id' element={<PostPage />} />
          </Routes>
        </Data.Provider>
      </BrowserRouter>
      </BrowserView>
      
      {/* toastify container for notifications */}
      <ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored" />
    </>
  );
}

export default App;
export {Data};