
<script>
// 依赖
import api from "../lib/api";
import session from "../lib/session";

export default {
    data() {
        return {
            weiboNumber: 0,
            followerNumber: 0,
            itemList: {
                follower: []
            }
        };
    },
    methods: {
        // 发布微博
        publishWeibo() {
            this.weiboContent.time = this.getCurrentTime();
            this.weiboContent.user_id = this.uinfo.id;
            api.api("weibo/create", this.weiboContent).then(res => {
                this.weiboContent = {};
                this.readFollowerWeibo();
            });
        },
        // 渲染全部微博
        readPublicWeibo() {
            this.gReadInfo("weibo", this.allList, {
                with: [
                    {
                        relation: "belongs_to",
                        model: "user"
                    }
                ]
            }).then(res => {
                this.getLikeWiebo();
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
            }).then(res => {
                this.getLikeWiebo();
                this.weiboNumber = 0;
                this.allList.weibo.forEach(item => {
                    if (item.user_id == this.uinfo.id) {
                        this.weiboNumber++;
                    }
                });
            });
        },
        // 渲染个人微博
        readPersonalWeibo() {
            this.gReadInfo("weibo", this.allList, {
                where: [["user_id", "=", this.uinfo.id]],
                with: [
                    {
                        relation: "belongs_to",
                        model: "user"
                    }
                ]
            }).then(res => {
                this.getLikeWiebo();
                this.weiboNumber = 0;
                this.allList.weibo.forEach(item => {
                    if (item.user_id == this.uinfo.id) {
                        this.weiboNumber++;
                    }
                });
            });
        },
        // 渲染收藏数
        getLikeWiebo() {
            api.api("_bind__user_weibo/read").then(res => {
                console.log("res.data:", res.data);
                this.allList.weibo.forEach(item => {
                    let likeList = [];
                    res.data.forEach(like => {
                        if (like.weibo_id == item.id) {
                            likeList.push(like);
                            this.$set(item, "collectList", likeList);
                        } else {
                            this.$set(item, "collectList", likeList);
                        }
                    });
                });
            });

            // this.allList.weibo.forEach(item => {
            //     api
            //         .api("_bind__user_weibo/read", {
            //             where: {
            //                 weibo_id: item.id
            //             }
            //         })
            //         .then(res => {
            //             this.$set(item, 'collectList', res.data);
            //         });
            // });
        },
        // 渲染推荐用户
        readSuggestedUser() {
            this.gReadInfo("user", this.allList);
        },
        // 渲染关注用户
        readFollowerUser() {
            return api
                .api("user/find", {
                    id: this.uinfo.id,
                    with: [
                        {
                            relation: "belongs_to_many",
                            model: "user"
                        }
                    ]
                })
                .then(res => {
                    // this.$set(this.allList, 'follower', res.data.$user);

                    this.itemList.follower = res.data.$user;

                    if (!res.data.$user || !res.data.$user.length) {
                        this.followerNumber = 0;
                    } else {
                        this.followerNumber = res.data.$user.length;
                    }
                });
        },

        // 获取对象键值
        pluck(arr, key) {
            const result = [];
            if (!arr) return result;
            arr.forEach(item => {
                result.push(item[key]);
            });

            return result;
        }
    }
};
</script>
