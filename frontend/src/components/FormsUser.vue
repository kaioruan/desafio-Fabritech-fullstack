<template>
  <form>
    <div>
      <div>
        <input
          type="text"
          required
          v-model.trim="username"
          placeholder="Nome"
          class="form-control form-control-lg"
          @blur="validateUsername"
        />
      </div>
      <div>
        <input
          type="email"
          required
          v-model.trim="email"
          placeholder="Email"
          class="form-control form-control-lg"
          @blur="validateEmail"
        />
      </div>
      <div>
        <select v-model.trim="relationship" @blur="validateRelationship">
          <option value="">Parentesco</option>
          <option value="Pai/Mãe">Pai/Mãe</option>
          <option value="Irmão/Irmã">Irmão/Irmã</option>
          <option value="Filho/Filha">Filho/Filha</option>
          <option value="cônjuge">cônjuge</option>
          <option value="Neto/Neta">Neto/Neta</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          required
          maxlength="8"
          oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          v-model.trim="cep"
          placeholder="CEP"
          class="form-control form-control-lg"
          @blur="validateCep"
        />
      </div>
      <div class="col-12 form-group text-center">
        <button
          class="btn btn-vue btn-lg col-4"
          v-on:click="InsertClient($event)"
        >
          Inserir Cliente
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
export default {
  name: "FormsUser",
  data: function () {
    return {
      username: "",
      email: "",
      role: "client",
      relationship: "",
      cep: "",
    };
  },
  created() {
    console.log("Component created.");
  },
  methods: {
    validateCep: async function () {
      const re = /\d{5}\d{3}/;
      if (!re.test(this.cep)) {
        alert("CEP inválido");
      }
      const result = await axios.get(
        `http://viacep.com.br/ws/${this.cep}/json/`
      );
      console.log(result.data);
    },
    validateEmail: function () {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(this.email)) {
        this.email = "";
        alert("Email inválido");
      }
    },
    validateUsername: function () {
      if (this.username.length < 6) {
        this.username = "";
        alert("Nome inválido");
      }
    },
    validateRelationship: function () {
      if (this.relationship.length < 3) {
        this.relationship = "";
        alert("Parentesco inválido");
      }
    },
    async someAction(e) {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3001/admin", {
          email: this.email,
          username: this.username,
          role: this.role,
          relationship: this.relationship,
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
