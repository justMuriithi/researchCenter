<!-- <script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// </script>

// <template>
//   <header>
//     <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

//     <div class="wrapper">
//       <HelloWorld msg="You did it!" />
//     </div>
//   </header>

//   <main>
//     <TheWelcome />
//   </main>
// </template>-->

<template>

<div>
  <v-card>
    <v-layout>
      <v-app-bar title="Research Centre">
    
      </v-app-bar>
      <v-navigation-drawer></v-navigation-drawer>
      <!-- <v-navigation-drawer
        permanent>
          <div class="d-flex flex-column">
            <p>FILTERS</p>
    <v-select 
      :items="categories"
      item-text="name"
      item-value="id"
      v-model="categoryName"
      label="Category of Study"
      return-object
      outlined
      density="compact"
    ></v-select>
    <v-select 
      :items="areas_of_study"
      item-text="name"
      item-value="id"
      v-model="categoryName"
      label="Areas of Study"
      return-object
      outlined
      density="compact"
    ></v-select>
    <v-select 
      :items="years"   
      label="Years"
      density="compact"
    ></v-select>
  </div>
        <div>
    <v-file-input
        id="file"
        ref="file"
        @change="onChangeFileUpload"
        :label="'Upload Research'"
        type="file"
        accept=".pdf">
    </v-file-input>
    <div id="upload">
          <v-btn variant="outlined" @click="handleFileUpload">
            Upload research
          </v-btn>
        </div>
        <v-form v-model="valid">
    <v-container>
          <v-text-field
            v-model="title"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="description"
            label="Description"
            required
          ></v-text-field>
          <v-text-field
            v-model="category_of_study"
            label="Category of Study"
            required
          ></v-text-field>
          <v-text-field
            v-model="area_of_study"
            label="Area of Study"
            required
          ></v-text-field>
          <v-text-field
            v-model="specialization"
            label="Specialization"
            required
          ></v-text-field>
          <v-text-field
            v-model="year_of_research"
            label="Year of "
            required
          ></v-text-field>
    </v-container>
  </v-form>
  </div>
      </v-navigation-drawer> -->

      <v-main style="min-height: 300px;" ><br/>
        <div v-for="upload in uploads" v-bind:key="upload.id">
          <v-card 
          class="mx-auto tw-px-2 md:tw-px-4 tw-py-2 md:tw-py-4 tw-mt-4 md:tw-mt-4"
          width="80%">
            <v-card-item >
              <div>
                <div class="text-overline mb-1">
                  {{ upload.title }}
                </div>
                <div class="text-h6 mb-1">
                  {{ upload.description }}
                </div>
                <div class="text-caption">{{ upload.category_of_study }}</div>
                <div class="text-caption">{{ upload.area_of_study }}</div>
                <div class="text-caption">{{ upload.specialization }}</div>
                <div class="text-caption">{{ upload.year_of_research }}</div>
              </div>
            </v-card-item>
            <v-card-actions>
              <v-btn variant="outlined" @click="download(upload.unique_filename)">
                Download
              </v-btn>
            </v-card-actions>
          </v-card><br/>
        </div>
      </v-main>
     
    </v-layout>
  </v-card>
  
    
  </div>
</template>

<script>
import axios from 'axios';

const BASE_URL = "https://sea-lion-app-tg26l.ondigitalocean.app"

export default {
  data() {
    return {
      uploads: [],
      categories: [],
      areas_of_study: [],
      categoryName: null,
      areaOfStudyName: null,
      years: ["2000", "2010", "2019"]
    };
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get(
          `${BASE_URL}/uploads`
        );
        // JSON responses are automatically parsed.
        this.uploads = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories(){
      try {
        const response = await axios.get(
          `${BASE_URL}/categories`
        );
        this.categories = response.data;
      } catch (error) {
        console.log(error)
      }

  },
  async getAreasOfStudy(){
      try {
        const response = await axios.get(
          `${BASE_URL}/areas_of_study`
        );
        this.areas_of_study = response.data;
      } catch (error) {
        console.log(error)
      }

  },
  onChangeFileUpload(){
        this.file = this.$refs.file.files[0];
      },
  handleFileUpload() {
    let formData = new FormData();
            formData.append('file', this.file);
  
            axios.post(`${BASE_URL}/upload`,
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(data){
              console.log(data.data);
            })
            .catch(function(){
              console.log('FAILURE!!');
            });
  },
  download(file_name){
    axios({
      url: `${BASE_URL}/download?file_name=${file_name}`,
      method: 'GET',
      responseType: 'blob',
  }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', file_name);
        document.body.appendChild(fileLink);

        fileLink.click();
  });
  }
  },

  created() {
    this.getData();
    this.getCategories();
    this.getAreasOfStudy();
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
