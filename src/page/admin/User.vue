<style>
</style>

<template>
    <div>
        <form @submit.prevent="addItem()" action="">
            <div>
                <label for="">用户名</label>
                <input type="text" v-model="current.username">
            </div>
            <div>
                <label for="">手机号</label>
                <input type="text" v-model="current.phone">
            </div>
            <div>
                <label for="">邮箱</label>
                <input type="text" v-model="current.mail">
            </div>
            <div>
                <label for="">密码</label>
                <input type="text" v-model="current.password">
            </div>
            <button type="submit">提交</button>
        </form>
        <Table stripe :columns="columns" :data="allList.user"></Table>
    </div>
</template>

<script>
import api from "../../lib/api";
import AdminPage from "../../mixins/AdminPage";

export default {
    mixins: [AdminPage],
    created() {
        this.columns = this.tableTitle.concat(this.operationBtn);
    },
    data() {
        return {
            model: "user",
            tableTitle: [
                {
                    title: "用户名",
                    key: "username"
                },
                {
                    title: "手机号",
                    key: "phone"
                },
                {
                    title: "邮箱",
                    key: "mail"
                },
                {
                    title: "密码",
                    key: "password"
                }
            ],
            columns: this.columns
        };
    },
    mounted() {
        this.readItems();
    },
    methods: {
        submit() {
            this.addItem();
        },
        show(index) {
            this.$Modal.info({
                title: "用户详情",
                content: `
                用户名：${this.allList[this.model][index].username || '空'}<br>
                手机号：${this.allList[this.model][index].phone || '空'}<br>
                邮箱：${this.allList[this.model][index].mail || '空'}<br>
                密码：${this.allList[this.model][index].password || '空'}
                `
            });
        }
    }
};
</script>
