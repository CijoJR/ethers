import './PopUp.css'

export default function PopUpMenu( { title, message, warning, button1Name, button2Name, button1Func, button2Func } ) {
    return(
        <div className="PopUpNotification">
            <div className='PopUpNotificationHeader'>
                <h2>{title}</h2>
                <h3>{message}</h3>
                <p style={{color: 'var(--SR)'}}>{warning}</p>
                <div className='PopUpNotificationButtons'>
                    <button onClick={button1Func}>{button1Name}</button>
                    <button onClick={button2Func}>{button2Name}</button>
                </div>
            </div>
        </div>
    );
}