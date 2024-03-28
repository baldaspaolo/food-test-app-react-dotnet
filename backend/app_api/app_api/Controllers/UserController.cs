using app_api.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var res = await _userService.GetUser(id);
            if (res == null) 
            { 
                return NotFound();
            }
            return Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult<User>> GetUserLogin(string email, string password)
        {
            var res = await _userService.GetUserLogin(email, password);
            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser(User newUser)
        {
            try
            {
                var registeredUser = await _userService.RegisterUser(newUser);
                return Ok(registeredUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>>EditUser(int id, User user)
        {
            var res = await _userService.EditUser(id, user);
            if (res == null)
                return NotFound();
            return Ok(res);
        }

        [HttpPost("password/{id}")]
        public async Task<ActionResult<User>> CheckUserPassword(int id, [FromBody] string password)
        {
            var user = await _userService.CheckUserPassword(id, password);
            if (user == null)
                return NotFound();

            return Ok(user);
        }




    }
}
