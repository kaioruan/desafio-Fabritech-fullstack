<template>
  <div class="Login_container">
    <form class="Form_container">
      <div class="form">
        <div>
          <input
            type="email"
            required
            v-model.trim="email"
            placeholder="Email"
            class="input"
            @blur="validateEmail"
          />
        </div>
        <div class="col-12 form-group">
          <input
            type="password"
            v-model.trim="password"
            placeholder="Password"
            required
            class="input"
          />
        </div>
        <div>
          <button
            class="Login_btn"
            v-on:click="someAction($event)"
            :disabled="isDisabled"
          >
            Logar
          </button>
        </div>
        <div>
          <button class="Login_btn">
            <a href="/register">Cadastre-se</a>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import "./LoginPage.css";
import axios from "axios";
export default {
  name: "LoginPage",
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      const verify = axios.get("http://localhost:3001/login/validate", {
        headers: {
          Authorization: token,
        },
      });
      if (verify) {
        this.$router.push("/admin");
      }
    }
  },
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    isDisabled() {
      return this.email === "" || this.password === "";
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
