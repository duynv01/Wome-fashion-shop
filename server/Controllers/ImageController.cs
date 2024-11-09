using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models.Entities;
using server.Models;
using server.Service;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageRepo _imageRepo; 

        public ImageController(IImageRepo imageRepo)
        {
            _imageRepo = imageRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetAllImagesAsync()
        {
            var images = await _imageRepo.GetAllImagesAsync();
            var imageDtos = images.Select(i => new ImageDto
            {
                ImageId = i.ImageId,
                Path = i.Path,
                Name = i.Name
            }).ToList();
            return Ok(imageDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImageAsync(int id)
        {
            var image = await _imageRepo.GetImageAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return Ok(image);
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddImageAsync(ImageDto imageDto)
        {
            try
            {
                var newImageId = await _imageRepo.AddImageAsync(imageDto);
                var image = await _imageRepo.GetImageAsync(newImageId);
                return image == null ? NotFound() : Ok(image);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("upload")]
        public async Task<ActionResult> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(folderPath, fileName);

            // Lưu file vào thư mục
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Lưu thông tin vào cơ sở dữ liệu
            var imageDto = new ImageDto
            {
                Path = "/images/" + fileName,
                Name = fileName
            };

            await _imageRepo.AddImageAsync(imageDto);
            return Ok(new { Path = imageDto.Path });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateImage(int id, [FromBody] ImageDto imageDto)
        {
            await _imageRepo.UpdateImage(id, imageDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImagesAsync(int id)
        {
            await _imageRepo.DeleteImagesAsync(id);
            return Ok();
        }
    }
}
