using app_api.Services.ToDoService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoService _service;

        public ToDoController(IToDoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<ToDo>>> GetToDos()
        {
            var res = await _service.GetToDos();
            if (res == null)
                return NotFound();
            return Ok(res);
        }
    }
}