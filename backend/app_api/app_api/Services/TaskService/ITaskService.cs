namespace app_api.Services.TaskService
{
    public interface ITaskService
    {
        Task<Tasks> AddTaskToToDo(Tasks task);
        Task<Tasks> DeleteTask(int id);

        Task<Tasks> SetCompleted(int id);
    }
}
