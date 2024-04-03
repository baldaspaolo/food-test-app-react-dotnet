using System.Text.Json.Serialization;

namespace app_api.Models
{
    public class ToDo
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public DateTime Date { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public List<Tasks>? Tasks { get;}
        


    }
}
