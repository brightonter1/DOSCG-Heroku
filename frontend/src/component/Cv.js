import React from 'react'
import resume from '../asset/Resume.png'
const Cv = () => {


    return (
        <React.Fragment>
            <img src={resume} className='rounded image fluid' style={{ width: '70%', padding: '1em' }} />
        </React.Fragment>
    )
}

export default Cv