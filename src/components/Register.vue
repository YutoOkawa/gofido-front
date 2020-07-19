<template>
    <div class="register">
      <h1>{{ msg }} </h1>
      <input v-model="userid" placeholder="userid">
      <input v-model="displayName" placeholder="displayName">
      <div class="register_method">
        <button @click="atteOp(userid, displayName, baseURL)">登録開始</button>
        <p v-if="registered">{{ attestation }}</p>
      </div>
      <p><textarea v-model="display_attestation" cols="120" rows="10" disabled></textarea></p>
    </div>
</template>

<script>
import Methods from '@/api/methods'
export default {
  name: 'Register',
  props: {
    msg: String
  },
  data () {
    return {
      userid: 'test',
      displayName: 'test',
      text: 'Test Message',
      baseURL: 'localhost',
      attestation: null,
      display_attestation: null,
      create: null,
      response_create: {
        response: {}
      },
      registered: false
    }
  },
  methods: {
    async atteOp (username, displayName, baseURL) {
      var attestationResponse  = await Methods.attestationOptions(username, displayName, baseURL)
      this.attestation = attestationResponse.data
      this.display_attestation = JSON.stringify(attestationResponse.data)
      console.log(this.display_attestation);
      this.attestation.pubKeyCredParams = []
      this.attestation.pubKeyCredParams.type = "public-key"
      this.attestation.pubKeyCredParams.alg = -7
      this.attestation.challenge = Methods.toBufferBase64url(this.attestation.challenge)
      this.attestation.user.id = Methods.toBufferBase64url(this.attestation.user.id)
      console.log(this.attestation)
      this.create = await navigator.credentials.create({publicKey: this.attestation})
      console.log(this.create)
      this.response_create.id = this.create.id
      this.response_create.rawId = Methods.encodeBase64url(this.create.rawId)
      this.response_create.response.attestationObject = Methods.encodeBase64url(this.create.response.attestationObject)
      this.response_create.response.clientDataJSON = Methods.encodeBase64url(this.create.response.clientDataJSON)
      this.response_create.type = this.create.type
      console.log(this.response_create)
    },
    async atteRe (baseURL) {
      if (this.attestation != null) {
        var response = await Methods.abs_navigator_credentials_create(this.attestation, this.userid, baseURL)
        response = response.data
        // console.log(response)
      } else {
        console.error('登録準備ができていません。')
        return
      }
      if (!response) {
        console.error('正しいレスポンスが返ってきていません。')
        return
      }
      var result = await Methods.attestationResult(response, this.userid, baseURL)
      result = result.data
      if (result.status === 'ok') {
        alert(result.message)
      } else if (result.status === 'failed') {
        alert(result.message)
        console.log('登録失敗...')
      }
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
