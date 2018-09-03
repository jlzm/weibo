<script>
import api from "../lib/api";
export default {
    data() {
        return {
            allList: {}
        }
    },
    methods: {
        gReadInfo(model, condition) {
            model = this.model || model;
          return api.api(`${model}/read`, condition).then(res => {
                this.$set(this.allList, model, res.data || []);
                // this.allList[model] = res.data;
            })
        },
        // gRemoveItem()
    }
};
</script>