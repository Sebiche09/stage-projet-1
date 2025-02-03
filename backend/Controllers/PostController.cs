using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
namespace backend.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<ServiceResponse<List<GetPostDto>>>> Get()
        {
            return Ok(await _postService.GetAllPosts());
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<ServiceResponse<List<GetPostDto>>>> GetPostsByUser(int userId)
        {
            return Ok(await _postService.GetPostsByUserId(userId));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetPostDto>>>> AddPost(AddPostDto newPost)
        {
            return Ok(await _postService.AddPost(newPost));
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<GetPostDto>>>> UpdatePost(UpdatePostDto updatedPost)
        {
            var response = await _postService.UpdatePost(updatedPost);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<GetPostDto>>> DeletePost(int id)
        {
            var response = await _postService.DeletePost(id);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

    }
}