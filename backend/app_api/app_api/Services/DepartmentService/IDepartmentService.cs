namespace app_api.Services.DepartmentService
{
    public interface IDepartmentService
    {
        Task<List<Department>> GetDepartments();

        Task<Department> GetDepartmentById(int id);
    }
}
