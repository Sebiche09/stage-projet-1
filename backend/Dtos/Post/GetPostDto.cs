using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Post
{
    public class GetPostDto
    {
        public int Id { get; set; } 
        public string Description { get; set; } = string.Empty;
        public int Like { get; set; } = 0;
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        
    }
}