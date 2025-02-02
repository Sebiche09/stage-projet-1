
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
            var ServiceResponse = new ServiceResponse<List<GetPostDto>>();
            var post = _mapper.Map<Post>(newPost);
            
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            ServiceResponse.Data = await _context.Posts.Select(c => _mapper.Map<GetPostDto>(c)).ToListAsync();
            return ServiceResponse;
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
            var ServiceResponse = new ServiceResponse<List<GetPostDto>>();
            var dbPosts = await _context.Posts.ToListAsync();
            ServiceResponse.Data = dbPosts.Select(c => _mapper.Map<GetPostDto>(c)).ToList();
            return ServiceResponse;
        }

        public async Task<ServiceResponse<GetPostDto>> GetPostById(int id)
        {
            var ServiceResponse = new ServiceResponse<GetPostDto>();
            var dbPost = await _context.Posts.FirstOrDefaultAsync(c => c.Id == id);
            ServiceResponse.Data = _mapper.Map<GetPostDto>(dbPost);
            return ServiceResponse;
            
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