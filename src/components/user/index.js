/**
 * Created by zilong on 4/1/16.
 */

// @flow
import React from 'react'
import utils from '../../utils'

const User = React.createClass({
    render(){
        const user = this.props.user || {}
        const isLoading = this.props.isLoading

        return (
            <div style={{color:'#999',margin:'10px 0 0 10px'}}>
                <table className={isLoading?'hide':''} >
                    <tbody>
                    <tr>
                        <td>user:</td>
                        <td>{user.id}</td>
                    </tr>
                    <tr>
                        <td>created:</td>
                        <td>{utils.time.formatFromNow(user.created)}</td>
                    </tr>
                    <tr>
                        <td>karma:</td>
                        <td>{user.karma}</td>
                    </tr>
                    <tr>
                        <td>about:</td>
                        <td dangerouslySetInnerHTML={{__html:user.about}}/>
                    </tr>
                    </tbody>
                </table>
                <div className={isLoading?'':'hide'}>loading...</div>
            </div>
        )
    }
})

export default User