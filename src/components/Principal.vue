<template lang="html">

  <section class="principal">
    <div>
      <nav class="navbarnavbar-dark bg-primary color">
          <a  class="navbar-brand">Ejemplo Vue+Firebase</a>
        <div class="btn-group">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
            {{usuario}}
          </button>
          <div class="dropdown-menu dropdown-menu-lg-right">
            <button class="dropdown-item" type="button">Salir</button>
          </div>
        </div>
      </nav>
      <div class="container m-0">
          <div class="row mt-5">
              <div class="col-sm-5">
                  <div class="card" style="width: 100%;">
                      <div class="card-header">
                          Agrega una nueva tarea
                          <div class="card-body">
                              <form @submit.prevent="addNota">
                                  <div class="form-group">
                                      <input type="text" class="form-control" v-model="nuevaNota.Tarea" placeholder="Tarea">
                                      <!--<input type="text" class="form-control" v-model="nuevaNota.Autor" placeholder="Autor">-->
                                      <div>
                                        <!-- Styled -->
                                        <b-form-file
                                          v-model="nuevaNota.archivo"
                                          :state="Boolean(nuevaNota.archivo)"
                                          placeholder="Choose a file or drop it here..."
                                          drop-placeholder="Drop file here..."
                                          @change="archivoSeleccionado"
                                        ></b-form-file>

                                        
                                        <!--<input type="file" @change="archivoSeleccionado" />-->

                                       
                                      </div>
                                      <button type="submit" class="btn btn-primary">Subir</button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-sm-7 text-center ">
                  <div class="card " style="width: 100%">
                      <div class="card-header">
                          Lista Tareas
                          <div class="card-body">
                              <table class="table table-stripped table-bordered">
                                <thead>
                                  <tr>
                                    <td><b>Tarea</b></td>
                                    <td><b>Autor</b></td>
                                    <td><b>Archivo</b></td>
                                    <td><b>Operaciones</b></td>

                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="nota in listaNotas" v-bind:key="nota.Tarea">
                                    <td>{{nota.Tarea}}</td>
                                    <td>{{nota.Autor}}</td>
                                    <td><a :href="nota.Archivo.url">{{nota.Archivo.name}}</a></td>
                                    <td>
                                      <b-button variant="danger" v-on:click="delNota(nota)">Eliminar</b-button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>

  </section>

</template>

<script lang="js">
import { db } from '../db.js'
import firebase from 'firebase';

  export default  {
    name: 'principal',
    props: [],
    mounted () {

    },
    data () {
      return {
        listaNotas:[],
        nuevaNota:{
          Tarea:"", 
          Archivo:{
            name:null,
            url:null
          }
        }
      }
    },
    firestore: {
      listaNotas: db.collection('notas'),
    },
    methods: {
      archivoSeleccionado(event) {
        this.nuevaNota.Archivo = event.target.files[0];
      },
      addNota:function(){


        
        this.onUpload()
        db.collection('notas').add(
          {
            Tarea: this.nuevaNota.Tarea,
            Autor: firebase.auth().currentUser.email,
            Archivo:{
              name:this.nuevaNota.Archivo.name,
              url:this.nuevaNota.Archivo.url
            }
          }
        )
      },
      onUpload(){

        const storageRef = firebase.storage().ref(`${this.nuevaNota.Archivo.name}`).put(this.nuevaNota.Archivo);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            if (url == null) {
              this.addNota()
            }else{
              this.nuevaNota.Archivo.url = url;

            }
          });
        }      
      )},
      delNota:(nota) => {
        db.collection('notas').doc(nota.id).delete()
      },

      singOuth:()=>{
        db.auth().signOut();
        
      }

    },
    computed: {
        usuario:()=>{
          return firebase.auth().currentUser.email;
        }
    }
}


</script>

<style scoped lang="css">
  .principal {

  }
  .color{
    color:black;
  }
</style>
