<style scoped>

.admin-content {
    padding: 25px;
}

</style>

<template>
    <div>
        <Row :gutter="18">
            <Col :lg="3">
            <Menu active-name="1-2" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-analytics" />
                        <span>模板管理</span>
                    </template>
                    <MenuItem name="1-1" to="/noticeTpl">通知</MenuItem>
                    <MenuItem name="1-2" to="/announceTpl">通告</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-analytics" />
                        <span>用户管理</span>
                    </template>
                    <MenuItem name="2-1" to="/user">账号信息</MenuItem>
                    <MenuItem name="2-2" to="/test">测试</MenuItem>
                </Submenu>
            </Menu>

            </Col>
            <Col :lg="21">
                <div class="admin-content">
                    <router-view></router-view>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
</script>
