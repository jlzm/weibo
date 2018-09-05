
<script>
// 依赖
import api from "../lib/api";
import session from "../lib/session";

export default {
    data() {
        return {
            count: {},
            allList: {},
            weiboNumber: 0,
            followerNumber: 0,
            targetNumber: 0,
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
            api
                .api("weibo/read", {
                    with: [
                        {
                            relation: "belongs_to",
                            model: "user"
                        }
                    ]
                })
                .then(res => {
                    this.$set(this.allList, "weibo", res.data);
                    this.getAllLikeCount(res.data);
                    this.getAllReplyCount(res.data);
                    this.getAllRelayCount(res.data);
                    this.weiboNumber = 0;
                    if (this.uinfo) {
                        this.allList.weibo.forEach(item => {
                            if (item.user_id == this.uinfo.id) {
                                this.weiboNumber++;
                            }
                        });
                    }
                });
        },

        // 渲染关注人微博
        readFollowerWeibo() {
            api
                .api("weibo/read", {
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
                })
                .then(res => {
                    this.$set(this.allList, "weibo", res.data);
                    this.getAllLikeCount(res.data);
                    this.getAllReplyCount(res.data);
                    this.getAllRelayCount(res.data);
                    this.weiboNumber = 0;
                    this.allList.weibo.forEach(item => {
                        if (item.user_id == this.uinfo.id) {
                            this.weiboNumber++;
                        }
                    });
                });
        },

        // 获取个人微博
        readPersonalWeibo() {
            api
                .api("weibo/read", {
                    where: [["user_id", "=", this.uinfo.id]],
                    with: [
                        {
                            relation: "belongs_to",
                            model: "user"
                        }
                    ]
                })
                .then(res => {
                    this.$set(this.allList, "weibo", res.data);
                    this.getAllLikeCount(res.data);
                    this.getAllReplyCount(res.data);
                    this.getAllRelayCount(res.data);
                    this.weiboNumber = 0;
                    res.data.forEach(item => {
                        if (item.user_id == this.uinfo.id) {
                            this.weiboNumber++;
                        }
                    });
                });
        },

        // 渲染赞数
        getAllLikeCount(weiboList) {
            api.api("_bind__user_weibo/read").then(res => {
                weiboList.forEach(item => {
                    let likeList = [];
                    res.data.forEach(like => {
                        if (like.weibo_id == item.id) {
                            likeList.push(like);
                            this.$set(item, "collectList", likeList);
                        }
                    });
                });
            });
        },

        // 渲染转发数
        getAllRelayCount(weiboList) {
            weiboList.forEach(item => {
                let relayList = [];
                weiboList.forEach(relay => {
                    if (relay.relay_id == item.id) {
                        relayList.push(relay);
                        this.$set(item, "relayList", relayList);
                    }
                });
            });
        },

        // 获取评论数量
        getAllReplyCount(weiboList) {
            api.api("comment/read").then(res => {
                weiboList.forEach(item => {
                    let commentList = [];
                    res.data.forEach(comment => {
                        if (comment.weibo_id == item.id) {
                            commentList.push(comment);
                            this.$set(item, "commentCount", commentList);
                        }
                    });
                });
            });
        },

        // 渲染推荐用户
        readSuggestedUser() {
            api.api("user/read").then(res => {
                this.$set(this.allList, "user", res.data);
            });
        },
        // 渲染粉丝
        readTargetUser() {
            return api
                .api("_bind__user_user/read", {
                    where: {
                        target_id: this.uinfo.id
                    }
                })
                .then(res => {
                    this.targetNumber = (res.data && res.data.length) || 0;
                });
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
