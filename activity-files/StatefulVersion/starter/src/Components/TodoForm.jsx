import DateCreated from './utils/DateCreated';

const TodoForm = () => {

  return (
    <form aria-label="form">
      <div className="form-group">
        <label htmlFor="todoDescription">Description:&nbsp;</label>
        <input type="text" className="form-control" name="todoDescription" id="todoDescription" placeholder="Todo Description" />
      </div>
      <div className="form-group">
        <label htmlFor="todoDateCreated">Created on:&nbsp;</label>
        <DateCreated />
      </div>
      <div className="form-group">
        <label htmlFor="todoCompleted">Completed:&nbsp;</label>
        <input type="checkbox" name="todoCompleted" id="todoCompleted" />    
      </div>
      <div className="form-group">
        <input type="submit" className="btn btn-primary" value="Submit" />
      </div>
    </form>
  );
};

export default TodoForm;