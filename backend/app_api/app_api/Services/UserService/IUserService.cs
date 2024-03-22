namespace app_api.Services.UserService
{
    public interface IUserService
    {
        Task<User> GetUser(int userId);

        Task<User> GetUserLogin(string email, string password);

        Task<User> RegisterUser(User user);


    }
}
