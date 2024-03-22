
using Microsoft.EntityFrameworkCore;

namespace app_api.Services.DepartmentService
{
    public class DepartmentService : IDepartmentService
    {
        private readonly DataContext _departmentContext;

        public DepartmentService(DataContext departmentContext)
        {
            _departmentContext = departmentContext;
        }

        public async Task<Department> GetDepartmentById(int id)
        {
            var department = await _departmentContext.Departments.FindAsync(id);
            return department;
        }

        public async Task<List<Department>> GetDepartments()
        {
            var departments = await _departmentContext.Departments.ToListAsync();
            return departments;
        }


    }
}
