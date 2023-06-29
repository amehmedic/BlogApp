using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    
    public class CommentController : BaseApiController
    {
        private readonly DataContext _context;
        public CommentController(DataContext context)
        {
            _context = context;
        }
        [HttpPost]
        public async Task<ActionResult<Comment>> AddComment(Comment comment)
        {
            var newComment = new Comment
            {
                Content=comment.Content,
                UserId=comment.UserId,
                PostId=comment.PostId,
            };
            _context.Comments.Add(newComment);
            await _context.SaveChangesAsync();
            return Ok("Comment created successfully");
        }
    }
}