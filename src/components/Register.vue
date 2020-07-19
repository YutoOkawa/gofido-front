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
      attestation_encode: {
        user: {}
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
      await navigator.credentials.create({publicKey: this.attestation})
      // this.attestation = await this.attestation.data
      // if (this.attestation.status === 'failed') {
      //   alert(this.attestation.message)
      // } else {
      //   this.registered = true
      //   // console.log(this.attestation);
      //   this.attestation_encode.challenge = await this.attestation.challenge
      //   this.attestation_encode.id = await this.attestation.user.id
      //   // console.log(this.attestation_encode);
      //   this.attestation_encode.challenge = await Methods.toBufferBase64url(this.attestation_encode.challenge)
      //   this.attestation_encode.id = await Methods.toBufferBase64url(this.attestation_encode.id)
      //   this.attestation.challenge = await Methods.toArrayBuffer(this.attestation.challenge)
      //   this.attestation.user.id = await Methods.toArrayBuffer(this.attestation.user.id)
      //   // console.log(this.attestation)
      //   this.atteRe(baseURL)
      // }
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
