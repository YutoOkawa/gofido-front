import Api from './index'
const base64url = require('base64url')

const FIDO_SERVER = 'localhost'

export default {
    attestationOptions (username, displayName, FIDO_URL) {
        const baseURL = 'https://' + FIDO_URL + ':8080'
        const param = {
          username: username,
          displayName: displayName
        }
        return Api(baseURL).post('/attestation/options', param)
    },
    attestationResult (create, username, FIDO_URL) {
        const baseURL = 'https://' + FIDO_URL + ':8080'
        const param = {
            username: username,
            create: create
        }
        return Api(baseURL).post('/attestation/result', param)
    },
    assertionOptions (username, FIDO_URL) {
        const baseURL = 'https://' + FIDO_URL + ':8080'
        const param = {
            username : username
        }
        return Api(baseURL).post('/assertion/options', param)
    },
    assertionResult (get, username, FIDO_URL) {
        const baseURL = 'https://' + FIDO_URL + ':8080'
        const param = {
          username: username,
          get : get
        }
        return Api(baseURL).post('/assertion/result', param)
    },
    testPosting (text) {
        const baseURL = FIDO_SERVER
        const item = { text: text }
        return Api(baseURL).post('/test', item)
    },
    encodeBase64url (buf) {
        return base64url.encode(buf)
    },
    decodeBase64url (buf) {
        return base64url.decode(buf)
    },
    toBufferBase64url (buf) {
        return base64url.toBuffer(buf)
    },
    toBuffer (buf) {
        if (buf instanceof ArrayBuffer) {
          buf = Buffer.from(new Uint8Array(buf))
        }
        return buf
    },
    toArrayBuffer (buf) {
        if (typeof buf === 'string') {
          // base64url to base64
          // console.log("base64url to base64")
          buf = buf.replace(/-/g, '+').replace(/_/g, '/')
          // base64 to Buffer
          buf = Buffer.from(buf, 'base64')
        }
        // Buffer or Array to Uint8Array
        if (buf instanceof Buffer || Array.isArray(buf)) {
          // console.log("Buffer or Array to Uint8Array")
          buf = new Uint8Array(buf)
        }
        // Uint8Array to ArrayBuffer
        if (buf instanceof Uint8Array) {
          // console.log("Uint8Array to ArrayBuffer")
          buf = buf.buffer
        }
        // error if none of the above worked
        if (!(buf instanceof ArrayBuffer)) {
          throw new TypeError(`could not coerce '${name}' to ArrayBuffer`)
        }
        return buf
    },
    strToBuffer (src) {
        return (new Uint8Array([].map.call(src, function (c) {
          return c.charCodeAt(0)
        }))).buffer
    },
    bufToStr (buf) {
        return String.fromCharCode.apply('', new Uint8Array(buf))
    },
}