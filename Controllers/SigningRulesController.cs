using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using MI.Server.BusinessLogic;
using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SigningRulesController : ControllerBase
    {

        private readonly BusinessManager _manager;
        public SigningRulesController(BusinessManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<SigningRulesDto>> Get()
        {
            return await _manager.SigningRulesBusiness.GetSigningRules();
        }


        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Post(SigningRulesDto signingRules)
        {
            try
            {
                await _manager.SigningRulesBusiness.CreateSigningRule(signingRules);
                return Ok();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut("{signingRuleId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Put([FromRoute]int signingRuleId, SigningRulesDto signingRulesDto)
        {
            try
            {
                await _manager.SigningRulesBusiness.UpdateSigningRule(signingRuleId, signingRulesDto);
                return Ok();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpDelete("{signingRuleId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute]int signingRuleId)
        {
            try
            {
                await _manager.SigningRulesBusiness.DeleteSigningRule(signingRuleId);
                return Ok();
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}