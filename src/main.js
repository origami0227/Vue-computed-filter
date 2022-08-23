// 引用完整版 Vue，方便讲解
import Vue from "vue/dist/vue.js";

Vue.config.productionTip = false;
let id = 0;
const createUser = (name, gender) => {//封装createUser函数
  id += 1;
  return { id: id, name: name, gender: gender };
};
new Vue({
  data() {
    return {
      users: [
        createUser("方方", "男"),//直接调用封装好的函数
        createUser("圆圆", "女"),
        createUser("小新", "男"),
        createUser("小葵", "女")
      ],
      gender: ""
    };
  },
  computed: {//使用计算属性
    displayUsers() {
      const hash = {
        male: "男",
        female: "女"
      };
      const { users, gender } = this;//析构赋值
      if (gender === "") {
        return users;
      } else if (typeof gender === "string") {
        return users.filter(u => u.gender === hash[gender]);//过滤器，filter不会更改原数组，会新增一个数组，从哈希表里面取到性别
      } else {
        throw new Error("gender 的值是意外的值");
      }
    }
  },
  methods: {
    setGender(string) {
      this.gender = string;
    }
  },

  template: `
    <div>
      <div>
      <button @click="setGender('') ">全部</button>
      <button @click="setGender('male')">男</button>
      <button @click="setGender('female')">女</button></div>
      <ul>
        <li v-for="(u,index) in displayUsers" :key="index">{{u.name}} - {{u.gender}}</li>//Vue里面的for循环，将user里面的每一项命名为u
      </ul>
      
    </div>
  `
}).$mount("#app");
