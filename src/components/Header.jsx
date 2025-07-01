import logo from '/logo.png'

const Header =() =>{
     return(
        <div className="header">
            
            <div className="logo">
                <img src={logo} alt="logo" />
                 <div className="logo-name">TypeBlitz</div>
            </div>
            <div className='auth-buttons'>
                <button className='login-button'>Login</button>
                <button className='signup-button'>Signup</button>
            </div>
           
        </div>

     )
}
export default Header