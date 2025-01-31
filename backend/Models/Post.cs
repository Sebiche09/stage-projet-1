using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; } 
        public string Description { get; set; } = "admin";
        public int Like { get; set; } = 2;
        public int UserId { get; set; }
        public User? User { get; set; }
        
    }
}