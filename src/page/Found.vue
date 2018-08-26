<style scoped>
.main {
    display: flex;
}

.main-middle {
    padding: 0 10px;
}

.sidebar-router-item a {
    display: block;
    color: #000;
    font-size: 1rem;
    padding: 7px 10px;
}

.sidebar-router-item:hover {
    background: #7fb9db;
}

/* 发布微博 */

/* 额外信息 */
.extras li {
    margin-right: 15px;
}

.icon-mgr {
    font-style: normal;
    padding-right: 4px;
}

/* 个人信息卡片 */
.user-bg {
    position: relative;
}

/* 头像缩略图 */

.head-portrait {
    border-radius: 50%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
}

.head-portrait {
    position: absolute;
    height: 74px;
    width: 74px;
    left: 35%;
    bottom: -20px;
    border: 3px solid #fff;
}

.head-portrait img {
    min-height: 100%;
}

.user-intro {
    padding-top: 30px;
}

.user-title-wrap {
    padding-bottom: 10px;
}

/* iview样式重置 */
</style>

<template>
    <div>
        <Header defRouter="/found" />
        <Row class="main">
            <!-- <Col span="6"></Col> -->
            <Col :lg="12" :md="16" :sm="20" :xs="24" class="container">
            <Row :gutter="14">
                <Col :md="7" :sm="7" :xs="24" class="main-right">
                <Card class="card-mgb">
                    <div class="user-intro-wrap">
                        <div class="user-bg">
                            <img src="http://placekitten.com/230/75" alt="">
                            <router-link v-if="uinfo" to="/PersonalPage" class="head-portrait">
                                <!-- <img src="http://placekitten.com/230/75" alt=""> -->
                            </router-link>
                            <router-link v-else to="/signIn" class="head-portrait">
                                <!-- <img src="http://placekitten.com/230/75" alt=""> -->
                            </router-link>
                        </div>
                        <div class="user-intro tac">
                            <div class="user-title-wrap">
                                <router-link v-if="uinfo" to="/signIn">
                                    <span class="title">{{uinfo.username}}</span>
                                </router-link>
                                <span v-else>
                                    <router-link to="/signIn">登入</router-link>
                                </span>
                            </div>
                            <Row v-if="uinfo" class="user-atten">
                                <Col span="8">
                                <a href="#">
                                    <p>999</p>
                                    <span>关注</span>
                                </a>
                                </Col>
                                <Col span="8">
                                <a href="#">
                                    <p>999</p>
                                    <span>微博</span>
                                </a>
                                </Col>
                                <Col span="8">
                                <a href="#">
                                    <p>999</p>
                                    <span>粉丝</span>
                                </a>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card>
                </Col>
                <Col :md="17" :sm="17" :xs="24" class="main-middle">
                <Row class="weibo-items">
                    <WeiboItem v-for="(item, index) in allList.weibo" :key="index" :weiboList="allList.weibo" :weibo="item" :readFollowerWeibo="readFollowerWeibo" />
                </Row>
                </Col>

            </Row>
            </Col>
            <!-- <Col span="6"></Col> -->
        </Row>
        <!-- <Footer/> -->
    </div>
</template>

<script>
// 组件
import WeiboItem from "../components/WeiboItem";
import Header from "../components/Header";
import Footer from "../components/Footer";

// mixin
import GReadInfo from "../mixins/GReadInfo";

// 依赖
import api from "../lib/api";
import session from "../lib/session";

export default {
    mixins: [GReadInfo],
    components: {
        Header,
        WeiboItem,
        Footer
    },
    data() {
        return {
            allList: {},
            itemList: {
                follower: []
            },
            weiboContent: {},
            uinfo: session.uinfo()
        };
    },
    mounted() {
        // this.readSuggestedUser();
        this.readPublicWeibo();
        // this.readFollowerWeibo()
    },
    methods: {
        // 发布微博
        publishWeibo() {
            this.weiboContent.time = this.getCurrentTime();
            this.weiboContent.user_id = this.uinfo.id;
            api.api("weibo/create", this.weiboContent).then(res => {
                this.weiboContent = {};
                // this.allList.weibo.push(res.data);
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
        // 渲染推荐用户
        readSuggestedUser() {
            this.gReadInfo("user", this.allList);
        },
        // 关注某用户
        follower(userId) {
            if (!this.uinfo) {
                this.$router.push("/signIn");
                return;
            }
            api
                .api("user/bind", {
                    model: "user",
                    glue: {
                        [this.uinfo.id]: userId
                    }
                })
                .then(res => {
                    this.readFollowerUser();
                });
        },
        // 取关某用户
        unfollower(userId) {
            api
                .api("user/unbind", {
                    model: "user",
                    glue: {
                        [this.uinfo.id]: userId
                    }
                })
                .then(res => {
                    this.readFollowerUser();
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
                    // this.$set(this.allList, 'follower', res.data.$user);
                    this.itemList.follower = res.data.$user;
                });
        },
        // 判断是否关注
        hasFollower(targetId) {
            if (!this.itemList.follower) return false;
            return !!this.itemList.follower.find(item => {
                return item.id == targetId;
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
        // 获取当前时间
        getCurrentTime() {
            let date = new Date();
            let y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate(),
                h = date.getHours(),
                min = date.getMinutes(),
                s = date.getSeconds();
            if (date.getMonth() < 10) {
                m = "0" + m;
            }
            if (date.getDate() < 10) {
                d = "0" + d;
            }
            if (date.getHours() < 10) {
                h = "0" + h;
            }
            if (date.getMinutes() < 10) {
                min = "0" + min;
            }
            if (date.getSeconds() < 10) {
                s = "0" + s;
            }
            return `${y}-${m}-${d} ${h}:${min}:${s}`;
        }
    }
};
</script>
