namespace app_api.Services.ToDoService
{
    public interface IToDoService
    {
        Task<List<ToDo>> GetToDos();

        Task<ToDo> AddToDo(ToDo toDo);

        Task<ToDo> RemoveToDo(int id);

     
    }
}
