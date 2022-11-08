<template>
  <form class="Login_container">
    <div class="Form_container">
      <div class="form">
        <input
          type="text"
          required
          v-model.trim="username"
          placeholder="username"
          class="input"
          @blur="validateUsername"
        />
      </div>
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
      <div>
        <input
          type="password"
          v-model.trim="password"
          placeholder="Password"
          required
          class="input"
          @blur="validatePassword"
        />
      </div>
      <div>
        <button
          class="Login_btn"
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
      return this.email === "" || this.password === "" || this.username === "";
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

<style scoped>
.Login_container {
  align-items: center;
  background-color: #282c34;
  display: flex;
  font-size: 1.1rem;
  justify-content: center;
  min-height: 100vh;
}

.Form_container {
  background-color: white;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 15px;
  height: 200px;
  width: 400px;
}

.form {
  display: flex;
  flex-direction: column;
}

.input {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
}

.Login_btn {
  background-color: #285467;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 10px 0;
  transition: 0.2s;
  width: 100%;
}
.Login_btn:disabled {
  background-color: #282c34;
  border: none;
  border-radius: 5px;
  color: #ccc;
  pointer-events: none;
}

.Login_btn:hover {
  transform: scale(1.05);
}
</style>
