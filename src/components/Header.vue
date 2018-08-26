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
    padding-right: 40px;
}

.setting {
    margin-left: 10px;
}

/* iview 样式重置 */

.nav-router-items {
    height: 47px;
    line-height: 47px;
}

.ivu-menu::after {
    height: 0;
}

.nav-router-item.ivu-menu-item {
    border: 0;
    padding: 0 7px;
    margin: 0 4px;
    font-size: 1.1rem;
}

.nav-router-item.ivu-menu-item:hover {
    border: 0;
}
</style>

<template>
    <div>
        <div class="header">
            <Row type="flex" class="nav-wrap" align="middle">
                <Col :lg="12" :md="16" :sm="20" :xs="24" class="container">
                <Row :gutter="20" type="flex" class="nav" align="middle">
                    <Col :lg="4" :md="4" :sm="4" :xs="24" class="logo">
                    <router-link to="/">
                        Logooooooooooo
                    </router-link>
                    </Col>
                    <Col :lg="12" :md="12" :sm="12" :xs="24" class="nav-right">
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
                        <Dropdown trigger="hover">
                            <span class="setting cp">
                                <Icon type="md-settings cl-hv" size="20" />
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
                    <AutoComplete icon="ios-search" placeholder="input here">
                    </AutoComplete>
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
// 依赖
import session from "../lib/session";
export default {
    props: {
        defRouter: {
            default: "/"
        }
    },
    data() {
        return {
            uinfo: session.uinfo()
        };
    },
    methods: {
        signOut() {
            session.signOut();
            this.$router.push("/signIn");
        }
    }
};
</script>
