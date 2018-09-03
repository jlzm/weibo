<style>
</style>

<template>
    <div>
        <form @submit.prevent="addItem()" action="">
            <div>
                <label for="">属性</label>
                <input type="text" v-model="current.type">
            </div>
            <div>
                <label for="">内容</label>
                <input type="text" v-model="current.content">
            </div>
            <button type="submit">提交</button>
        </form>
        <Table stripe :columns="columns" :data="allList.notice_tpl"></Table>
    </div>
</template>

<script>
import api from "../../lib/api";
import GReadInfo from "../../mixins/GReadInfo";
import AdminPage from "../../mixins/AdminPage";

export default {
    mixins: [AdminPage, GReadInfo],
    created() {
        this.columns = this.tableTitle.concat(this.operationBtn);
    },
    data() {
        return {
            model: 'notice_tpl',
            tableTitle: [
                {
                    title: "属性",
                    key: "type"
                },
                {
                    title: "内容",
                    key: "content"
                },
            ],
            columns: this.columns,
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
                title: "模板详情",
                content: `属性：${
                    this.allList[this.model][index].type
                }<br>内容：${this.allList[this.model][index].content}`
            });
        },
    }
};
</script>
