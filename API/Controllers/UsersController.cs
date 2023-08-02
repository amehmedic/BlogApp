
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using API.DTOs;
using API.Data;
using API.Services;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public UsersController(DataContext context, ITokenService tokenService, IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _mapper=mapper;
            _userRepository = userRepository;
            _photoService = photoService;
            _context = context;
            _tokenService = tokenService;
        }
        [AllowAnonymous]
        [HttpPost("register")] // POST: api/users/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await _userRepository.GetUserByUsernameAsync(registerDto.Username)!=null)
            {
                return BadRequest("Username is taken");
            }
            using var hmac = new HMACSHA512();
            var user = new User
            {
                UserName = registerDto.Username.ToLower(),
                UserEmail = registerDto.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto
            {
                Username=user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
        [AllowAnonymous]
        [HttpPost("login")] // POST: api/users/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(AppUser => AppUser.UserName==loginDto.Username.ToLower());
            if(user==null)
            {
                return Unauthorized("Invalid username");
            }
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            for(int i=0; i<computeHash.Length; i++)
            {
                if(computeHash[i]!=user.PasswordHash[i])
                {
                    return Unauthorized("Invalid password");
                }
            }
            return new UserDto
            {
                Username=user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }
        [HttpDelete("{id}")] // POST: api/account/delete/id
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userRepository.GetUserIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var deleted = await _userRepository.DeleteUserAsync(id);
            if (!deleted)
            {
                return StatusCode(500, "User deletion failed.");
            }
            return NoContent();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }
        [HttpGet("{idoruser}")] 
        public async Task<ActionResult<MemberDto>> GetUser(string idoruser)
        {
            return await _userRepository.GetMemberAsync(idoruser);
        }
        [HttpPost("upload-photo")]
        public async Task<ActionResult<string>> UplaodPhoto(IFormFile file)
        {

            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            if(user == null) return NotFound();
            var result = await _photoService.AddPhotoAsync(file);
            if(result.Error != null) return BadRequest(result.Error.Message);
            var photoUrl = result.SecureUrl.AbsoluteUri;
            user.ProfilePictureUrl=photoUrl;
            if(await _userRepository.SaveAllAsync())
            {
                return CreatedAtAction(nameof(GetUser), new {username=user.UserName}, photoUrl);
            }
            return BadRequest("Problem uploading photo");
        }
    }
}