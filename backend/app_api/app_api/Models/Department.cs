using System.Text.Json.Serialization;

namespace app_api.Models
{
    public class Department
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        [JsonIgnore]
        public List<User>? Users { get; set; }
    }
}
