<template lang="html">

  <section class="login">
    <div class="container w-50 border rounded mt-5 ">
      <h1>LOGIN</h1>
      <form class="px-4 py-3" @submit.prevent="login">
        <div class="form-group">
          <label for="exampleDropdownFormEmail">Email address</label>
          <input type="email" class="form-control" v-model="email" id="exampleDropdownFormEmail" placeholder="email@example.com">
        </div>
        <div class="form-group">
          <label for="exampleDropdownFormPassword1" >password</label>
          <input type="password" class="form-control"  v-model="password" id="exampleDropdownFormPassword1" placeholder="Password">
        </div>
        <div class="form-group">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="dropdownCheck">
            <label class="form-check-label" for="dropdownCheck">
              Remember me
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary" >Sign in</button>
      </form>
      <button  class="btn btn-danger" v-on:click="createAcountGoogle">Google</button>
      <button  class="btn btn-dark" v-on:click="createAcountGit">Git-Hub</button>
      <button  class="btn btn-primary" v-on:click="createAcountFace">Facebook</button>

      <div class="dropdown-divider"></div>
      <router-link class="dropdown-item" to="/registro"> New around here? Sign up </router-link>
    </div>
  </section>
</template>

<script lang="js">
import firebase from 'firebase'

  export default  {
    name: 'login',
    props: [],
    mounted () {

    },
    data () {
      return {
        email:'',
        password:''
      }
    },
    methods: {
      login: function(){
        // All future sign-in request now include tenant ID.
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() =>{
              //alert("Conectado")
              this.$router.replace("/contenido")
          }).catch(function(error) {
            // Handle error.
            console.log(error)
          });
      },
      createAcountGoogle:function(){
         var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                this.$router.replace('/contenido')
            }).catch(function (error) {
                alert(error.message)
            });
      },
      createAcountGit:function(){
         var provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                this.$router.replace('/contenido')
            }).catch(function (error) {
                alert(error.message)
            });
      },
      createAcountFace:function(){
         var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                this.$router.replace('/contenido')
            }).catch(function (error) {
                alert(error.message)
            });
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .login {

  }
</style>
