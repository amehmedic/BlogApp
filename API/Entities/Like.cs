namespace API.Entities
{
    public class Like
    {       
        public int Id { get; set; } // Primary key
        public int PostId { get; set; } // Foreign key
        public int UserId { get; set; } // Foreign key
    }
}