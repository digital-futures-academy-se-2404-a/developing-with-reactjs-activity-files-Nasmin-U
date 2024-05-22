import axios from 'axios';

export const getTodosService = async () => {
    try {
        const res = await axios.get(import.meta.env.VITE_APP_TODOSURL);
        if (res.data?.length > 0) {
            // Added for SQL databases
            res.data.forEach(todo => {
                if (todo?.id) {
                    delete Object.assign(todo, { [`_id`]: todo[`id`].toString() })[`id`];
                }
            });   
            return res.data;
        }
        throw new Error(`There are no todos stored`);
    }
    catch (e) {
        return e;
    }
}

export const submitTodoService = async submittedTodo => {
    try {
        // Added for SQL databases - using parseInt may return a number if the string begins with one!
        if (!isNaN(Number(submittedTodo?._id))) {
            delete Object.assign(submittedTodo, { [`id`]: parseInt(submittedTodo[`_id`]) })[`_id`];
        }
        // Changed for SQL databases
        const res = submittedTodo?._id || submittedTodo?.id ?
            await axios.put(`${import.meta.env.VITE_APP_TODOSURL}/${submittedTodo?._id ?? submittedTodo?.id}`, submittedTodo)
            :
            await axios.post(import.meta.env.VITE_APP_TODOSURL, submittedTodo);
        return { todo: res.data };
    } catch (e) {
        return e;
    }
}