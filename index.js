let vm = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  components: {
    "hideable-text": {
      data: function () {
        return { show: false }
      },
      template: "<span><template v-if='show'><slot></slot></template><v-btn @click='show = !show' icon><v-icon color='grey'>{{ show ? 'mdi-eye-off' : 'mdi-eye' }}</v-icon></v-btn></span>"
    }
  },
  data: {
    tab: 0,
    groupsearch: "",
    groupresults: [],
  },
  computed: {
    loaded: function () {
      return this.groupresults.length > 0;
    },
  },
  mounted: function () {
    let req = new Request("a2results.json");
    fetch(req)
    .then(resp => resp.json())
    .then(jsonresp => { this.groupresults = jsonresp; });
  },
  methods: {
    filtergroup: function (items, search) {
      if (search !== "") {
        search = search.toLowerCase();
        return items.filter(item => {
          let checks = [String(item.group).includes(search)];
          checks = checks.concat(item.students.map(it => {
            return it.name.toLowerCase().includes(search) || String(it.id).includes(search);
          }));
          return checks.some(it => it);
        })
      } else { return items; }
    },
  }
});
