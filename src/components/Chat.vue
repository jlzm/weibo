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
    padding: 10px 0;
}

.chat-title {
    padding: 10px 4px;
}

.message-wrap {
    background: #aaa;
    min-height: 300px;
}

.message-item {
     word-wrap:break-word;
    word-break:break-all;
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
    <div>
        <Row>
            <Col v-if="$store.state.showChat" class="chat-container" :lg="7">
            <Row class="chat-wrap">
                <Row class="head">
                    <Col :lg="6">
                    <div class="chat-user">
                        <div class="user-serch">
                            <Input placeholder="Enter text">
                            <Icon type="ios-search" slot="suffix" />
                            </Input>
                        </div>
                        <ul class="user-list cp-all bg-hv-all">
                            <li v-for="(user, index) in allList.user" :key="index" 
                            @click="userSelected(user)"
                             :class="{'bg-act': userItem.index == user.id}" 
                             class="user">
                                {{user.username}}
                            </li>
                        </ul>
                    </div>
                    </Col>
                    <Col :lg="18">
                    <Row class="chat-title">
                        <Col :lg="16">
                        <span>{{userItem.username}}</span>
                        </Col>
                        <Col :lg="8" class="tar">
                        <span @click="$store.commit('hideChat')" class="cp cl-hv">
                            <Icon type="md-close-circle" size="16" />
                        </span>
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
                        <Form>
                            <Input type="textarea" v-model="$store.state.form.text" :autosize="{minRows: 2,maxRows: 5}" placeholder="" />
                            <div class="tar">
                                <Button @click.native="sendMessage()">发送</Button>
                            </div>
                        </Form>
                    </div>
                    </Col>
                </Row>

            </Row>
            </Col>
            <button v-else @click="$store.commit('showChat')" class="chat-container">私信聊天</button>
        </Row>
    </div>
</template>

<script>

import GReadInfo from "../mixins/GReadInfo";

export default {
    mixins: [GReadInfo],
    data() {
        return {
            userItem: {},
            splitLeft: 0.2,
            splitRight: 0.8,
        };
    },
    mounted() {
        this.gReadInfo('user');
    },
    methods: {
        sendMessage() {
            console.log('1:', 1);
            
        },
        userSelected(user) {
            this.$set(this.userItem, 'index', user.id);
            this.$set(this.userItem, 'username', user.username);
        }
    }
};
</script>

