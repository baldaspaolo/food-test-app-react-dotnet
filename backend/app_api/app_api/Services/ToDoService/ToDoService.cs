
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

        public async Task<ToDo> AddToDo(ToDo toDo)
        {
            _dataContext.ToDos.Add(toDo);
            await _dataContext.SaveChangesAsync();

            return toDo;
        }

        public async Task<List<ToDo>> GetToDos()
        {
            var todos = await _dataContext.ToDos.Include(t => t.Tasks).ToListAsync();
            return todos;
        }

        public async Task<ToDo> RemoveToDo(int id)
        {
            var todos = await _dataContext.ToDos.FindAsync(id);
            if (todos == null)
            {
                return null;
            }
            _dataContext.ToDos.Remove(todos);
            await _dataContext.SaveChangesAsync();

            return todos;
        }
    }
}