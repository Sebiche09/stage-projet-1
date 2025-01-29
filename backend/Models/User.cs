using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; } 
        public string Username { get; set; } = "admin";
        public string Password { get; set; } = "admin";
        public string Email { get; set; } = "test";
        public string Phone { get; set; } = "test";

        
    }
}