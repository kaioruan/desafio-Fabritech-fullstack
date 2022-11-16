<template>
  <form class="Register_container">
    <div class="Form_container_Register">
      <div class="form_Register">
        <input
          type="text"
          required
          v-model.trim="username"
          placeholder="Nome e Sobrenome"
          class="input_Register"
          @blur="validateUsername"
        />
      </div>
      <div>
        <input
          type="email"
          required
          v-model.trim="email"
          placeholder="Email"
          class="input_Register"
          @blur="validateEmail"
        />
      </div>
      <div>
        <input
          type="password"
          v-model.trim="password"
          placeholder="Password"
          required
          class="input_Register"
          @blur="validatePassword"
        />
      </div>
      <div>
        <button
          class="Register_btn"
          v-on:click="someAction($event)"
          :disabled="isDisabled"
        >
          Registrar
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import "./RegisterPage.css";
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
  computed: {
    isDisabled() {
      return (
        this.email === "" || this.password.length < 6 || this.username === ""
      );
    },
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
