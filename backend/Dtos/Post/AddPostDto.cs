using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Post
{
    public class AddPostDto
    {
        public string Description { get; set; } = string.Empty;
        public int Like { get; set; } = 0;
        public int UserId { get; set; } 
    }
}