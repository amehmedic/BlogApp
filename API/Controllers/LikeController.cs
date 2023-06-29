using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class LikeController : BaseApiController
    {
        private readonly DataContext _context;
        public LikeController(DataContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<Like>> AddLike(Like like)
        {
            var newLike = new Like
            {
                PostId=like.PostId
            };
            _context.Likes.Add(newLike);
            await _context.SaveChangesAsync();
            return Ok("Like created successfully");
        }
    }
}