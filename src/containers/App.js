/**
 * Created by zilong on 3/30/16.
 */

// @flow

import './app.styl'
import React  from 'react'
import {Link} from 'react-router'

const App = React.createClass({

    render() {
        return (
            <div className="main-content">
                <header>
                    <div className="header-bar">
                        <Link to="/" style={{fontWeight:'bold'}}>HackerNews</Link>
                        <a href="https://github.com/jzlxiaohei/react-hn" style={{float:'right'}}>source (github)</a>
                    </div>
                </header>
                <div className="app-content">
                   
                        {this.props.children}
                </div>
            </div>
        )
    }
})

export default App