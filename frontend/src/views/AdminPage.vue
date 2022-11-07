<template>
  <HeaderPage />
  <FormsUser />
</template>
<script>
import HeaderPage from "../components/HeaderPage.vue";
import FormsUser from "../components/FormsUser.vue";
export default {
  name: "AdminPage",
  components: {
    HeaderPage,
    FormsUser,
  },
  data: function () {
    return {};
  },
  methods: {},
};
</script>
