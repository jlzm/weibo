<style>
</style>

<template>
    <div>
        <form @submit.prevent="addItem()" action="">
            <div>
                <label for="">属性</label>
                <input type="text" v-model="current.type">
            </div>
            {{current.type}}
            <div>
                <label for="">内容</label>
                <input type="text" v-model="current.content">
            </div>
            {{current.content}}
            <button type="submit">提交</button>
        </form>
        <Table stripe :columns="columns" :data="allList.notice_tpl"></Table>
        内容{{this.allList && this.allList.notice_tpl}}
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
        console.log("this.columns:", this.columns);
    },
    methods: {
        submit() {
            this.addItem();
        }
        // show(index) {
        //     this.$Modal.info({
        //         title: "模板信息",
        //         content: `属性：${
        //             this.allList.notice_tpl[index].type
        //         }<br>内容：${this.allList.notice_tpl[index].content}`
        //     });
        // },
        // remove(index) {
        //     this.removeItem(this.allList.notice_tpl[index].id);
        // },
        // modify(index) {
        //     this.current = this.allList.notice_tpl[index];
        // },
        // addItem() {
        //     let action = this.current.id ? 'update' : 'create';

        //     api.api(`notice_tpl/${action}`, this.current).then(res => {
        //         this.current = {};
        //         this.gReadInfo("notice_tpl");
        //     });
        // },
        // readItems() {
        //     this.gReadInfo("notice_tpl");
        // },
        // removeItem(id) {
        //     api
        //         .api("notice_tpl/delete", {
        //             id: id
        //         })
        //         .then(res => {
        //             this.readItems();
        //         });
        // }
    }
};
</script>
