module.exports = function (express) {

    express.use('/apiRecording/**', function (req, res, next) {
        console.log('the record endpoint, post something please next time', req, res, next)
    })

}
