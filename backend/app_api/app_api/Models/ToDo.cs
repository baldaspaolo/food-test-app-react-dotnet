using System.Text.Json.Serialization;

namespace app_api.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public List<Tasks> Tasks { get;}


    }
}
