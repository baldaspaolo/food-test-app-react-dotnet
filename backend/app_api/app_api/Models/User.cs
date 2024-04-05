using System.Text.Json.Serialization;

namespace app_api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Email { get; set; }
        public string? Password { get; set; }

        public string? Role { get; set; }

        public int? DepartmentId { get; set; } 
  
        public Department? Department { get; set; }

        public List<ToDo>? ToDos { get; set; }
        public List<Receipt>? Receipts { get; set; }


    }
}
