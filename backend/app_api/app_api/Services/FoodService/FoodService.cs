using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.EntityFrameworkCore;
using app_api.Models;

namespace app_api.Services.FoodService
{
    public class FoodService : IFood
    {
        private readonly DataContext _dbContext;

        public FoodService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Food>> AddFood(Food food)
        {
            _dbContext.Foods.Add(food);
            await _dbContext.SaveChangesAsync();
            return await _dbContext.Foods.ToListAsync();
        }

        public async Task<List<Food>> DeleteFood(int id)
        {
            var food = await _dbContext.Foods.FindAsync(id);
            if (food == null)
                return null;
            _dbContext.Foods.Remove(food);
            await _dbContext.SaveChangesAsync();

            return await _dbContext.Foods.ToListAsync();

        }

        public async Task<Food> GetFoodById(int id)
        {
            var food = await _dbContext.Foods.FindAsync(id);
            if (food == null)
                return null;
            return food;

        }

        public async Task<List<Food>> GetFoodList()
        {
            var foods = await _dbContext.Foods.ToListAsync();
            return foods;
        }

        public async Task<List<Food>> UpdateFood(int id, Food food)
        {
            var foods = await _dbContext.Foods.FindAsync(id);
            if (foods == null)
                return null;

            foods.Name = food.Name;
            foods.Price = food.Price;
            foods.Description = food.Description;

            await _dbContext.SaveChangesAsync();

            return await _dbContext.Foods.ToListAsync();
        }
    }
}
