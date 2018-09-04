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
    /* min-height: 300px; */
}

.message-items {
    background: #aaa;
    height: 320px;
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

.null-message {
    height: 460px;
}

.null-message .null-title {
    margin-top: 35%;
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
                            <li v-for="(user, index) in allList.user" :key="index" @click="userSelected(user)" :class="{'bg-act': $store.state.form.to_id == user.id}" class="user">
                                {{user.username}}
                            </li>
                        </ul>
                    </div>
                    </Col>
                    <Col v-if="userItem.username" class="message-wrap" :lg="18">
                    <Row class="message-title">
                        <Col :lg="16">
                        <span>{{userItem.username}}</span>
                        </Col>
                    </Row>
                    <div class="message-items">
                        <div v-for="(message, index) in $store.state.allList.message"  class="message-item tal" :class="{'tar': message.from_id}">
                            <p class="message-text" >{{message.text}}</p>
                        </div>
                    </div>
                    <div class="edit-message">
                        <Input type="textarea" @on-keydown="handlerMultiEnter" v-model="$store.state.form.text" :autosize="{minRows: 4,maxRows: 4}" placeholder="按下Enter发送内容/ Ctrl+Enter换行" />
                    </div>
                    </Col>
                    <Col v-else :lg="18" class="null-message">
                       <div class="null-title">
                            <h2 class="tac">
                            暂无对话
                        </h2>
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
        setInterval(() => {
            this.$store.dispatch('readMessage');
            console.log('1:', 1);
            
        }, 3000);
    },
    methods: {
        userSelected(user) {
            this.$set(this.$store.state.form, "to_id", user.id);
            this.$set(this.userItem, "username", user.username);
            this.$store.dispatch('readMessage');
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
                this.$store.dispatch('sendMessage')
            }
        },

    }
};
</script>

