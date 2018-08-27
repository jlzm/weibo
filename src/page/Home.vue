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
            <Col :lg="15" :md="20" :sm="20" :xs="24" class="container">
            <Row :gutter="14">
                <Col :lg="6" :md="6" :sm="8" :xs="24" class="main-left">
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
                                    <p>{{followerNumber}}</p>
                                    <span>关注</span>
                                </a>
                                </Col>
                                <Col span="8">
                                <router-link to="/personalPage">
                                    <p>{{weiboNumber}}</p>
                                    <span>微博</span>
                                </router-link>
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
                        <UserItems :userList="allList.user" :followerList="itemList.follower" :readFollowerUser="readFollowerUser"/>
                    </Col>
                </Row>
                </Col>
                <Col :lg="12" :md="12" :sm="16" :xs="24" class="main-middle">
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
                    <WeiboNavItem v-if="uinfo" />
                    <WeiboItem :weiboList="allList.weibo" :readFollowerWeibo="readFollowerWeibo" />
                </Row>
                </Col>
                <Col :lg="6" :md="6" :sm="0" :xs="0" class="main-left">
                    <UserItems :userList="allList.user" :followerList="itemList.follower" :readFollowerUser="readFollowerUser"/>
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
import Header from "../components/Header";
import WeiboNavItem from "../components/WeiboNavItem";
import WeiboItem from "../components/WeiboItem";
import UserItems from "../components/UserItems";

import Footer from "../components/Footer";

// mixin
import GReadInfo from "../mixins/GReadInfo";
import GetCurrentTime from "../mixins/GetCurrentTime";
import OperateWeibo from "../mixins/OperateWeibo";

// 依赖
import api from "../lib/api";
import session from "../lib/session";

export default {
    mixins: [GReadInfo, OperateWeibo, GetCurrentTime],
    components: {
        Header,
        WeiboNavItem,
        WeiboItem,
        UserItems,
        Footer
    },
    data() {
        return {
            allList: {},
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

    }
};
</script>
