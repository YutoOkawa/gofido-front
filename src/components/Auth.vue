<template>
    <div class="authenticate">
      <h1>{{ msg }} </h1>
      <input v-model="userid" placeholder="userid">
      <input v-model="displayName" placeholder="displayName">
      <div class="authenticate_method">
        <button @click="assrtOp(userid, baseURL)">登録開始</button>
        <p v-if="registered">{{ assertion }}</p>
      </div>
      <p><textarea v-model="display_assertion" cols="120" rows="10" disabled></textarea></p>
    </div>
</template>

<script>
import Methods from '@/api/methods'
export default {
  name: 'Authenticate',
  props: {
    msg: String
  },
  data () {
    return {
      userid: 'test',
      displayName: 'test',
      text: 'Test Message',
      baseURL: 'localhost',
      assertion: null,
      display_assertion: null,
      get: null,
      response_get: {
        response: {}
      },
      registered: false
    }
  },
  methods: {
    async assrtOp (username, baseURL) {
      var assertionResponse  = await Methods.assertionOptions(username, baseURL)
      this.assertion = assertionResponse.data
      this.display_assertion = JSON.stringify(assertionResponse.data)
      console.log(this.assertion);
      // this.assertion.allowCredential.transports = ["usb", "nfc", "ble", "internal"]
      // console.log(this.assertion)
      this.assertion.challenge = Methods.toBufferBase64url(this.assertion.challenge)
      this.assertion.allowCredentials[0].id = Methods.toBufferBase64url(this.assertion.allowCredentials[0].id)
      this.get = await navigator.credentials.get({publicKey: this.assertion})
      console.log(this.get)
      this.response_get.id = this.get.id
      this.response_get.rawId = Methods.encodeBase64url(this.get.rawId)
      this.response_get.response.authenticatorData = Methods.encodeBase64url(this.get.response.authenticatorData)
      this.response_get.response.clientDataJSON = Methods.encodeBase64url(this.get.response.clientDataJSON)
      this.response_get.response.signature = Methods.encodeBase64url(this.get.response.signature)
      this.response_get.response.userHandle = Methods.encodeBase64url(this.get.response.userHandle)
      this.response_get.type = this.get.type
      this.assrtRe(this.response_get, this.userid, this.baseURL)
    },
    async assrtRe (response_get, userid, baseURL) {
      var result = await Methods.assertionResult(response_get, userid, baseURL)
      result = result.data
      console.log(result)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
