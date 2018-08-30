<style>
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
            </Menu>

            </Col>
            <Col :lg="21">
            <router-view></router-view>
            </Col>
        </Row>
    </div>
</template>

<script>
</script>
