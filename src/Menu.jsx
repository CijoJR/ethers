import './Menu.css'


function Menu (){
    return(
        <div className='MenuWrapper'>
            <div className="Title">
                MENU
            </div>
            <div className="GridWrapper">
                <div className="GridItem FirstItem">item1</div>
                <div className="GridItem">item2</div>
                <div className="GridItem">item3</div>
                <div className="GridItem">item4</div>
                <div className="GridItem">item5</div>
            </div>
            <div className='MenuExit'>
                X
            </div>
        </div>
    )
}

export default Menu