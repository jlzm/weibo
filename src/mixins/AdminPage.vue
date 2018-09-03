<script>
import api from "../lib/api";
export default {
    data() {
        return {
            allList: {},
            current: {},
            operationBtn: [
                {
                    title: "编辑",
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
        remove(index) {
            this.removeItem(this.allList[this.model][index].id);
        },
        modify(index) {
            this.current = this.allList[this.model][index];
        },
        addItem() {
            let action = this.current.id ? "update" : "create";

            api.api(`${this.model}/${action}`, this.current).then(res => {
                this.readItems();
            })
        },
        readItems() {
            api.api(`${this.model}/read`).then(res => {
                this.$set(this.allList, this.model, res.data);
            })
        },
        removeItem(id) {
            api
                .api(`${this.model}/delete`, {
                    id: id
                })
                .then(res => {
                    this.readItems(this.model);
                })
        }
    }
};
</script>