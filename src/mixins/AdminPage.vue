<script>
import api from "../lib/api";
import GReadInfo from "./GReadInfo";
export default {
    mixins: [GReadInfo],
    data() {
        return {
            current: {},
            operationBtn: [
                {
                    title: "Action",
                    key: "action",
                    width: 300,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index);
                                        }
                                    }
                                },
                                "详情"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.modify(params.index);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index);
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ]
        };
    },
    methods: {
        show(index) {
            this.$Modal.info({
                title: "模板信息",
                content: `属性：${
                    this.allList.notice_tpl[index].type
                }<br>内容：${this.allList.notice_tpl[index].content}`
            });
        },
        remove(index) {
            this.removeItem(this.allList.notice_tpl[index].id);
        },
        modify(index) {
            this.current = this.allList.notice_tpl[index];
        },
        addItem() {
            let action = this.current.id ? "update" : "create";

            api.api(`notice_tpl/${action}`, this.current).then(res => {
                this.gReadInfo("notice_tpl");
            });
        },
        readItems() {
            console.log("1:", 1);

            this.gReadInfo("notice_tpl");
        },
        removeItem(id) {
            api
                .api("notice_tpl/delete", {
                    id: id
                })
                .then(res => {
                    this.readItems();
                });
        }
    }
};
</script>