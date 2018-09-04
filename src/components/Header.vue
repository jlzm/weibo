<style scoped>
.header {
    height: 48px;
}

.nav-wrap {
    position: fixed;
    background: #fff;
    box-shadow: 0px 1px 1px #888888;
    width: 100%;
    z-index: 999;
}

/* logo样式 */
.logo {
    padding: 0 40px 0 10px;
}

.setting {
    margin-left: 12px;
}

/* nav-search start */

.nav-search {
    padding: 0 10px 7px 10px;
}

/* iview 样式重置 */

.nav-router-items {
    /* height: 52px;
    line-height: 52px; */
}

.ivu-menu::after {
    height: 0;
}

.nav-router-item.ivu-menu-item {
    border: 0;
    padding: 0 5px;
    margin: 0 4px;
    font-size: 1.1rem;
}

.nav-router-item.ivu-menu-item:hover {
    border: 0;
}

.demo-badge {
    padding: 0 10px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
}
</style>

<template>
    <div>
        <div class="header">
            <Row type="flex" class="nav-wrap" align="middle">
                <Col :lg="15" :md="20" :sm="20" :xs="24" class="container">
                <Row :gutter="20" type="flex" class="nav" align="middle">
                    <Col :lg="4" :md="4" :sm="4" :xs="0">
                    <router-link to="/" class="logo">
                        Logooooooooooo
                    </router-link>
                    </Col>

                    <Col :lg="10" :md="12" :sm="12" :xs="24" class="nav-right">
                    <Row type="flex" align="middle">
                        <Menu mode="horizontal" theme="light" :active-name="defRouter" class="nav-router-items">
                            <MenuItem name="/" to="/" class="nav-router-item">
                            <Icon type="md-home" size="16" />
                            <span>首页</span>
                            </MenuItem>
                            <MenuItem name="/found" to="/found" class="nav-router-item">
                            <Icon type="md-eye" size="16" />
                            <span>发现</span>
                            </MenuItem>
                            <MenuItem name="/search" to="/search" class="nav-router-item">
                            <Icon type="md-search" size="16" />
                            <span>搜索</span>
                            </MenuItem>

                            <MenuItem v-if="uinfo" name="/personalPage" to="/personalPage" class="nav-router-item">
                            <Icon type="md-person " size="16" />
                            <span>{{uinfo.username}}</span>
                            </MenuItem>
                            <MenuItem v-if="!uinfo" name="/signIn" to="/signIn" class="nav-router-item">
                            <Icon type="md-person " size="16" />
                            <span>登入</span>
                            </MenuItem>
                            <MenuItem v-if="!uinfo" name="/signUp" to="/signUp" class="nav-router-item">
                            <Icon type="md-person-add" size="16" />
                            <span>注册</span>
                            </MenuItem>
                        </Menu>
                        <Poptip trigger="click" title="Title" content="content">
                            <Badge :count="2">
                                <span class="demo-badge cp">
                                    <Icon type="md-chatboxes" size="18" />
                                </span>
                            </Badge>
                        </Poptip>
                        <Dropdown v-if="uinfo" trigger="click" style="margin-bottom: 4px">
                            <span class="setting cp">
                                <Icon type="md-settings cl-hv" size="18" />
                            </span>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem disabled>豆汁儿</DropdownItem>
                                <DropdownItem>冰糖葫芦</DropdownItem>
                                <DropdownItem @click.native="signOut()" divided>退出</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Row>
                    </Col>
                    <Col :lg="8" :md="8" :sm="8" :xs="24" class="nav-left">
                    <Form class="nav-search">
                        <Input placeholder="搜索感兴趣的吧">
                        <Icon type="ios-search" slot="suffix" />
                        </Input>
                    </Form>
                    </Col>
                </Row>
                </Col>
                <!-- <Col :lg="6" :md="3" :sm="0" :xs="0" class="tal">
                <Dropdown trigger="hover">
                    <span class="setting cp">
                        <Icon type="md-settings cl-hv" size="24" />
                    </span>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem disabled>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem @click.native="signOut()" divided>退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </Col> -->
            </Row>
        </div>
    </div>
</template>

<script>
// mixin
import GReadInfo from "../mixins/GReadInfo";
import GetCurrentTime from "../mixins/GetCurrentTime";

// 依赖
import api from "../lib/api";
import session from "../lib/session";

export default {
    mixins: [GReadInfo],
    props: {
        defRouter: {
            default: "/"
        }
    },
    data() {
        return {
            allList: {
                notice: []
            },
            uinfo: session.uinfo()
        };
    },
    mounted() {
        this.readNotice();
    },
    methods: {
        // 获取通知
        readNotice() {
            this.gReadInfo("notice", {
                with: [
                    {
                        relation: "belongs_to",
                        model: "notice_tpl"
                    }
                ]
            }).then(res => {});
        },
        // 登出
        signOut() {
            session.signOut();
            // this.$router.push("/signIn");
            location.href = "/signIn";
        }
    }
};
</script>
