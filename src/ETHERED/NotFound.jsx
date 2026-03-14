import './NotFound.css'
import IdleAnimation from '../Components/IdleAnimation.jsx'


const NotFound = ()=>{
    return (
        <div className='NFW'>
            <h1>404</h1>
            <p>Page not found</p>
            <IdleAnimation s='5s' h='75vh'/>
        </div>
    )
}


export default NotFound