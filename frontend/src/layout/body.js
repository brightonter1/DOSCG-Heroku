import React, { useState } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
const Body = (props) => {
    const [menu, setMenu] = useState(null)
    const onClick = (e) => {
        setMenu(e.target.name)
    }

    return (
        <div style={{ height: '75em', backgroundColor: '#fafcff' }}>
            <div className="row">
                <div className="col-2" id="menu-bar">
                    <nav className="nav flex-column nav-pills" style={{ marginTop: '3.5em', borderTop: '1px solid rgba(0,0,0,.1)' }}>
                        <Link to="/sequence" className={`nav-link ${menu === 'sequence' && 'active'}`} onClick={onClick} name='sequence' >
                            Sequence
                        </Link>

                        <Link to="/equation" className={`nav-link ${menu === 'equation' && 'active'}`} onClick={onClick} name='equation' >
                            Equation
                        </Link>

                        <Link to="/location" className={`nav-link ${menu === 'location' && 'active'}`} onClick={onClick} name='location' >
                            Location
                        </Link>

                        <Link to="/notify" className={`nav-link ${menu === 'notify' && 'active'}`} onClick={onClick} name='notify' >
                            Line Notify
                        </Link>

                        <Link to="/cv" className={`nav-link ${menu === 'cv' && 'active'}`} onClick={onClick} name='cv' >
                            Resume
                        </Link>
                    </nav>
                </div>
                <div className="col-8">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Body;