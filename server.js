/**
 * Created by zilong on 4/2/16.
 */

// @flow

var path = require('path')
var express = require('express')
var app = express()

app.use(express.static(__dirname + '/dist'))

app.listen(80, function () {
    console.log('server start:' + 80)
})

