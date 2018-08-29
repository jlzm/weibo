<style>
</style>

<template>
    <div>
        <Header defRouter="/search" />
        <Row class="main">
            <Col :lg="14" class="container">
            <Form class="search-wrap">
                <Input placeholder="Enter text">
                <Icon type="ios-search" slot="suffix" />
                </Input>
            </Form>
            <div class="search-type">
                <UserItems :userList="allList.user" :followerList="itemList.follower" :readFollowerUser="readFollowerUser" />
            </div>
            <Card></Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import Header from "../components/Header";

// 组件
import WeiboItem from "../components/WeiboItem";
import UserItems from "../components/UserItems";

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
        UserItems
    },
    data() {
        return {
            allList: {},
            uinfo: session.uinfo()
        };
    },
    mounted() {},
    methods: {
        test() {
            console.log("1:", 1);
        }
    }
};
</script>

