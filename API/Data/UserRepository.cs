using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper=mapper;
            _context=context;
        }
        public async Task<MemberDto> GetMemberAsync(string idoruser)
        {
            return await _context.Users.Where(x=>x.UserName==idoruser || x.UserId.ToString()==idoruser).ProjectTo<MemberDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }
        public async Task<MemberDto> GetMemberAsyncId(int id)
        {
            return await _context.Users.Where(x=>x.UserId==id).ProjectTo<MemberDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }
        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.Users.ProjectTo<MemberDto>(_mapper.ConfigurationProvider).ToListAsync();
        }
        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<User> GetUserIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
             return await _context.Users.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
             return await _context.SaveChangesAsync() > 0;
        }

        public void Update(User user)
        {
             _context.Entry(user).State=EntityState.Modified;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
        var user = _context.Users.FirstOrDefault(u => u.UserId==id);
        if(user == null)
        {
            return false;
        }
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
        }
    }
}