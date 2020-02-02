// General configuration

module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET: 'bananas',
    mongoURI: 'mongodb://localhost:27017/ultimateblog'
}