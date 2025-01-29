
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace backend.Services.UserService
{
    public class UserService : IUserService
    {
        private static List<User> users = new List<User> {
            new User(),
            new User { Id = 1, Username = "user", Password = "user", Email = "user", Phone = "user" }
        };
        private readonly IMapper _mapper;

        public UserService(IMapper mapper)
        {
            _mapper = mapper;
        }
        public async Task<ServiceResponse<List<GetUserDto>>> AddUser(AddUserDto newUser)
        {
            var ServiceResponse = new ServiceResponse<List<GetUserDto>>();
            var user = _mapper.Map<User>(newUser);
            user.Id = users.Max(c => c.Id) + 1;
            users.Add(user);
            ServiceResponse.Data = users.Select(c => _mapper.Map<GetUserDto>(c)).ToList();
            return ServiceResponse;
        }

        public async Task<ServiceResponse<List<GetUserDto>>> DeleteUser(int id)
        {
            var ServiceResponse = new ServiceResponse<List<GetUserDto>>();
            try 
            {
            var user = users.FirstOrDefault(c => c.Id == id);
            if (user == null){
                throw new Exception("User with id" + id + "not found");
            }
            users.Remove(user);
            
            
            ServiceResponse.Data = users.Select(c => _mapper.Map<GetUserDto>(c)).ToList();
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
            ServiceResponse.Data = users.Select(c => _mapper.Map<GetUserDto>(c)).ToList();
            return ServiceResponse;
        }

        public async Task<ServiceResponse<GetUserDto>> GetUserById(int id)
        {
            var ServiceResponse = new ServiceResponse<GetUserDto>();
            var user = users.FirstOrDefault(c => c.Id == id);
            ServiceResponse.Data = _mapper.Map<GetUserDto>(user);
            return ServiceResponse;
            
        }

        public async Task<ServiceResponse<GetUserDto>> UpdateUser(UpdateUserDto updatedUser)
        {
            var ServiceResponse = new ServiceResponse<GetUserDto>();
            try 
            {
            var user = users.FirstOrDefault(c => c.Id == updatedUser.Id);
            if (user == null){
                throw new Exception("User with id" + updatedUser.Id + "not found");
            }
            _mapper.Map(updatedUser, user);
            user.Username = updatedUser.Username;
            user.Password = updatedUser.Password;
            user.Email = updatedUser.Email;
            user.Phone = updatedUser.Phone;
            
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