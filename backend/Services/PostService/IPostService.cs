using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace backend.Services.PostService
{
    public interface IPostService
    {
        Task<ServiceResponse<List<GetPostDto>>> GetAllPosts();
        Task<ServiceResponse<List<GetPostDto>>> GetPostsByUserId(int userId);
        Task<ServiceResponse<List<GetPostDto>>> AddPost(AddPostDto newPost);
        Task<ServiceResponse<GetPostDto>> UpdatePost(UpdatePostDto updatedPost);
        Task<ServiceResponse<List<GetPostDto>>> DeletePost(int id);
    }
}