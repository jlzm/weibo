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
                            <img src="http://placekitten.com/400/75" alt="">
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
                                <router-link to="/personalPage">
                                    <p>{{followerNumber}}</p>
                                    <span>关注</span>
                                </router-link>
                                </Col>
                                <Col span="8">
                                <router-link to="/personalPage">
                                    <p>{{targetNumber}}</p>
                                    <span>粉丝</span>
                                </router-link>
                                </Col>
                                <Col span="8">
                                <router-link to="/personalPage">
                                    <p>{{weiboNumber}}</p>
                                    <span>微博</span>
                                </router-link>
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
import GetCurrentTime from "../mixins/GetCurrentTime";
import OperateWeibo from "../mixins/OperateWeibo";

// 依赖
import api from "../lib/api";
import session from "../lib/session";

export default {
    mixins: [GReadInfo, OperateWeibo],
    components: {
        Header,
        WeiboItem,
        Footer
    },
    data() {
        return {
            weiboContent: {},
            uinfo: session.uinfo()
        };
    },
    mounted() {
        // this.readSuggestedUser();
        this.readPublicWeibo();
        if (session.signIned()) {
            this.readTargetUser();
            this.readFollowerUser();
        }
        // this.readFollowerWeibo()
    }
};
</script>
