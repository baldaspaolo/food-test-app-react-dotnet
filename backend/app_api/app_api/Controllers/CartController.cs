using app_api.Services.CartService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        public readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<ActionResult<Cart>> GetUserCart(int id)
        {
            var res = await _cartService.GetUserCart(id);
            if (res == null)
                return NotFound();
            return Ok(res);
        }
    }
}
