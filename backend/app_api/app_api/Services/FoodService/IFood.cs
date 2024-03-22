using app_api.Models;

namespace app_api.Services.FoodService
{
    public interface IFood
    {
        Task<List<Food>> GetFoodList();

        Task<Food> GetFoodById(int id);

        Task<List<Food>> AddFood(Food food);

        Task<List<Food>> UpdateFood(int id, Food food);

        Task<List<Food>> DeleteFood(int id);
    }
}
