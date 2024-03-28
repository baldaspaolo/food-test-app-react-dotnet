using app_api.Services.DepartmentService;
using app_api.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _departmentsService;

        public DepartmentsController(IDepartmentService departmentsService)
        {
            _departmentsService = departmentsService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Department>>> GetDepartments() 
        {
            return await _departmentsService.GetDepartments();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Department>>> GetDepartments(int id)
        {
            var res = await _departmentsService.GetDepartmentById(id);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);

        }
    }
}