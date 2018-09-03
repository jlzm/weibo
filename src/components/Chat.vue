<style scoped>
.chat-container {
    position: fixed;
    bottom: 10px;
    right: 10px;
    
}

.chat-wrap {
    border: 1px solid #aaa;
    box-shadow: 1px 2px 2px #aaa;
}

.chat-user {
    padding: 10px 4px;
}

.chat-title {
    padding: 10px 4px;
}

/* 面板 */
.demo-split {
    height: 400px;
    border: 1px solid #dcdee2;
}
.demo-split-pane {
    padding: 10px;
}
.demo-split-pane.no-padding {
    height: 400px;
    padding: 0;
}
</style>

<template>
    <div>
        <Row>
            <Col v-if="$store.state.showChat"  class="chat-container" :lg="8" >
            <Row class="chat-wrap">
                <Row class="head">
                    <Col :lg="7">
                    <div class="chat-user">
                        <div class="user-serch">
                            <Input placeholder="Enter text">
                            <Icon type="ios-search" slot="suffix" />
                            </Input>
                        </div>
                    </div>
                    </Col>
                    <Col :lg="17">
                    <Row class="chat-title">
                        <Col :lg="16"> 阿萨姆
                        </Col>
                        <Col :lg="8" class="tar">
                        <span @click="$store.commit('hideChat')" class="cp cl-hv">
                            <Icon type="md-close-circle" size="16" />
                        </span>
                        </Col>
                    </Row>
                    <div class="messige-wrap">

                    </div>
                    </Col>
                </Row>
                <div class="demo-split">
                    <Split v-model="splitLeft">
                        <div slot="left" class="demo-split-pane">
                            <ul class="user-list">
                                <li>aaaa</li>
                                <li>aaaa</li>
                                <li>aaaa</li>
                                <li>aaaa</li>
                                <li>aaaa</li>
                                <li>aaaa</li>
                                <li>aaaa</li>
                            </ul>
                        </div>
                        <div slot="right" class="demo-split-pane no-padding">
                            <Split v-model="splitRight" mode="vertical">
                                <div slot="top" class="demo-split-pane">
                                    Top Pane
                                </div>
                                <div slot="bottom" class="demo-split-pane">
                                    Bottom Pane
                                </div>
                            </Split>
                        </div>

                    </Split>
                </div>

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

