/**
 * Created by zilong on 4/1/16.
 */

// @flow
import './story.styl'

import React from 'react'
import {Link} from 'react-router'
import utils from '../../utils'
import {loadComments, CommentsAction} from '../../action/comment'


const Comments = React.createClass({

    getInitialState(){
        return {
            comments: []
        }
    },

    componentDidMount(){
        const kids = this.props.kids
        if(kids){
            loadComments(kids)((action)=> {
                this.innerDispatch(action)
            })
        }
    },

    innerDispatch(action){
        if (action.type == CommentsAction.value.req_success) {
            const comments = action.comments
            this.setState({comments})
        }
    },

    render(){
        const kids = this.props.kids
        const comments = this.state.comments
        if (!kids || kids.length == 0) {
            return false
        }
        const state = this.state
        const commentsDom = comments.map(c=> {
            return (
                <li key={c.id} className="comment-item">
                        <div className="comment-meta">{c.by} {utils.time.formatFromNow(c.time)}</div>
                        <div className="comment-text" dangerouslySetInnerHTML={{__html:c.text}}></div>
                    <Comments kids={c.kids} level={this.props.level+1}/>
                </li>
            )
        })
        let isLoading = comments.length==0
        return (
            <ul className="comment-list">
                {commentsDom}
                <div className={isLoading?'':'hide'}>loading...</div>
            </ul>
        )
    }
})


const StoryDetail = React.createClass({


    render(){
        const sItem = this.props.story
        const kids = sItem.kids
        const isLoading = this.props.isLoading
        return (
            <div>
                <div className={isLoading?'hide story-detail':'story-detail'}>
                    <div className="story-list-item">
                        <div className="sli-basic-info">
                            <a href={sItem.url} className="sli-extra-href">
                                <span className="sli-title">{sItem.title}</span>
                            <span className="sli-url">
                                ({sItem.url ? utils.urlParse(sItem.url).hostname : ''})
                            </span>
                            </a>
                        </div>
                        <div className="sli-extra-info">
                            {sItem.score} points by <Link
                            to={`/user/${sItem.by}`}>{sItem.by}</Link> {utils.time.formatFromNow(sItem.time)}

                            | <Link
                            to={`/story/${sItem.id}`}> {sItem.descendants > 0 ? sItem.descendants + 'comments' : 'discuss'} </Link>
                        </div>
                    </div>

                    <div className="comment-area">
                        {
                            kids && kids.length ?
                                <Comments kids={kids} level={1}/> : ''
                        }
                    </div>
                </div>
                <div className={isLoading?'':'hide'}>loading...</div>
            </div>

        )
    }
})

export default StoryDetail