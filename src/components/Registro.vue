<template lang="html">

  <section class="registro">
    

    <div class="container w-50 border rounded mt-5 ">
      <h1>Registro</h1>
      <form class="px-4 py-3" @submit.prevent="createAccount">
        <div class="form-group">
          <label for="exampleDropdownFormEmail1">Email address</label>
          <input type="email" class="form-control" v-model="email" id="exampleDropdownFormEmail1" placeholder="email@example.com">
        </div>
        <div class="form-group">
          <label for="exampleDropdownFormPassword1" >password</label>
          <input type="password" class="form-control"  v-model="password" id="exampleDropdownFormPassword1" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary" >Sign in</button>
      </form>
      <div class="dropdown-divider"></div>
      <router-link class="dropdown-item" to="/login"> Return? </router-link>
    </div>
  </section>

</template>

<script lang="js">
import firebase from 'firebase';

  export default  {
    name: 'registro',
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
      createAccount:function(){
           firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function () {
                    this.$router.replace("/login")
                },
                function (err) {
                    alert('¡¡¡¡¡¡¡OJOOOO!!!!!!! ' + err.message)
                }
            )
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .registro {

  }
</style>
