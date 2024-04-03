namespace app_api.Models
{
    public class Tasks
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public bool Completed { get; set; }

        public int ToDoId { get; set; }
        public ToDo? ToDo { get; set; }


    }
}
