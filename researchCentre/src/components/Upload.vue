<template>
    <div>
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
            label="Year of Research"
            required
          ></v-text-field>
          <v-btn variant="outlined" @click="updateUpload">
            Upload research
          </v-btn>
    </v-container>
  </v-form>
    </div>
</template>

<script>
import axios from axios;


export default {
    name: 'Upload',
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
    async updateUpload() {
        // updateData = {
        //     title: "string",
        //     description: "string",
        //     category_of_study: "string",
        //     area_of_study: "string",
        //     specialization: "string",
        //     year_of_research: "string"
        // }
      try {
        const response = await axios.patch(
          `http://localhost:8000/describe-upload/${upload_id}`, this.$data.form
        );
        // JSON responses are automatically parsed.
        this.upload = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories(){
      try {
        const response = await axios.get(
          "http://localhost:8000/categories"
        );
        this.categories = response.data;
      } catch (error) {
        console.log(error)
      }

  },
  async getAreasOfStudy(){
      try {
        const response = await axios.get(
          "http://localhost:8000/areas_of_study"
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
  
            axios.post('http://localhost:8000/upload',
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
      url: `http://localhost:8000/download?file_name=${file_name}`,
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
    this.updateUpload();
  },
}
</script>