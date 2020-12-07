<template>
  <div>

    <!--Template/HTML here -->
    <div class="alert alert-danger" v-show="errors.length > 0">
      <ul>
        <li v-for="error in errors" v-bind:key="error">
          {{error}}
        </li>
      </ul>
    </div>


    <div class="card add-student m-2 p-2">
      <h4 class="card-title">Add new student</h4>

      <div class="form-group">
        <label for="name">Name</label>
        <!-- v-model newStudentName -->
        <input id="name" class="form-control" v-model.trim="newStudentName">
      </div>
      <div class="form-group">
        <label for="starID">Star ID</label>
        <!-- v-model newStarID -->
        <input id="starID" class="form-control" v-model.trim="newStarId">
      </div>
      <!-- v-on:click event handler -->
      <button class="btn btn-primary" v-on:click="addStudent">Add</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "NewStudentForm",
  data() {
    return {
      newStudentName: '',
      newStarId: '',
      errors: []
    }
  },
  methods: {
    addStudent() {

      this.errors = []

      if (!this.newStudentName) {
        this.errors.push("Student name is required")}
      if (!this.newStarId) {
        this.errors.push("StarID is required")}
      if (this.errors.length == 0) {
        let student = {name: this.newStudentName, starID: this.newStarId, present: false}

        this.$emit('student-added', student)
      } //end of validation
      this.newStudentName = ''
      this.newStarId = ''
    }, //end of addStudent()
  }
}
</script>

<style scoped>

</style>