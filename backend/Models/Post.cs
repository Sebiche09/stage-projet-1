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
        public string Description { get; set; } = string.Empty;
        public int Like { get; set; } = 0;
        
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User? User { get; set; }
        
    }
}