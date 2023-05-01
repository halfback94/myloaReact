import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import MyLoa from './containers/MyLoa';

function App() {
    useEffect(() => {
        return () => {
        }
    },[]);

    return (
        <MyLoa />
    );
}

export default App;
