using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Post
{
    public class UpdatePostDto
    {
        public int Id { get; set; } 
        public string Description { get; set; } = "admin";
        public int Like { get; set; } = 2;
        
    }
}