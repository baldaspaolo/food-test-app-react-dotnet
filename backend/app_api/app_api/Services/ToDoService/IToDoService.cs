namespace app_api.Services.ToDoService
{
    public interface IToDoService
    {
        Task<List<ToDo>> GetToDos();
    }
}
