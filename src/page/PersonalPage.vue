<style>
.main {
    display: flex;
}

.user-cover {
    position: relative;
}

.user-cover .intro {
    position: absolute;
    border: 1px solid #000;
    top: 0;
    width: 100%;
    height: 80%;
    background: rgba(133, 69, 69, 0.4);
}


.cover-operation-item {
    margin: 0 5px;
}

.user-detail-item {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

/* 额外信息 */
.extras li {
    margin-right: 15px;
}

.icon-mgr {
    font-style: normal;
    padding-right: 4px;
}
</style>

<template>
    <div>
        <Header defRouter="/personalPage" />
        <Row class="main">
            <Col :lg="12" :md="16" :sm="20" :xs="24" class="container user-cover-wrap">
            <Card class="card-mgb">
                <div class="user-cover">
                    <img src="http://placekitten.com/1024/512" alt="">
                    <div class="intro">

                    </div>
                </div>
                <Menu mode="horizontal" theme="light" class="cover-operation-items">
                    <MenuItem name="/personalPage" to="/personalPage" class="cover-operation-item">
                    <Icon type="md-home " size="20" />
                    <span>主页</span>
                    </MenuItem>
                    <MenuItem name="/signUp" to="/personalPage" class="cover-operation-item">
                    <Icon type="md-home" size="20" />
                    <span>相册</span>
                    </MenuItem>
                    <MenuItem name="/" to="/personalPage" class="cover-operation-item">
                    <Icon type="md-home" size="20" />
                    <span>设置</span>
                    </MenuItem>
                </Menu>
            </Card>
            <Row :gutter="14">
                <Col :md="8" :sm="8" :xs="24">
                <Card class="card-mgb tac">
                    <Row class="user-atten">
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
                </Card>
                <Card class="card-mgb">
                    <div class="user-detail-items">
                        <p class="user-detail-item">
                            <span class="icon">
                                <Icon type="md-pin" />
                            </span>
                            百慕大三角洲
                        </p>
                        <p class="user-detail-item">
                            <span class="icon">
                                <Icon type="md-school" />
                            </span>
                            幼儿园
                        </p>
                        <p class="user-detail-item">
                            <span class="icon">
                                <Icon type="md-egg" />
                            </span>
                            宇始元一年
                        </p>
                    </div>
                </Card>
                <Card></Card>
                </Col>
                <Col :md="16" :sm="16" :xs="24">
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
                                            <Icon type="md-images" size="24" color="#72a305" />
                                        </em>
                                        <span>图片</span>
                                    </li>
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="md-videocam" size="24" color="#2b85e4" />
                                        </em>
                                        <span>视频</span>
                                    </li>
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="ios-grid-outline" size="24" color="#2db7f5" />
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
                    <WeiboNavItem/>
                    <WeiboItem v-for="(item, index) in allList.weibo" :key="index" :weiboList="allList.weibo" :weibo="item" :readFollowerWeibo="readFollowerWeibo" />
                </Row>
                </Col>
            </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
import api from "../lib/api";

import WeiboNavItem from "../components/WeiboNavItem";
import WeiboItem from "../components/WeiboItem";
import Header from "../components/Header";
import GReadInfo from "../mixins/GReadInfo";
import session from "../lib/session";

export default {
    mixins: [GReadInfo],

    components: {
        Header,
        WeiboNavItem,
        WeiboItem
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

