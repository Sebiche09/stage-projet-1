
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace backend.Services.PostService
{
    public class PostService : IPostService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public PostService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
            
        }
        public async Task<ServiceResponse<List<GetPostDto>>> AddPost(AddPostDto newPost)
        {
            var serviceResponse = new ServiceResponse<List<GetPostDto>>();

            var user = await _context.Users.FindAsync(newPost.UserId);
            if (user == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Utilisateur non trouvé.";
                return serviceResponse;
            }
            var post = _mapper.Map<Post>(newPost);
            
            post.UserId = newPost.UserId;
            post.User = user;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.Posts
                .Include(p => p.User) 
                .Select(p => new GetPostDto
                {
                    Id = p.Id,
                    Description = p.Description,
                    Like = p.Like,
                    UserId = p.UserId,
                    Username = p.User != null ? p.User.Username : "Utilisateur inconnu"
                })
                .ToListAsync();

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetPostDto>>> DeletePost(int id)
        {
            var ServiceResponse = new ServiceResponse<List<GetPostDto>>();
            try 
            {
            var post = await _context.Posts.FirstOrDefaultAsync(c => c.Id == id);
            if (post == null){
                throw new Exception("Post with id" + id + "not found");
            }
            _context.Posts.Remove(post);
            
            await _context.SaveChangesAsync();

            ServiceResponse.Data = await _context.Posts.Select(c => _mapper.Map<GetPostDto>(c)).ToListAsync();
            }
            catch(Exception ex)
            {
                ServiceResponse.Success = false;
                ServiceResponse.Message = ex.Message;
            }
            return ServiceResponse;
        }

        public async Task<ServiceResponse<List<GetPostDto>>> GetAllPosts()
        {
            var serviceResponse = new ServiceResponse<List<GetPostDto>>();

            var dbPosts = await _context.Posts
                .Include(p => p.User) 
                .ToListAsync();

            serviceResponse.Data = dbPosts.Select(p => new GetPostDto
            {
                Id = p.Id,
                Description = p.Description,
                Like = p.Like,
                UserId = p.UserId, 
                Username = p.User != null ? p.User.Username : "Utilisateur inconnu"
            }).ToList();

            return serviceResponse;
        }


        public async Task<ServiceResponse<List<GetPostDto>>> GetPostsByUserId(int userId)
        {       
            var serviceResponse = new ServiceResponse<List<GetPostDto>>();

            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Utilisateur non trouvé.";
                return serviceResponse;
            }

            var dbPosts = await _context.Posts
                .Where(p => p.UserId == userId)
                .Include(p => p.User)
                .ToListAsync();

            serviceResponse.Data = dbPosts.Select(p => new GetPostDto
            {
                Id = p.Id,
                Description = p.Description,
                Like = p.Like,
                UserId = p.UserId,
                Username = p.User != null ? p.User.Username : "Utilisateur inconnu"
            }).ToList();

            return serviceResponse;
        }



        public async Task<ServiceResponse<GetPostDto>> UpdatePost(UpdatePostDto updatedPost)
        {
            var ServiceResponse = new ServiceResponse<GetPostDto>();
            try 
            {
            var post = await _context.Posts.FirstOrDefaultAsync(c => c.Id == updatedPost.Id);
            if (post == null){
                throw new Exception("Post with id" + updatedPost.Id + "not found");
            }
            _mapper.Map(updatedPost, post);
            post.Description = updatedPost.Description;
            post.Like = updatedPost.Like;
            
            await _context.SaveChangesAsync();
            ServiceResponse.Data = _mapper.Map<GetPostDto>(post);
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