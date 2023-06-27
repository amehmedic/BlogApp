using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        [Key]
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string UserEmail { get; set; }

        public byte[] PasswordHash {get; set; }
        
        public byte[] PasswordSalt {get; set; }

        public Photo ProfilePicture { get; set; }
    }
}