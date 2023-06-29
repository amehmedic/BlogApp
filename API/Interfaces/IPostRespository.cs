using API.Entities;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        void Update(Post post);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Post>> GetPostsAsync();
        Task<Post> GetPostIdAsync(int id);
    }
}