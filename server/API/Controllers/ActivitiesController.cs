using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(string id)
        {
            return await Mediator.Send(new GetActivityDetails.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
        {
            return await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto });
        }

        [HttpPut]
        public async Task<ActionResult<Activity>> EditActivity(Activity activity)
        {
            await Mediator.Send(new EditActivity.Command { Activity = activity });

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            await Mediator.Send(new DeleteActivity.Command { Id = id });

            return Ok();
        }
    }
}
