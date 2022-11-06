<template>
  <form id="signup-form">
    <div class="row">
      <div class="col-12 form-group">
        <input
          type="text"
          required
          v-model.trim="username"
          placeholder="username"
          class="form-control form-control-lg"
          @blur="validateUsername"
        />
      </div>
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
          @blur="validatePassword"
        />
      </div>
      <div class="col-12 form-group text-center">
        <button
          class="btn btn-vue btn-lg col-4"
          v-on:click="someAction($event)"
        >
          Registrar
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "RegisterPage",
  data: function () {
    return {
      username: "",
      email: "",
      password: "",
      role: "user",
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
    validateUsername: function () {
      if (this.username.length < 6) {
        this.username = "";
        alert("Username inválido");
      }
    },
    async someAction(e) {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3001/register", {
          email: this.email,
          password: this.password,
          username: this.username,
          role: this.role,
        });
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          this.$router.push("/admin");
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao registrar, Email já registrado");
      }
    },
  },
};
</script>
