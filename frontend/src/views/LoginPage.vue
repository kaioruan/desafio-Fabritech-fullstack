<template>
  <div class="Login_container">
    <form class="Form_container">
      <div class="form">
        <div class="col-12 form-group">
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
          <button class="Login_btn" v-on:click="someAction($event)">
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

a {
  color: white;
  text-decoration: none;
}
</style>
