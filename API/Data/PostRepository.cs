using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        public PostRepository(DataContext context)
        {
            _context=context;
        }
        public async Task<Post> GetPostIdAsync(int id)
        {
            return await _context.Posts.FindAsync(id);
        }

        public async Task<IEnumerable<Post>> GetPostsAsync()
        {
            return await _context.Posts.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Post post)
        {
            _context.Entry(post).State=EntityState.Modified;
        }
    }
}