<template>
  <q-page-container>
    <q-page padding>
      <div  class="row justify-center">
        <h1 class="col-12 column text-center justify-center">
          Support
        </h1>
      </div>
      <div class="row ">
        <div class="col-6 column items-center ">
          <h2>Chat with us</h2>
          <div>
            <input type="text" placeholder="Say anything to begin the chat...">
          </div>
        </div>
        <div class="col-6 column items-center">
          <h2>Telephones</h2>
          <ul>
            <li>9090-9090</li>
            <li>8080-8080</li>
            <li>7070-7070</li>
            <li>6060-6060</li>
            <li>5050-5050</li>
          </ul>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
export default {
  name: 'SupportPage',
}
</script>

<style scoped>

input[type = text] {
  width: 200px;
  border-radius: 5px;
  border: 1px solid black;
}

</style>
