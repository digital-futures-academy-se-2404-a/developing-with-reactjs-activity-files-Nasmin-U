import axiosMock from "axios";
import { getTodosService, submitTodoService } from "../src/services/todosdata.service";
import sampleTodos from '../src/sampleTodos.json';
import generateTodoId from '../src/Components/utils/generateId';

vi.mock('axios');

describe('External Data Tests', () => {
   
    let functionResult;   
    
    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getTodosService tests', () => {
    
        describe('Normal Data Returned', () => {

            const expectedReturn = { data: sampleTodos, status: 200 }

            beforeEach(async () => {
                axiosMock.get.mockResolvedValueOnce(expectedReturn);
                functionResult = await getTodosService();
            });

            test('should call axios.get once with supplied URL', async () => {
                expect(axiosMock.get).toHaveBeenCalledTimes(1);
                expect(axiosMock.get).toHaveBeenCalledWith(import.meta.env.VITE_TODOSURL);
            });

            test('should return sample todos when valid data is returned from server', async () => {
                expect(functionResult).toEqual(expect.arrayContaining(sampleTodos));
            });
        });

        describe('EmptyArray Returned', () => {
           
            test('should return an Error object with "There are no todos stored" in its message', async () => {
                const expectedReturn = { data: [], status: 200 };
                axiosMock.get.mockResolvedValueOnce(expectedReturn);
                functionResult = await getTodosService();

                expect(functionResult.message).toContain(`There are no todos stored`);
            });
        });

        describe('Error Returned', () => {
           
            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test GET Error`);
                axiosMock.get.mockRejectedValueOnce(expectedReturn);
                functionResult = await getTodosService();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        });
    });

    describe('submitTodoService tests', () => {
        describe('POST a new todo tests', () => {
            const testSubmittedTodo = {
                todoDescription: `New Test Todo`,
                todoDateCreated: new Date().toUTCString(),
                todoCompleted: false
            }
            
            const test_id = generateTodoId();

            test('should call axios post with correct URL and data', async () => {

                functionResult = await submitTodoService(testSubmittedTodo);

                expect(axiosMock.post).toHaveBeenCalledTimes(1);
                expect(axiosMock.post).toHaveBeenCalledWith(import.meta.env.VITE_TODOSURL, testSubmittedTodo);
                
            });

            test('should return the correct data with successful POST call', async () => {
                axiosMock.post.mockResolvedValueOnce({ data: { ...testSubmittedTodo, _id: test_id } });

                functionResult = await submitTodoService(testSubmittedTodo);
                
                expect(functionResult.todo).toEqual(expect.objectContaining({
                    ...testSubmittedTodo,
                    _id: test_id
                }));
            });
        });

        describe('POST Error Returned', () => {
           
            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test POST Error`);
                axiosMock.post.mockRejectedValueOnce(expectedReturn);
                functionResult = await submitTodoService();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        });
    });
});
