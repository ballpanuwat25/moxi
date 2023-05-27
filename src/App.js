import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import Home from './pages/home/Home'
import Memo from './pages/memo/Memo'
import Todo from './pages/todo/Todo'
import Error from './pages/error/Error'
import Classtimer from './pages/schedule/Classtimer'

function App() {

  return (
    <BrowserRouter basename={'/moxi'}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memo" element={<Memo />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/classtimer" element={<Classtimer />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
