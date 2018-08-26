<style scoped>

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

/* 头像缩略图 */

.user-portrait {
    border-radius: 50%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
}

.user-portrait {
    width: 54px;
    height: 54px;
}

.user-portrait img {
    min-height: 100%;
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
        <Header defRouter="/" />
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
                <Row>
                    <Col :md="24" :sm="24" :xs="0">
                    <Card >
                        <p slot="title">
                            <span class="suggested-title">推荐关注</span>
                            <span>刷新</span>
                            <span>全部</span>
                        </p>
                        <div v-for="(item, index) in allList.user" class="suggested-users">
                            <Row :gutter="14" type="flex" v-if="(uinfo && uinfo.id == item.id) ? false : true" >
                                <Col :lg="10" :md="10" :sm="10">
                                <Poptip trigger="hover" placement="top" width="400">
                                    <div class="user-portrait">
                                        <router-link to="/">
                                            <img :src="item.portrait || 'http://placekitten.com/100/150'" alt="">
                                        </router-link>
                                    </div>
                                    <div slot="content" class="user-poptip">
                                        <img src="http://placekitten.com/230/75" alt="">
                                    </div>
                                </Poptip>
                                </Col>
                                <Col :lg="14" :md="14" :sm="14">
                                <div class="userinfo">
                                    <router-link to="/" class="username">
                                        {{item.username}}
                                    </router-link>
                                </div>
                                <Button v-if="hasFollower(item.id)" @click.native="unfollower(item.id)">取消关注</Button>
                                <Button v-else @click.native="follower(item.id)" type="primary">关注</Button>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                    </Col>
                </Row>
                </Col>
                <Col :md="17" :sm="17" :xs="24" class="main-middle">
                <Card v-if="uinfo" class="card-mgb">
                    <div>
                        <p class="title">有什么新鲜事想告诉大家?</p>
                        <Form @submit.native.prevent="publishWeibo()">
                            <FormItem>
                                <Input v-model.trim="weiboContent.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="" />
                            </FormItem>
                            <FormItem>
                                <Col span="18">
                                <ul class="extras tal cp-all dib-all cl-hv-all">
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="md-images" size="18" color="#72a305" />
                                        </em>
                                        <span>图片</span>
                                    </li>
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="md-videocam" size="18" color="#2b85e4" />
                                        </em>
                                        <span>视频</span>
                                    </li>
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="ios-grid-outline" size="18" color="#2db7f5" />
                                        </em>
                                        <span>话题</span>
                                    </li>
                                </ul>
                                </Col>
                                <Col span="6 tar">
                                <Button @click.native="publishWeibo()" :disabled="!weiboContent.text" type="primary">发布</Button>
                                </Col>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
                <Row class="weibo-items">
                    <WeiboNavItem v-if="uinfo"/>
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
import WeiboNavItem from "../components/WeiboNavItem";
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
        WeiboNavItem,
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
        this.readSuggestedUser();
        // this.readPublicWeibo();

        if (session.signIned()) {
            this.readFollowerUser().then(res => this.readFollowerWeibo());
        } else {
            this.readPublicWeibo();
        }
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
