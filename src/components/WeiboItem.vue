<style scoped>
/* weibo Card */

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
    padding: 0 10px;
    width: 100%;
}

/* 头像缩略图 */

.user-portrait {
    border-radius: 50%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.3);
}

.user-portrait {
    /* width: 54px;
    height: 54px; */
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
        <Card v-for="(weibo, index) in weiboList" class="weibo-content-item card-mgb">
            <Row :gutter="14">
                <Col :md="3" :sm="3" :xs="4">
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
                <Col span="20">
                <div class="info-head cf">
                    <div class="userinfo col">
                        <router-link to="/" class="username">
                            {{weibo && weibo.$user && weibo.$user.username || '账号已注销'}}
                        </router-link>
                    </div>
                    <Dropdown class="flr" trigger="click">
                        <Icon type="md-arrow-dropdown" class="cp cl-hv" size="30" />
                        <DropdownMenu slot="list">
                            <DropdownItem>驴打滚</DropdownItem>
                            <DropdownItem v-if="uinfo && uinfo.id==weibo.user_id" divided @click.native="removeWeibo(weibo.id)">删除</DropdownItem>
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
                        <img :src="weibo && weibo.portrait" alt="">
                    </div>
                    <div class="reply-wrap">
                        <div v-if="weibo.relay_id == item.id" v-for="(item, index) in weiboList" :key="index">
                            <div>
                                <span>转发：</span>
                                <router-link to="/" v-if="weibo.relay_id">@{{item.$user && item.$user.username}}：</router-link>
                                <span>{{item.text}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
            <Row class="weibo-operation-items tac cp-all cl-hv-all">
                <Col span="6">
                <span class="operation-item db">
                    <span class="tooltip dib">
                        <em class="icon-mgr">
                            <Icon type="md-star-outline" size="18" />
                        </em>
                        <span>收藏</span>
                    </span>
                    <!-- <span class="tooltip dib">
                        <em class="icon-mgr">
                            <Icon type="md-star-outline" size="18" />
                        </em>
                        <span>收藏</span>
                    </span> -->
                </span>
                </Col>
                <Col span="6">
                <span @click="showRelay(weibo.id)" class="operation-item db">
                    <span class="tooltip dib">
                        <em class="icon-mgr">
                            <Icon type="md-share" size="18" />
                        </em>
                        <span>转发</span>
                    </span>
                </span>
                </Col>
                <Col span="6">
                <span @click="showComment(weibo.id)" :class="{'cl-act': commentVisible}" class="operation-item db">
                    <span class="tooltip dib">
                        <em class="icon-mgr">
                            <Icon type="md-text" size="18" />
                        </em>
                        <span>评论</span>
                    </span>
                </span>
                </Col>
                <Col span="6">
                <span v-if="hasLike(weibo.id)" @click="unLikeWeibo(weibo.id)" class="operation-item db">
                    <span>
                        <em class="icon-mgr">
                            <Icon type="md-thumbs-up" size="18" />
                        </em>
                        <span>{{weibo.collectList && weibo.collectList.length}}</span>
                    </span>
                </span>
                <span v-else @click="likeWeibo(weibo.id)" class="operation-item db">
                    <span>
                        <em class="icon-mgr">
                            <Icon type="ios-thumbs-up-outline" size="18" />
                        </em>
                        <span>{{weibo.collectList && weibo.collectList.length}}</span>
                    </span>
                </span>
                </Col>
            </Row>

            <div class="relay-wrap">
                <Modal v-model="relayVisible" :closable="false" :mask-closable="false" :footer-hide="true" title="转发微博" okText="转发" :loading="loading">
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
                        <div class="info-head">
                            <div class="userinfo col">
                                <router-link to="/" class="username">
                                    {{weibo && weibo.$user && weibo.$user.username || '账号已注销'}}
                                </router-link>
                            </div>
                        </div>
                        <div class="weibo-time">
                            {{weibo && weibo.time || '-'}}
                        </div>
                        <div class="weibo-detail-wrap">
                            <p class="detail-text">
                                {{weibo && weibo.text || '微博内容'}}
                            </p>
                        </div>
                        </Col>
                    </Row>
                    <Form @submit.native.prevent="relayWeibo(weibo.id)">
                        <FormItem class="comment-text">
                            <Input v-model.trim="weiboContent.text" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="转发理由" />
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="18">
                                <ul class="extras tal cp-all dib-all cl-hv-all">
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="md-images" size="18" color="#72a305" />
                                        </em>
                                    </li>
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="md-videocam" size="18" color="#2b85e4" />
                                        </em>
                                    </li>
                                </ul>
                                </Col>
                                <Col span="6 tar">
                                <Button @click.native="hiddenRelayModal()" style="margin-right: 8px">取消</Button>
                                <Button @click.native="relayWeibo(weibo.id)" type="primary">转发</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </Modal>
            </div>

            <div v-if="commentVisible" class="comment-wrap">
                <Row :gutter="10" type="flex">
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
                                            <Icon type="md-images" size="18" color="#72a305" />
                                        </em>
                                    </li>
                                    <li>
                                        <em class="icon-mgr">
                                            <Icon type="md-videocam" size="18" color="#2b85e4" />
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
                <Row v-for="(comment, index) in allList.comment" :key="index" :gutter="10" class="comment-item">
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

                        <span v-if="uinfo.id!=comment.user_id" @click="showReplyModal(comment.id)" class="cl-hv">回复</span>
                        <span v-else @click="removeReply(weibo.id, comment.id)">删除</span>
                        <!-- 回复区 -->
                        <Modal v-model="commentContent.reply_id == comment.id" :closable="false" :mask-closable="false" :footer-hide="true" title="Title" okText="评论" :loading="loading">
                            <Row :gutter="10" class="comment-item">
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
                                        <Col span="12">
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
                                        <Col span="12 tar">
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
                                    <span>回复：</span>
                                    <router-link to="/" v-if="comment.reply_id">@{{item.$user && item.$user.username}}：</router-link>
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
// 组件
import Header from "../components/Header";

// mixins
import GReadInfo from "../mixins/GReadInfo";
import GetCurrentTime from "../mixins/GetCurrentTime";

// 依赖
import api from "../lib/api";
import session from "../lib/session";

export default {
    mixins: [GReadInfo, GetCurrentTime],
    props: {
        weiboList: {
            default: ""
        },
        readFollowerWeibo: {
            default: ""
        }
    },
    components: {
        Header
    },
    data() {
        return {
            loading: true,
            collectList: [],
            likeList: [],
            uinfo: session.uinfo(),
            allList: {},
            commentContent: {},
            weiboContent: {},
            relayVisible: false,
            commentVisible: false
        };
    },
    mounted() {
        if (session.signIned()) {
            this.readLikeWeibo();
        }
    },
    methods: {
        // 赞
        likeWeibo(weiboId) {
            if (!this.uinfo) {
                this.$router.push("/signIn");
                return;
            }
            api
                .api("user/bind", {
                    model: "weibo",
                    glue: {
                        [this.uinfo.id]: weiboId
                    }
                })
                .then(res => {
                    
                    this.getLikeWiebo();
                });
        },
        // 取消赞
        unLikeWeibo(weiboId) {
            api
                .api("user/unbind", {
                    model: "weibo",
                    glue: {
                        [this.uinfo.id]: weiboId
                    }
                })
                .then(res => {
                    this.readLikeWeibo();
                    this.getLikeWiebo();
                });
        },
        // 渲染收藏数
        getLikeWiebo() {
            api.api("_bind__user_weibo/read").then(res => {
                this.weiboList.forEach(item => {
                    res.data.forEach(like => {
                    let test = [];
                        if (like.weibo_id == item.id) {
                           console.log('true:', true);
                           
                            test.push(like);
                            this.$set(item, "collectList", test);
                            console.log('test下:', test.length);
                            
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
        // 获取对象键值
        pluck(arr, key) {
            const result = [];
            if (!arr) return result;
            arr.forEach(item => {
                result.push(item[key]);
            });

            return result;
        },
        // 判断是否关注
        hasLike(likeId) {
            if (!this.likeList) {
                return false;
            }
            return !!this.likeList.find(item => {
                return item.id == likeId;
            });
        },
        // 渲染赞的微博
        readLikeWeibo() {
            return api
                .api("user/find", {
                    id: this.uinfo.id,
                    with: [
                        {
                            relation: "belongs_to_many",
                            model: "weibo"
                        }
                    ]
                })
                .then(res => {
                    this.likeList = res.data.$weibo;
                    this.getLikeWiebo();
                });
        },
        // 打开转发微博弹出层
        showRelay(relayId) {
            if (!this.uinfo) {
                this.$router.push("/signIn");
                return;
            }
            this.$set(this.weiboContent, "relay_id", relayId);
            this.relayVisible = !this.relayVisible;
        },
        // 转发微博
        relayWeibo(weiboId) {
            if (!this.weiboContent.text) {
                this.$set(this.weiboContent, "text", "转发微博");
            }
            this.weiboContent.time = this.getCurrentTime();
            this.weiboContent.user_id = this.uinfo.id;
            api.api("weibo/create", this.weiboContent).then(res => {
                this.$Message.info("转发成功");
                this.weiboContent = {};
                this.readFollowerWeibo();
                this.relayVisible = false;
            });
        },
        // 隐藏转发弹出层
        hiddenRelayModal() {
            this.relayVisible = false;
        },
        //删除微博
        removeWeibo(weiboId) {
            if (!confirm("确认删除？")) return;
            api
                .api("weibo/delete", {
                    id: weiboId
                })
                .then(res => {
                    this.$Message.info("删除成功");
                    if (this.readFollowerWeibo) this.readFollowerWeibo();
                });
        },
        // 删除评论或者回复
        removeReply(weiboId, commentId) {
            if (!confirm("确认删除？")) return;
            api
                .api("comment/delete", {
                    id: commentId
                })
                .then(res => {
                    this.$Message.info("删除成功");
                    this.readComment(weiboId);
                });
        },
        // 打开回复评论弹出层
        showReplyModal(replyId) {
            this.$set(this.commentContent, "reply_id", replyId);
        },
        // 关闭回复评论弹出层
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
                if (!this.commentContent.reply_id) {
                    this.$Message.info("评论成功");
                } else {
                    this.$Message.info("回复成功");
                }
                this.commentContent = {};
                this.readComment(weiboId);
            });
        }
    }
};
</script>

