
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace backend.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public UserService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            
        }
        

        public async Task<ServiceResponse<List<GetUserDto>>> AddUser(AddUserDto newUser)
        {
            var ServiceResponse = new ServiceResponse<List<GetUserDto>>();
            var user = _mapper.Map<User>(newUser);
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            ServiceResponse.Data = await _context.Users.Select(c => _mapper.Map<GetUserDto>(c)).ToListAsync();
            return ServiceResponse;
        }

        public async Task<ServiceResponse<List<GetUserDto>>> DeleteUser(int id)
        {
            var ServiceResponse = new ServiceResponse<List<GetUserDto>>();
            try 
            {
            var user = await _context.Users.FirstOrDefaultAsync(c => c.Id == id);
            if (user == null){
                throw new Exception("User with id" + id + "not found");
            }
            _context.Users.Remove(user);
            
            await _context.SaveChangesAsync();

            ServiceResponse.Data = await _context.Users.Select(c => _mapper.Map<GetUserDto>(c)).ToListAsync();
            }
            catch(Exception ex)
            {
                ServiceResponse.Success = false;
                ServiceResponse.Message = ex.Message;
            }
            return ServiceResponse;
        }

        public async Task<ServiceResponse<List<GetUserDto>>> GetAllUsers()
        {
            var ServiceResponse = new ServiceResponse<List<GetUserDto>>();
            var dbUsers = await _context.Users.ToListAsync();
            ServiceResponse.Data = dbUsers.Select(c => _mapper.Map<GetUserDto>(c)).ToList();
            return ServiceResponse;
        }

        public async Task<ServiceResponse<GetUserDto>> GetUserById(int id)
        {
            var ServiceResponse = new ServiceResponse<GetUserDto>();
            var dbUser = await _context.Users.FirstOrDefaultAsync(c => c.Id == id);
            ServiceResponse.Data = _mapper.Map<GetUserDto>(dbUser);
            return ServiceResponse;
            
        }

        public async Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto updatedUser)
        {
            var ServiceResponse = new ServiceResponse<GetUserDto>();
            try 
            {
            var user = await _context.Users.FirstOrDefaultAsync(c => c.Id == updatedUser.Id);
            if (user == null){
                throw new Exception("User with id" + updatedUser.Id + "not found");
            }
            _mapper.Map(updatedUser, user);
            user.Username = updatedUser.Username;
            user.Email = updatedUser.Email;
            user.Phone = updatedUser.Phone;
            
            await _context.SaveChangesAsync();
            ServiceResponse.Data = _mapper.Map<GetUserDto>(user);
            }
            catch(Exception ex)
            {
                ServiceResponse.Success = false;
                ServiceResponse.Message = ex.Message;
            }
            return ServiceResponse;
        }
    }
}