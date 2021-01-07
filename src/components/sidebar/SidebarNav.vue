<template>
  <!-- begin sidebar nav -->
  <ul class="nav" v-if="menus">
    <li class="nav-search" v-if="pageOptions.pageSidebarSearch">
      <input
        class="form-control"
        placeholder="Sidebar menu filter..."
        type="text"
        v-on:keyup="handleSidebarFilter"
      />
    </li>
    <li class="nav-header">导航菜单</li>
    <template v-for="menu in menus">
      <sidebar-nav-list
        ref="sidebarNavList"
        v-bind:key="menu.path"
        v-bind:menu="menu"
        v-bind:scrollTop="scrollTop"
        v-bind:status="menu.status"
        v-on:collapse-other="handleCollapseOther(menu)"
        v-on:hideFloatSubmenu="handleHideFloatSubmenu"
        v-on:showFloatSubmenu="handleShowFloatSubmenu"
      ></sidebar-nav-list>
    </template>
    <!-- begin sidebar minify button -->
    <li>
      <a class="sidebar-minify-btn" href="javascript:;" v-on:click="handleSidebarMinify()">
        <i class="fa fa-angle-double-left"></i>
      </a>
    </li>
    <!-- end sidebar minify button -->
  </ul>
  <!-- end sidebar nav -->
</template>

<script>
// import SidebarMenu from "./SidebarMenu.vue";
import SidebarNavList from "./SidebarNavList.vue";
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "SidebarNav",
  props: ["scrollTop"],
  components: {
    SidebarNavList,
  },
  data() {
    return {
      menus: [],
      // menus:[],
      pageOptions: PageOptions,
    };
  },
  mounted() {
    this.getMenus();
  },
  methods: {
    getMenus() {
      this.$api.permissions.getPermissions().then((res) => {
        let menu = res.data;
        let navDataArr = [];
        let navData = ['/forAudit', '/costManagement', '/rootMessage', '/liveClassCheck'];
        menu.map((item) => {
          item["title"] = item.autoName;
          delete item["id"];
          delete item["autoName"];
          delete item["parentId"];
          delete item["sort"];
          delete item["uuid"];
          if(item.children.length === 0) delete item["children"];
          if (item.children) {
            item.children.map((items) => {
              if(navData.includes(items.path)) navDataArr.push(items.path);
              items["title"] = items.autoName;
              delete items["children"];
              delete item["id"];
              delete item["autoName"];
              delete item["parentId"];
              delete item["sort"];
              delete item["uuid"];
            });
          }
        });
        this.menus = menu;
        window.sessionStorage.setItem('navDataArr', navDataArr);
      });
    },
    handleShowFloatSubmenu: function (menu, offset) {
      this.$emit("showFloatSubmenu", menu, offset);
    },
    handleHideFloatSubmenu: function () {
      this.$emit("hideFloatSubmenu");
    },
    handleCollapseOther: function (menu) {
      for (var i = 0; i < this.menus.length; i++) {
        this.$refs.sidebarNavList[i].collapse(menu);
      }
    },
    handleSidebarMinify: function () {
      this.pageOptions.pageSidebarMinified = !this.pageOptions
        .pageSidebarMinified;
    },
    handleSidebarFilter: function (e) {
      var value = e.target.value;
      value = value.toLowerCase();

      if (value) {
        for (var x = 0; x < this.menus.length; x++) {
          var title = this.menus[x].title.toLowerCase();
          var children = this.menus[x].children;

          if (title.search(value) > -1) {
            this.$refs.sidebarNavList[x].show();

            if (children) {
              this.$refs.sidebarNavList[x].searchExpand();
            }
          } else {
            if (children) {
              var hasActive = false;
              for (var y = 0; y < children.length; y++) {
                var title2 = children[y].title.toLowerCase();

                if (title2.search(value) > -1) {
                  hasActive = true;
                  this.$refs.sidebarNavList[x].$refs.sidebarNavList[y].show();
                  this.$refs.sidebarNavList[x].searchExpand();
                } else {
                  if (hasActive) {
                    this.$refs.sidebarNavList[x].searchExpand();
                  } else {
                    this.$refs.sidebarNavList[x].hide();
                  }
                  this.$refs.sidebarNavList[x].$refs.sidebarNavList[y].hide();
                }
              }
            } else {
              this.$refs.sidebarNavList[x].hide();
            }
          }
        }
      } else {
        for (var a = 0; a < this.menus.length; a++) {
          this.$refs.sidebarNavList[a].show();

          var submenu = this.menus[a].children;
          if (submenu) {
            for (var b = 0; b < submenu.length; b++) {
              this.$refs.sidebarNavList[a].$refs.sidebarNavList[b].show();
            }
          }
        }
      }
    },
  },
};
</script>
