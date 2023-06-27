namespace API.Entities
{
    public class MemberDto
    {

        public int UserId { get; set; }
        public string UserName { get; set; }
        public string ProfilePictureUrl { get; set; }
        public PhotoDto ProfilePicture { get; set; }
    }
}