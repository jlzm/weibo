<style>

/* iview样式重置 */



/* search */

.weibo-nav-items {
    height: 37px;
    line-height: 37px;
}

/* iview Card Reset*/
.weibo-nav-item.ivu-menu-item {
    padding: 0 10px;
}

.weibo-nav-items.ivu-menu .weibo-nav-item.ivu-menu-item,
.weibo-nav-items.ivu-menu .weibo-nav-item.ivu-menu-submenu {
    border: 0;
}

.weibo-nav-items.ivu-menu .weibo-nav-item.ivu-menu-item:hover,
.weibo-nav-items.ivu-menu .weibo-nav-item.ivu-menu-submenu:hover {
    border: 0;
}

.weibo-form.ivu-form-item {
    margin: 0;
}

/* iview Card Reset End*/

/* search End*/
</style>

<template>
    <div>
        <Card class="weibo-nav-card card-mgb">
            <Row :gutter="20" type="flex" align="middle" class="weibo-nav-wrap">
                <Col :md="12" :sm="12" :xs="24">
                <Menu mode="horizontal" theme="light" class="weibo-nav-items dib">
                    <MenuItem name="1" class="weibo-nav-item">
                    <span>全部</span>
                    </MenuItem>
                    <Submenu name="2" class="weibo-nav-item">
                        <template slot="title">
                            <span>原创</span>
                        </template>
                        <MenuItem name="3-1">图片</MenuItem>
                        <MenuItem name="3-2">视频</MenuItem>
                        <MenuItem name="3-3">音乐</MenuItem>
                        <MenuItem name="3-3">文章</MenuItem>
                    </Submenu>
                </Menu>
                </Col>
                <Col :md="12" :sm="12" :xs="24">
                <AutoComplete icon="ios-search" placeholder="搜索关注人的微博">
                </AutoComplete>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
</script>

