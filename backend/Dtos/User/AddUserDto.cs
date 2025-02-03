using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.User
{
    public class AddUserDto
    {
        public string Username { get; set; } = "admin";
        public string Email { get; set; } = "test";
        public string phone { get; set; } = "test";
    }
}