<template>
  <div class="pages">
    <ul class="pages-num">
      <li v-if="startPage > 1" @click="changePage(1)">
        <i>
          <fa icon="long-arrow-alt-left" />
        </i>
      </li>
      <li
        v-for="p in endPage"
        v-if="p >= startPage"
        :key="p"
        :class="{ selected: p === selectedPage }"
        @click="changePage(p)"
      >
        {{ p }}
      </li>
      <li v-if="endPage < totalPages" @click="changePage(totalPages)">
        <i>
          <fa icon="long-arrow-alt-right" />
        </i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AmPagination',
  props: {
    totalPages: { type: Number, default: 1 },
    selectedPage: { type: Number, default: 1 }
  },

  computed: {
    needExtraPagination() {
      return this.totalPages - this.selectedPage > 9
    },

    startPage() {
      let minor = this.selectedPage
      if (this.totalPages - this.selectedPage < 3) minor = this.totalPages - 6
      else minor = this.selectedPage - 3

      if (minor < 1) minor = 1

      return minor
    },

    endPage() {
      let mayor = this.selectedPage

      if (this.selectedPage > 3) mayor = this.selectedPage + 3
      else mayor = 7

      if (mayor > this.totalPages) {
        mayor = this.totalPages
      }
      return mayor
    }
  },

  methods: {
    changePage(page) {
      const query = { ...this.$route.query }
      query.page = page

      this.$router.push({
        path: this.$route.path,
        query: query
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pages {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      border: solid 1.5px transparent;
      border-radius: 5px;
      color: var(--color-purple-dark);
      margin: 0;
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      font-size: 1.2em;
      justify-content: center;

      &:hover {
        color: var(--color-orange);
        border: solid 1.5px var(--color-orange);
        cursor: pointer;
      }

      &.selected {
        border: solid 1.5px var(--color-orange);
      }

      i {
        color: var(--color-gray);
      }
    }
  }
}
</style>
