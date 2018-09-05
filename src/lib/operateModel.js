import api from './api';

const getCount = (model, obj, condition) => {
    return api.api(`${model}/count`, condition)
        .then(res => {
            obj[model] = res.data;
        })
}

export default {
    getCount
}