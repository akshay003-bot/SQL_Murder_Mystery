import Home from './pages/Home';
import React from 'react';
import {Route, Routes, HashRouter} from 'react-router-dom';
import Case1Python from './pages/cases/case 1/PythonCase 1';
import Case1SQL from './pages/cases/case 1/SQLCase 1';
import Learn from './pages/Learn Pandas';
import './index.css';

const App = () => {
  return(
    <div>
      <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/case1python' element={<Case1Python />} />
        <Route path='/case1sql' element={<Case1SQL />} />
        <Route path='/learn' element={<Learn />} />
      </Routes>
      </HashRouter>
    </div>
  )
}

export default App;