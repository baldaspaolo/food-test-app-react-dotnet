using app_api.Services.TaskService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost]
        public async Task<ActionResult<Tasks>> AddTaskToToDo(Tasks task)
        {
            var res = await _taskService.AddTaskToToDo(task);
            if (res == null)
                return NotFound();
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Tasks>> DeleteTask(int id)
        {
            var res = await _taskService.DeleteTask(id);
            if (res == null)
                return NotFound();
            return Ok(res);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Tasks>> SetCompleted(int id)
        {
            var res = await _taskService.SetCompleted(id);
            if (res == null)
                return NotFound();
            return Ok(res);
        }


    }
}
