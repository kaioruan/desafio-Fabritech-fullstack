<template>
  <form id="signup-form">
    <div class="row">
      <div class="col-12 form-group">
        <input
          type="email"
          required
          v-model.trim="email"
          placeholder="Email"
          class="form-control form-control-lg"
          @blur="validateEmail"
        />
      </div>
      <div class="col-12 form-group">
        <input
          type="password"
          v-model.trim="password"
          placeholder="Password"
          required
          class="form-control form-control-lg"
        />
      </div>
      <div class="col-12 form-group text-center">
        <button
          class="btn btn-vue btn-lg col-4"
          v-on:click="someAction($event)"
        >
          Logar
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    validateEmail: function () {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(this.email)) {
        this.email = "";
        alert("Email inválido");
      }
    },
    validatePassword: function () {
      if (this.password.length < 6) {
        this.password = "";
        alert("Senha inválida");
      }
    },
    async someAction(e) {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3001/login", {
          email: this.email,
          password: this.password,
        });
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.$router.push("/admin");
        }
      } catch (error) {
        console.log(error);
        alert("Email ou senha inválidos");
      }
    },
  },
};
</script>
