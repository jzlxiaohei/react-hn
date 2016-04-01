/**
 * Created by zilong on 3/31/16.
 */

// @flow
import './storyList.styl'
import React from 'react'
import utils from '../../utils'
import {loadStoriesByPage} from '../../action/story'
import {Link} from 'react-router'

/**
 * <StoryList stories={}></StoryList>
 *
 */
const StoryList = React.createClass({

    getDefaultProps(){
        return {
            stories: [],
            isLoading: true,
            noMorePage:false
        }
    },

    handleMoreClick(){
        const page = this.props.page
        this.props.dispatch(loadStoriesByPage(page+1))
    },
    
    render(){
        const stories = this.props.stories
        var lis = stories.map((sItem)=> {
            return (
                <li key={sItem.id} className="story-list-item">
                    <div className="sli-content">
                        <div className="sli-basic-info">
                            <a href={sItem.url} className="sli-extra-href">
                                <span className="sli-title">{sItem.title}</span>
                                <span className="sli-url">
                                    ({sItem.url ? utils.urlParse(sItem.url).hostname : ''})
                                </span>
                            </a>
                        </div>
                        <div className="sli-extra-info">
                            {sItem.score} points by {sItem.by} {utils.time.formatFromNow(sItem.time)}
                            | {sItem.kids ? sItem.kids.length : 0} comments
                        </div>
                    </div>
                </li>
            )
        })

        let moreClassName = 'load-more-page'
        if(this.props.isLoading || this.props.noMorePage){
            moreClassName +=' hide'
        }
        
        return (
            <div className="story-list-wrapper">
                <ul className="story-list">
                    {lis}
                </ul>
                <div className={this.props.isLoading?'':'hide' }> loading ...</div>
                <div className={moreClassName} onClick={this.handleMoreClick}> more </div>
            </div>
        )
    }
})


export default StoryList