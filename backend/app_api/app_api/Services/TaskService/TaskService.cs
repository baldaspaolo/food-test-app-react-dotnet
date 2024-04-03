

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace app_api.Services.TaskService
{
    public class TaskService : ITaskService
    {
        private readonly DataContext _dataContext;

        public TaskService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Tasks> AddTaskToToDo(Tasks task)
        {
            _dataContext.Tasks.Add(task);
            await _dataContext.SaveChangesAsync();
            return task;
        }

        public async Task<Tasks> DeleteTask(int id)
        {
            var task = await _dataContext.Tasks.FindAsync(id);
            if (task == null)
                return null;

            _dataContext.Tasks.Remove(task);
            await _dataContext.SaveChangesAsync();

            return task;
        }

        public async Task<Tasks> SetCompleted(int id)
        {
            var getTask = await _dataContext.Tasks.FindAsync(id);
            if (getTask == null)
                return null;
            getTask.Completed = true;
            await _dataContext.SaveChangesAsync();

            return getTask;

            
            
        }
    }
}
