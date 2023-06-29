namespace API.Entities
{
    public class Comment
    {
        public int Id { get; set; } // Primary key
        public string Content { get; set; }

        public int UserId { get; set; } // Foreign key

        public int PostId { get; set; } // Foreign key
    }
}