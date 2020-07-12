import Api from './index'
// const base64url = require('base64url')

const FIDO_SERVER = 'https://localhost:8080'

export default {
    testPosting (text) {
        const baseURL = FIDO_SERVER
        const item = { text: text }
        return Api(baseURL).post('/test', item)
    }
}