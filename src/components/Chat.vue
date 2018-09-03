<style scoped>
.chat-container {
    position: fixed;
    bottom: 10px;
    right: 10px;
    border: 1px solid #aaa;
    box-shadow: 1px 2px 2px #aaa;
}

.chat-wrap {
    padding: 10px;
}

.chat-title {
    padding: 10px 4px;
}

.messige-wrap {
    background: #aaa;
    min-height: 300px;
}

.messige-item {
     word-wrap:break-word;
    word-break:break-all;
}

.messige-text {
    padding: 10px;
    background: #fff;
    display: inline-block;
    margin: 5px;
    border-radius: 6px;
}

.edit-messige {
    padding: 4px 0;
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
                        <ul class="user-list">
                            <li>阿萨姆</li>
                            <li>阿萨姆</li>
                            <li>阿萨姆</li>
                            <li>阿萨姆</li>
                            <li>阿萨姆</li>
                        </ul>
                    </div>
                    </Col>
                    <Col :lg="18">
                    <Row class="chat-title">
                        <Col :lg="16">
                        <span>阿萨姆</span>
                        </Col>
                        <Col :lg="8" class="tar">
                        <span @click="$store.commit('hideChat')" class="cp cl-hv">
                            <Icon type="md-close-circle" size="16" />
                        </span>
                        </Col>
                    </Row>
                    <div class="messige-wrap">
                        <div class="messige-item tal">
                            <p class="messige-text">在吗？</p>
                        </div>
                        <div class="messige-item tar">
                            <p class="messige-text">不在</p>
                        </div>
                    </div>
                    <div class="edit-messige">
                        <Form>
                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="" />
                            <div class="tar">
                                <Button>发送</Button>
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
export default {
    data() {
        return {
            splitLeft: 0.2,
            splitRight: 0.8
        };
    },
    mounted() {},
    methods: {}
};
</script>

