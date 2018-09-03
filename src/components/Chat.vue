<style scoped>
.chat-container {
    position: fixed;
    z-index: 998;
    bottom: 10px;
    right: 10px;
    border: 1px solid #aaa;
    box-shadow: 1px 2px 2px #aaa;
    background: #fff;
}

.chat-wrap {
    padding: 0px 0;
}

.message-title {
    padding: 10px 4px;
}

.user-serch {
    padding: 3px 4px;
}

.message-wrap {
    background: #aaa;
    min-height: 300px;
}

.message-item {
    word-wrap: break-word;
    word-break: break-all;
}

.message-text {
    padding: 10px;
    background: #fff;
    display: inline-block;
    margin: 5px;
    border-radius: 6px;
}

.edit-message {
    padding: 4px 0;
}

.user {
    padding: 5px 7px;
}
</style>

<template>
    <div v-if="uinfo">
        <Modal v-model="$store.state.showChat" class="chat-container" width="700" footer-hide>
            <Row class="chat-wrap">
                <Row class="chat-main">
                    <Col :lg="6">
                    <div class="chat-user">
                        <div class="user-serch">
                            <Input placeholder="Enter text">
                            <Icon type="ios-search" slot="suffix" />
                            </Input>
                        </div>
                        <ul class="user-list cp-all bg-hv-all">
                            <li v-for="(user, index) in allList.user" :key="index" @click="userSelected(user)" :class="{'bg-act': userItem.index == user.id}" class="user">
                                {{user.username}}
                            </li>
                        </ul>
                    </div>
                    </Col>
                    <Col :lg="18">
                    <Row class="message-title">
                        <Col :lg="16">
                        <span>{{userItem.username}}</span>
                        </Col>
                    </Row>
                    <div class="message-wrap">
                        <div class="message-item tal">
                            <p class="message-text">在吗？</p>
                        </div>
                        <div class="message-item tar">
                            <p class="message-text">不在</p>
                        </div>
                    </div>
                    <div class="edit-message">
                        <Input type="textarea" @on-keydown="handlerMultiEnter" v-model="$store.state.form.text" :autosize="{minRows: 2,maxRows: 5}" placeholder="" />
                    </div>
                    </Col>
                </Row>
            </Row>
        </Modal>
        <button @click="$store.commit('showChat')" class="chat-container">私信聊天</button>
    </div>
</template>

<script>
import GReadInfo from "../mixins/GReadInfo";

import session from "../lib/session";

export default {
    mixins: [GReadInfo],
    data() {
        return {
            userItem: {},
            uinfo: session.uinfo(),
            splitLeft: 0.2,
            splitRight: 0.8
        };
    },
    mounted() {
        this.gReadInfo("user");
    },
    methods: {
        sendMessage() {
            console.log("1:", 1);
        },
        userSelected(user) {
            this.$set(this.userItem, "index", user.id);
            this.$set(this.userItem, "username", user.username);
        },
        handlerMultiEnter(e) {
            let code = e.keyCode;
            let ctrl = e.ctrlKey;
            let shift = e.shiftKey;
            let alt = e.altKey;
            if (code == "13" && ctrl && !shift && !alt) {
                //ctrl + enter
                e.target.value += "\n";
                // return;
            }
            if (code == "13" && !ctrl && !shift && !alt) {
                //只按了enter
                e.preventDefault();
                this.test();
            }
        },
        test() {
            console.log("回车:");
        }
    }
};
</script>

