using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Post
    {
        [Key]
        public int Id { get; set; } // Primary key
        public string Description { get; set; }
        public int NumberOfLikes { get; set; }
        public int NumberOfComments { get; set; }
        public string PostPictureUrl { get; set; }
        public int UserId { get; set; } // Foreign key
    }
}