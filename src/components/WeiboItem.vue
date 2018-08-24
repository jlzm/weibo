<style>
/* weibo Card */

/* search */

.weibo-nav-wrap {
    display: flex;
    align-items: center;
}

/* iview Card Reset*/

.weibo-nav-card .ivu-card-body {
    padding-top: 3px;
    padding-bottom: 3px;
}

.weibo-nav-items.ivu-menu::after {
    height: 0;
}

.weibo-nav-item.ivu-menu-item {
    padding: 0 10px;
}

.weibo-nav-items.ivu-menu .weibo-nav-item.ivu-menu-item,
.weibo-nav-items.ivu-menu .weibo-nav-item.ivu-menu-submenu {
    border: 0;
}

.weibo-nav-items.ivu-menu .weibo-nav-item.ivu-menu-item:hover,
.weibo-nav-items.ivu-menu .weibo-nav-item.ivu-menu-submenu:hover {
    border: 0;
}

.weibo-form.ivu-form-item {
    margin: 0;
}

/* iview Card Reset End*/

.weibo-nav-items {
    height: 37px;
    line-height: 37px;
}

/* search End*/

.weibo-content-item {
    margin-bottom: 15px;
}

.weibo-content-item .user-poptip img {
    min-height: 100%;
    min-width: 100%;
}

.weibo-content-item .info-head .userinfo .username {
    font-weight: bold;
    font-size: 1.1rem;
}

.detail-text,
.detail-thumbnail-items {
    margin-top: 2px;
}

.weibo-content-item .weibo-time {
    color: #808080;
    font-size: 0.8rem;
}

.detail-text {
    font-size: 1rem;
    word-wrap: break-word;
}

/* .weibo-card-item底部 */

.weibo-operation-items {
    border-top: 1px solid #e1e1e1;
}

.weibo-operation-items {
    margin-top: 15px;
}

.operation-item {
    padding: 10px 0;
}

.operation-item .tooltip {
    border-right: 1px solid #e1e1e1;
    padding: 0 30px;
    width: 100%;
}

/* 头像缩略图 */

.user-portrait {
    border-radius: 50%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
}

.user-portrait {
    height: 54px;
    width: 54px;
}

.user-portrait img {
    min-height: 100%;
}

.comment-item {
    border-top: 1px solid #eee;
    padding: 7px 0;
}

/* 评论区 */

.comment-wrap {
    border-top: 1px solid #ccc;
    padding: 10px;
}

.comment-wrap .user-portrait {
    height: 35px;
    width: 35px;
}

.comment-text {
    margin-bottom: 10px;
}
</style>

<template>
    <div>
        <Card class="weibo-content-item card-mgb">
            <Row :gutter="18">
                <Col span="3">
                <Poptip trigger="hover" placement="top" width="400">
                    <div class="user-portrait">
                        <router-link to="/">
                            <img :src="weibo && weibo.portrait || 'http://placekitten.com/100/150'" alt="">
                        </router-link>
                    </div>
                    <div slot="content" class="user-poptip">
                        <img src="http://placekitten.com/230/75" alt="">
                    </div>
                </Poptip>
                </Col>
                <Col span="21">
                <div class="info-head cf">
                    <div class="userinfo col">
                        <router-link to="/" class="username">
                            {{weibo && weibo.$user && weibo.$user.username || '账号已注销'}}
                        </router-link>
                    </div>
                    <Dropdown class="flr">
                        <Icon type="md-arrow-dropdown" class="cp cl-hv" size="30" />
                        <DropdownMenu slot="list">
                            <DropdownItem>驴打滚</DropdownItem>
                            <DropdownItem>炸酱面</DropdownItem>
                            <DropdownItem disabled>豆汁儿</DropdownItem>
                            <DropdownItem>冰糖葫芦</DropdownItem>
                            <DropdownItem divided>北京烤鸭</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="weibo-time">
                    {{weibo && weibo.time || '-'}}
                </div>
                <div class="weibo-detail-wrap">
                    <p class="detail-text">
                        {{weibo && weibo.text || '微博内容'}}
                    </p>
                    <div class="detail-thumbnail-items">
                        <img :src="weibo && weibo.portrait || 'http://placekitten.com/230/150'" alt="">
                    </div>
                </div>
                </Col>
            </Row>
            <Row class="weibo-operation-items tac cp-all cl-hv-all">
                <Col span="6">
                <span class="operation-item db">
                    <span class="tooltip">
                        <em class="icon">
                            <Icon type="md-heart" size="24" />
                        </em>收藏
                    </span>
                </span>
                </Col>
                <Col span="6">
                <span class="operation-item db">
                    <span class="tooltip">
                        <em class="icon">
                            <Icon type="md-share" size="24" />
                        </em>转发
                    </span>
                </span>
                </Col>
                <Col span="6">
                <span @click="showComment(weibo.id)" class="operation-item db">
                    <span class="tooltip">
                        <em class="icon">
                            <Icon type="md-text" size="24" />
                        </em>
                        <span>评论</span>
                    </span>
                </span>
                </Col>
                <Col span="6">
                <span class="operation-item db">
                    <span>
                        <em class="icon">
                            <Icon type="md-thumbs-up" size="24" />
                        </em>999
                    </span>
                </span>
                </Col>
            </Row>
            <div v-if="commentVisible" class="comment-wrap">
                <Row :gutter="18" type="flex">
                    <Col span="2">
                    <Poptip trigger="hover" placement="top" width="400">
                        <div class="user-portrait">
                            <router-link to="/">
                                <img :src="weibo && weibo.portrait || 'http://placekitten.com/100/150'" alt="">
                            </router-link>
                        </div>
                        <div slot="content" class="user-poptip">
                            <img src="http://placekitten.com/230/75" alt="">
                        </div>
                    </Poptip>
                    </Col>
                    <Col span="22">
                    <Form @submit.native.prevent="publishComment(weibo.id)">
                        <FormItem class="comment-text">
                            <Input v-model.trim="commentContent.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="说点什么吧？" />
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="18">
                                <ul class="extras tal cp-all dib-all cl-hv-all">
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="md-images" size="24" color="#72a305" />
                                        </em>
                                    </li>
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="md-videocam" size="24" color="#2b85e4" />
                                        </em>
                                    </li>
                                </ul>
                                </Col>
                                <Col span="6 tar">
                                <Button @click.native="publishComment(weibo.id)" :disabled="!commentContent.text" type="primary">评论</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                    </Col>
                </Row>
                <Row v-for="(comment, index) in allList.comment" :key="index" :gutter="18" class="comment-item">
                    <Col span="2">
                    <Poptip trigger="hover" placement="top" width="400">
                        <div class="user-portrait">
                            <router-link to="/">
                                <img :src="comment && comment.portrait || 'http://placekitten.com/100/150'" alt="">
                            </router-link>
                        </div>
                        <div slot="content" class="user-poptip">
                            <img src="http://placekitten.com/230/75" alt="">
                        </div>
                    </Poptip>
                    </Col>
                    <Col span="22">
                    <div class="info-head">
                        <div class="userinfo col">
                            <router-link to="/" class="username">
                                {{comment && comment.$user && comment.$user.username || '账号已注销'}}
                            </router-link>
                        </div>
                    </div>
                    <Row class="weibo-time">
                        <Col span="12"> {{comment && comment.time || '-'}}
                        </Col>
                        <Col span="12" class="tar cp-all">
                        <span @click="showReplyModal(comment.id)" class="cl-hv">回复</span>
                        <!-- 回复区 -->
                        <Modal v-model="commentContent.reply_id == comment.id" :closable="false" :mask-closable="false" :footer-hide="true" title="Title" okText="评论" :loading="loading">
                            <Row :gutter="18" class="comment-item">
                                <Col span="3">
                                <Poptip trigger="hover" placement="top" width="400">
                                    <div class="user-portrait">
                                        <router-link to="/">
                                            <img :src="comment && comment.portrait || 'http://placekitten.com/100/150'" alt="">
                                        </router-link>
                                    </div>
                                    <div slot="content" class="user-poptip">
                                        <img src="http://placekitten.com/230/75" alt="">
                                    </div>
                                </Poptip>
                                </Col>
                                <Col span="21">
                                <div class="info-head">
                                    <div class="userinfo col">
                                        <router-link to="/" class="username">
                                            {{comment && comment.$user && comment.$user.username || '账号已注销'}}
                                        </router-link>
                                    </div>
                                </div>
                                <Row class="weibo-time">
                                    <Col span="12"> {{comment && comment.time || '-'}}
                                    </Col>
                                    <Col span="12" class="tar cp-all">
                                    </Col>
                                </Row>
                                <div class="weibo-detail-wrap">
                                    <span class="detail-text">
                                        {{comment && comment.text || '评论内容'}}
                                    </span>
                                </div>
                                </Col>

                            </Row>
                            <p>
                                <router-link to="/" class="username">
                                    {{comment && comment.$user && comment.$user.username || '账号已注销'}}
                                </router-link>
                            </p>
                            <Form @submit.native.prevent="replyComment(weibo.id)">
                                <FormItem class="comment-text">
                                    <Input v-model.trim="commentContent.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." />
                                </FormItem>
                                <FormItem>
                                    <Row>
                                        <Col span="18">
                                        <ul class="extras tal cp-all dib-all cl-hv-all">
                                            <li>
                                                <em class="icon-mgr">
                                                    <Icon type="md-images" size="24" color="#72a305" />
                                                </em>
                                            </li>
                                            <li>
                                                <em class="icon-mgr">
                                                    <Icon type="md-videocam" size="24" color="#2b85e4" />
                                                </em>
                                            </li>
                                        </ul>
                                        </Col>
                                        <Col span="6 tar">
                                        <Button @click.native="hiddenReplyModal()" style="margin-right: 8px">取消</Button>
                                        <Button @click.native="replyComment(weibo.id)" :disabled="!commentContent.text" type="primary">评论</Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </Form>
                        </Modal>
                        </Col>
                    </Row>
                    <div class="weibo-detail-wrap">
                        <div class="detail-text">
                            {{comment.text || '评论内容'}}
                        </div>
                        <div class="reply-wrap">
                            <div v-if="comment.reply_id == item.id" v-for="(item, index) in allList.comment" :key="index">
                                <div>
                                    <router-link to="/" v-if="comment.reply_id">@{{item.$user && item.$user.username}}:</router-link>
                                    <span>{{item.text}}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    </Col>
                </Row>
            </div>

        </Card>
    </div>
</template>

<script>
import api from "../lib/api";
import Header from "../components/Header";
import GReadInfo from "../mixins/GReadInfo";
import session from "../lib/session";

export default {
    mixins: [GReadInfo],
    props: {
        weibo: {
            default() {
                return {};
            }
        }
    },
    components: {
        Header
    },
    data() {
        return {
            loading: true,
            uinfo: session.uinfo(),
            allList: {},
            commentContent: {},
            commentVisible: false
        };
    },
    mounted() {},
    methods: {
        showReplyModal(replyId) {
            this.$set(this.commentContent, "reply_id", replyId);
        },
        hiddenReplyModal() {
            this.$set(this.commentContent, "reply_id", null);
        },
        // 回复评论
        replyComment(weiboId) {
            this.publishComment(weiboId);
        },
        // 显示或关闭评论区
        showComment(weiboId) {
            if (!this.uinfo) {
                this.$router.push("/signIn");
                return;
            }
            if (!this.commentVisible) {
                this.readComment(weiboId);
            }
            this.commentVisible = !this.commentVisible;
        },
        // 渲染当前微博的评论
        readComment(weiboId) {
            this.gReadInfo("comment", this.allList, {
                where: { weibo_id: weiboId },
                with: [
                    {
                        relation: "belongs_to",
                        model: "user"
                    }
                ]
            });
        },
        // 发表评论
        publishComment(weiboId) {
            this.commentContent.user_id = this.uinfo.id;
            this.commentContent.weibo_id = weiboId;
            this.commentContent.time = this.getCurrentTime();

            api.api("comment/create", this.commentContent).then(res => {
                this.commentContent = {};
                this.readComment(weiboId);
            });
        },
        // 获取系统当前时间
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

