import chai from 'chai'
import spies from 'chai-spies';

chai.use(spies);

const should = chai.should()

import {loadTopStoriesIds} from '../src/action/story'

describe('Action', function () {
    describe('loadTopStories', function () {
        it('loadTopStories should get a lots of ids', function (done) {
            this.timeout(15000)
            let calledTimes = 0
            const fakeDispatch = stories=> {
                calledTimes++
                if (calledTimes == 2) {
                    done()
                    stories.length.should.length.above(100)
                    stories[0].should.be.a('string')
                }
            }

            loadTopStoriesIds()(fakeDispatch)
        })
    })
})
