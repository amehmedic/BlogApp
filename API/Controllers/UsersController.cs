using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
            _mapper=mapper;
            _userRepository = userRepository;
            _photoService = photoService;
        }
        [AllowAnonymous]
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