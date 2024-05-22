import axios from 'axios';

export const getTodosService = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_APP_TODOSURL);
        if (res.data?.length > 0) return res.data;
        throw new Error(`There are no todos stored`);
    }
    catch (e) {
        return e;
    }
}