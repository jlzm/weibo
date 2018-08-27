<script>
export default {
    methods: {
        // 获取系统当前时间
        getCurrentTime() {
            let date = new Date();
            let y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate(),
                h = date.getHours(),
                min = date.getMinutes(),
                s = date.getSeconds();
            if (date.getMonth() < 10) {
                m = "0" + m;
            }
            if (date.getDate() < 10) {
                d = "0" + d;
            }
            if (date.getHours() < 10) {
                h = "0" + h;
            }
            if (date.getMinutes() < 10) {
                min = "0" + min;
            }
            if (date.getSeconds() < 10) {
                s = "0" + s;
            }
            return `${y}-${m}-${d} ${h}:${min}:${s}`;
        }
    }
};
</script>