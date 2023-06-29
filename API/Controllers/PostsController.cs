using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using System.Diagnostics;

namespace API.Controllers
{
    [Authorize]
    public class PostsController : BaseApiController
    {
        private readonly IPostRepository _postRepository;
        private readonly DataContext _context;
        private readonly IPhotoService _photoService;
        public PostsController(DataContext context, IPostRepository postRepository, IPhotoService photoService)
        {
            _context = context;
            _postRepository=postRepository;
            _photoService = photoService;
        }
        [HttpPost]
        public async Task<ActionResult<Post>> AddPost(Post post)
        {
            var newPost = new Post
            {
                Description=post.Description,
                NumberOfComments=post.NumberOfComments,
                NumberOfLikes=post.NumberOfLikes,
                PostPictureUrl=post.PostPictureUrl,
                UserId=post.UserId
            };
            _context.Posts.Add(newPost);
            await _context.SaveChangesAsync();
            return Ok("Post created successfully");
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            var posts = await _postRepository.GetPostsAsync();
            return Ok(posts);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            return await _postRepository.GetPostIdAsync(id);
        }
    }
}