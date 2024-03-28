namespace app_api.Services.UserService
{
    public interface IUserService
    {
        Task<User> GetUser(int userId);

        Task<User> GetUserLogin(string email, string password);

        Task<User> RegisterUser(User user);

        Task<User> EditUser(int id, User user);

        Task<User> CheckUserPassword(int id, string password);


    }
}
