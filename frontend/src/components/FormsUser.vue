<template>
  <form>
    <div class="input-container">
      <div class="input">
        <div>
          <input
            type="text"
            required
            v-model.trim="username"
            placeholder="Nome e Sobrenome"
            @blur="validateUsername"
          />
        </div>
        <div>
          <input
            type="email"
            required
            :disabled="isEmailDisabled"
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
      <div class="input">
        <button v-on:click="InsertClient($event)" :disabled="isDisabled">
          Inserir Cliente
        </button>
      </div>
    </div>
  </form>
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Parentesco</th>
        <th>Editar</th>
        <th>Excluir</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.username }}</td>
        <td>{{ client.email }}</td>
        <td>{{ client.relationship }}</td>
        <td>
          <button v-on:click="UpdateClient(client)">Editar</button>
        </td>
        <td>
          <button v-on:click="DeleteClient(client.id)">Deletar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import "./FormsUser.css";
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
      clients: [],
      emailDisabled: false,
    };
  },
  computed: {
    isDisabled() {
      return (
        this.email === "" ||
        this.username === "" ||
        this.relationship === "" ||
        this.cep === "" ||
        this.street === "" ||
        this.district === "" ||
        this.city === "" ||
        this.state === "" ||
        this.country === ""
      );
    },
    isEmailDisabled() {
      return this.emailDisabled;
    },
  },
  async created() {
    const response = await axios.get("http://localhost:3001/admin");
    this.clients = response.data;
  },
  methods: {
    UpdateClient: function (client) {
      const proxy1 = new Proxy(client, {});
      const result = JSON.parse(JSON.stringify(proxy1));
      this.username = result.username;
      this.email = result.email;
      this.relationship = result.relationship;
      this.emailDisabled = true;
    },
    DeleteClient: async function (id) {
      await axios.delete(`http://localhost:3001/admin/${id}`);
      this.clients = this.clients.filter((i) => i.id !== id);
    },
    validateCep: async function () {
      const re = /\d{5}\d{3}/;
      if (!re.test(this.cep)) {
        setTimeout("alert('CEP inválido');", 1000);
        this.cep = "";
      }
      const result = await axios.get(
        `http://viacep.com.br/ws/${this.cep}/json/`
      );
      if (!result.data.logradouro) {
        setTimeout("alert('Dados Inválidos ou Cliente já cadastrado');", 1000);
      }
      this.street = result.data.logradouro;
      this.district = result.data.bairro;
      this.city = result.data.localidade;
      this.state = result.data.uf;
      this.country = "Brasil";
    },
    validateEmail: function () {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(this.email)) {
        setTimeout("alert('Email inválido');", 1000);
        this.email = "";
      }
    },
    validateUsername: function () {
      if (this.username.length < 6) {
        setTimeout(
          "alert('Nome inválido, necessário Nome e Sobrenome');",
          1000
        );
        this.username = "";
      }
    },
    validateRelationship: function () {
      if (this.relationship.length < 3) {
        setTimeout("alert('Parentesco inválido');", 1000);
        this.relationship = "";
      }
    },
    validateStreet: function () {
      if (this.street.length < 3) {
        setTimeout("alert('Rua inválida');", 1000);
        this.street = "";
      }
    },
    validateDistrict: function () {
      if (this.district.length < 3) {
        setTimeout("alert('Bairro inválida');", 1000);
        this.district = "";
      }
    },
    validateCity: function () {
      if (this.city.length < 3) {
        setTimeout("alert('Cidade inválida');", 1000);
        this.city = "";
      }
    },
    validateState: function () {
      if (this.state.length < 2) {
        setTimeout("alert('Estado inválido');", 1000);
        this.state = "";
      }
    },
    validateCountry: function () {
      if (this.country.length < 3) {
        setTimeout("alert('País inválido');", 1000);
        this.country = "";
      }
    },
    async InsertClient(e) {
      e.preventDefault();
      try {
        const isUpdated = this.clients.find((i) => i.email === this.email);
        console.log(isUpdated);
        if (isUpdated) {
          const client = {
            email: this.email,
            username: this.username,
            role: this.role,
            relationship: this.relationship,
            addressId: isUpdated.addressId,
            address: {
              cep: this.cep,
              street: this.street,
              district: this.district,
              city: this.city,
              state: this.state,
              country: this.country,
            },
          };
          await axios.put(`http://localhost:3001/admin/1`, client);
          const test = this.clients.filter((i) => i.id !== isUpdated.id);
          test.push(client);
          this.clients = test;
          this.emailDisabled = false;
          window.location.reload();
        } else {
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
          const updateClients = await axios.get("http://localhost:3001/admin");
          this.clients = updateClients.data;
          if (response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
            this.$router.push("/admin");
          }
        }
      } catch (error) {
        console.log(error);
        alert("Email ou senha inválidos");
      }
    },
  },
};
</script>
