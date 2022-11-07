<template>
  <form>
    <div>
      <div>
        <input
          type="text"
          required
          v-model.trim="username"
          placeholder="Nome"
          @blur="validateUsername"
        />
      </div>
      <div>
        <input
          type="email"
          required
          v-model.trim="email"
          placeholder="Email"
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
          @blur="validateCep"
        />
        <input
          type="text"
          required
          v-model.trim="street"
          placeholder="Rua"
          @blur="validateStreet"
        />
        <input
          type="text"
          required
          v-model.trim="district"
          placeholder="Bairro"
          @blur="validateDistrict"
        />
        <input
          type="text"
          required
          v-model.trim="city"
          placeholder="Cidade"
          @blur="validateCity"
        />
        <input
          type="text"
          required
          v-model.trim="state"
          placeholder="Estado"
          @blur="validateState"
        />
        <input
          type="text"
          required
          v-model.trim="country"
          placeholder="País"
          @blur="validateCountry"
        />
      </div>
      <div>
        <button v-on:click="InsertClient($event)">Inserir Cliente</button>
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
      street: "",
      district: "",
      city: "",
      state: "",
      country: "",
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
      this.street = result.data.logradouro;
      this.district = result.data.bairro;
      this.city = result.data.localidade;
      this.state = result.data.uf;
      this.country = "Brasil";
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
    validateStreet: function () {
      if (this.street.length < 3) {
        this.street = "";
        alert("Rua inválida");
      }
    },
    validateDistrict: function () {
      if (this.district.length < 3) {
        this.district = "";
        alert("Bairro inválido");
      }
    },
    validateCity: function () {
      if (this.city.length < 3) {
        this.city = "";
        alert("Cidade inválida");
      }
    },
    validateState: function () {
      if (this.state.length < 2) {
        this.state = "";
        alert("Estado inválido");
      }
    },
    validateCountry: function () {
      if (this.country.length < 3) {
        this.country = "";
        alert("País inválido");
      }
    },
    async InsertClient(e) {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3001/admin", {
          email: this.email,
          username: this.username,
          role: this.role,
          relationship: this.relationship,
          address: {
            cep: this.cep,
            street: this.street,
            district: this.district,
            city: this.city,
            state: this.state,
            country: this.country,
          },
        });
        this.email = "";
        this.username = "";
        this.role = "client";
        this.relationship = "";
        this.cep = "";
        this.street = "";
        this.district = "";
        this.city = "";
        this.state = "";
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
