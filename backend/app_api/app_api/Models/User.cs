using System.Text.Json.Serialization;

namespace app_api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Email { get; set; }
        public string? Password { get; set; }

        public string? Role { get; set; }

        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Region { get; set; }

        public string? Country { get; set; }

        public string? Phone { get; set; }

        public int? DepartmentId { get; set; } 
  
        public Department? Department { get; set; }

        public List<ToDo>? ToDos { get; set; }

        public Cart? Cart { get; set; }



    }
}
