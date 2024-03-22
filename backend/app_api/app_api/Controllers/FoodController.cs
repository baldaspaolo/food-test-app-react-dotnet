using app_api.Models;
using app_api.Services.FoodService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly IFood _food;

        public FoodController(IFood foodService)
        {
            _food = foodService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Food>>> GetFoodList()
        {
            return await _food.GetFoodList();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Food>> GetFoodById(int id)
        {
            var res = await _food.GetFoodById(id);
            if (res == null)
                return NotFound();
            return Ok(res);   
        }

        [HttpPost]
        public async Task<ActionResult<List<Food>>> AddFood(Food food)
        {
            var res = await _food.AddFood(food);
            return Ok(res);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Food>>> UpdateFood(int id, Food food)
        {
            var res = await _food.UpdateFood(id, food);
            if (res == null)
                return NotFound();
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Food>>> DeleteFood(int id)
        {
            var res = await _food.DeleteFood(id);
            if(res == null)
                return NotFound();
            return Ok(res);
        }


    }
}
