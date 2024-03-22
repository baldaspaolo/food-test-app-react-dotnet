
using Microsoft.EntityFrameworkCore;

namespace app_api.Services.UserService
{
    public class UserService : IUserService
    {

        private readonly DataContext _dataContext;

        public UserService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<User> GetUser(int userId)
        {
            var user = await _dataContext.Users
                                 .Include(u => u.Department)
                                 .FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
                return null;
            return user;
        }

        public async Task<User> GetUserLogin(string email, string password)
        {
            var existingUser = await _dataContext.Users
                                                 .FirstOrDefaultAsync(u => u.Email == email);

            
            if (existingUser == null || !VerifyPassword(existingUser.Password, password))
            {
                return null;
            }

            return existingUser;
        }

        public async Task<User> RegisterUser(User newUser)
        {
            var department = await _dataContext.Departments.FindAsync(newUser.DepartmentId);
            if (department == null)
            {
  
                throw new Exception("Department not found");
            }
            _dataContext.Users.Add(newUser);
            await _dataContext.SaveChangesAsync();

            return newUser;
        }

        private bool VerifyPassword(string storedPassword, string providedPassword)
        {
       
            return storedPassword == providedPassword; 
        }
    }
}
