using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using MI.Server.DataAccess.DbObjects.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MI.Server.BusinessLogic.Business
{
    public class SigningRulesBusiness
    {
        private readonly MensaIntranetContext _context;

        internal SigningRulesBusiness(MensaIntranetContext context)
        {
            _context = context;
        }

        public static SigningRulesDto SubjectDbToSubjectDto(SigningRulesDb signingRulesDb)
        {
            return new SigningRulesDto()
            {
                Id = signingRulesDb.Id,
                Grade = signingRulesDb.GradeEnum,
                Type = signingRulesDb.Type,
                Quantity = signingRulesDb.Quantity
            };
        }

        public async Task<IEnumerable<SigningRulesDto>> GetSigningRules()
        {
            List<SigningRulesDb> signingRules = await _context.SigningRules.ToListAsync();

            return signingRules.Select(SubjectDbToSubjectDto);
        }

        public async Task CreateSigningRule(SigningRulesDto signingRules)
        {
            SigningRulesDb signingRuleDb = new SigningRulesDb()
            {
                GradeEnum = signingRules.Grade,
                Quantity = signingRules.Quantity,
                Type = signingRules.Type
            };

            _context.SigningRules.Add(signingRuleDb);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSigningRule(int signingRuleId, SigningRulesDto signingRulesDto)
        {

            SigningRulesDb signingRulesDb = await _context.SigningRules
                .FirstOrDefaultAsync(s => s.Id == signingRuleId);

            if (signingRulesDb == null)
            {
                throw new NotFoundException($"Signing rule with id {signingRuleId} does not exist in database.");
            }

            signingRulesDb.Quantity = signingRulesDto.Quantity ?? signingRulesDb.Quantity;
            signingRulesDb.GradeEnum = signingRulesDto.Grade == GradeEnum.NotDefined ? signingRulesDb.GradeEnum : signingRulesDto.Grade;
            signingRulesDb.Type = signingRulesDto.Type == SubjectTypeEnum.NotDefined ? signingRulesDb.Type : signingRulesDto.Type;

            _context.SigningRules.Update(signingRulesDb);
            await _context.SaveChangesAsync();

        }

        public async Task DeleteSigningRule(int signingRuleId)
        {
            var signingRule = await _context.SigningRules
            .FirstOrDefaultAsync(s => s.Id == signingRuleId);

            if (signingRule == null)
            {
                throw new NotFoundException($"Signing rule with id {signingRule.Id} does not exist in database.");
            }

            _context.SigningRules.Remove(signingRule);
            await _context.SaveChangesAsync();
        }
    }
}
