
<script>
export default {
    methods: {
        // 渲染全部微博
        readPublicWeibo() {
            this.gReadInfo("weibo", this.allList, {
                with: [
                    {
                        relation: "belongs_to",
                        model: "user"
                    }
                ]
            });
        },
        // 渲染关注人微博
        readFollowerWeibo() {
            this.gReadInfo("weibo", this.allList, {
                where: [
                    [
                        "user_id",
                        "in",
                        this.pluck(this.itemList.follower, "id").concat(
                            this.uinfo.id
                        )
                    ]
                ],
                with: [
                    {
                        relation: "belongs_to",
                        model: "user"
                    }
                ]
            });
        },
        pluck(arr, key) {
            const result = [];
            if (!arr) return result;
            arr.forEach(item => {
                result.push(item[key]);
            });

            return result;
        },

    }
};
</script>
