import React from 'react'
import HomeButton from '../HomeButton'
import Sad from './img/sad (1).png'

const DSA = () => {
    return (
        <div className="">
            <HomeButton />
            <div className='DSA'>
                <h3>Not currently available</h3>
                <img src={Sad} alt="" className='pic'/>
            </div>
        </div>

    )
}

export default DSA