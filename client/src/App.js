import {Route, Routes, Navigate} from 'react-router-dom'
import Main from './pages/Main'
import Signup from './pages/Signup'
import Login from './pages/Login'

const App = () => {
    const user = localStorage.getItem("token")
    return(
        <Routes>
            {user && <Route path='/' exact element={<Main/>}/>}
            <Route path="/signup" exact element={<Signup/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/" exact element={<Navigate replace to='/login'/>}/>
        </Routes>

    )
}

export default App;