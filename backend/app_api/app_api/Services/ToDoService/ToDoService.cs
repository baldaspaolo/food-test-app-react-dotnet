
using Microsoft.EntityFrameworkCore;

namespace app_api.Services.ToDoService
{
    public class ToDoService : IToDoService
    {
        private readonly DataContext _dataContext;

        public ToDoService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<ToDo>> GetToDos()
        {
            var todos = await _dataContext.ToDos.Include(t => t.Tasks).ToListAsync();
            return todos;
        }

    }
}