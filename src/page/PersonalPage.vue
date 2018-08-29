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
            <Col :lg="15" :md="20" :sm="20" :xs="24" class="container user-cover-wrap">
            <Card class="card-mgb">
                <div class="user-cover">
                    <img src="http://placekitten.com/1920/1080" alt="">
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
                <Col :lg="6" :md="6" :sm="8" :xs="24">
                <Card class="card-mgb tac">
                    <Row class="user-atten">
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
                <Col :lg="12" :md="12" :sm="16" :xs="24">
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
                <Col :lg="6" :md="6" :sm="0" :xs="0" class="main-left">
                <UserItems :userList="allList.user" :followerList="itemList.follower" :readFollowerUser="readFollowerUser" />
                </Col>
            </Row>
            </Col>
        </Row>
        </Col>

        </Row>
    </div>
</template>

<script>
// 组件
import Header from "../components/Header";
import WeiboNavItem from "../components/WeiboNavItem";
import WeiboItem from "../components/WeiboItem";
import UserItems from "../components/UserItems";

// mixins
import GReadInfo from "../mixins/GReadInfo";
import OperateWeibo from "../mixins/OperateWeibo";
import GetCurrentTime from "../mixins/GetCurrentTime";

// 依赖
import api from "../lib/api";
import session from "../lib/session";

export default {
    mixins: [GReadInfo, OperateWeibo, GetCurrentTime],

    components: {
        Header,
        WeiboNavItem,
        WeiboItem,
        UserItems
    },
    data() {
        return {
            weiboContent: {},
            uinfo: session.uinfo()
        };
    },
    mounted() {
        this.readSuggestedUser();

        this.readPersonalWeibo();
        if (session.signIned()) {
            this.readTargetUser();
            this.readFollowerUser();
        }
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
        }
    }
};
</script>

