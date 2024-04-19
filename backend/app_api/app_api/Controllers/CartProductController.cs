using app_api.Models;
using app_api.Services.CartPorduct;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartProductController : ControllerBase
    {
        private readonly ICartProductService _cartProductService;

        public CartProductController(ICartProductService cartProductService)
        {
            _cartProductService = cartProductService;
        }

        [HttpGet]
        public async Task<ActionResult<CartProduct>> GetCartProducts(int id)
        {
            var res = await _cartProductService.GetCartProducts(id);
            if (res == null)
                return NotFound();

            return Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult<CartProduct>> AddCartPorducts(CartProduct cartProduct)
        {
            var res = await _cartProductService.AddProducts(cartProduct);
            if (res == null)
                return NotFound();
            return Ok(res);
        }

        [HttpDelete]
        public async Task<ActionResult<CartProduct>> DeleteProductCard(int cartId, int productId)
        {
            var res = await _cartProductService.DeleteProductCard(cartId, productId);
            if (res == null)
                return NotFound();
            return Ok(res);

        }

        [HttpPut]
        public async Task<ActionResult<CartProduct>> AdjustQuantityProduct(int cartId, int productId, int quantity)
        {
            var res = await _cartProductService.AdjustQuantityProduct(cartId, productId, quantity);
            if (res == null)
                return NotFound();
            return Ok(res);
        }

        [HttpDelete("delete")]
        public async Task<string> DeleteCartProducts(int cartId)
        {
            var res = await _cartProductService.DeleteCartProducts(cartId);

            if (res == null)
                return ("Fail");
            return ("Ok");
        }
    }
}

