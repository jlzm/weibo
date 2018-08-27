<style>
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
</style>

<template>
    <Card>
        <p slot="title">
            <span class="suggested-title">推荐关注</span>
            <span>刷新</span>
            <span>全部</span>
        </p>
        <div v-for="(item, index) in userList" class="suggested-users">
            <Row :gutter="14" type="flex" v-if="(uinfo && uinfo.id == item.id) ? false : true">
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
</template>

<script>
// 依赖
import api from "../lib/api";
import session from "../lib/session";

export default {
    props: {
        userList: {
            default: ""
        },
        followerList: {
            default: ""
        },
        readFollowerUser: {
            default: ""
        }
    },
    data() {
        return {
            uinfo: session.uinfo()
        };
    },
    mounted() {},
    methods: {
        // 判断是否关注
        hasFollower(targetId) {
            if (!this.followerList) {
                return false;
            }
            return !!this.followerList.find(item => {
                return item.id == targetId;
            });
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
        }
    }
};
</script>
