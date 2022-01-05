import React, { Suspense } from 'react';
import './App.css';
import Carton from './components/Carton';

function App() {
  return <>
    <Suspense fallback={null}>
      <Carton />
    </Suspense>
  </>
}


export default App;
