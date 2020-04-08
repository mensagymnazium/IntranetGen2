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
                Type = signingRulesDb.Type.ToList(),
                Quantity = signingRulesDb.Quantity
            };
        }

        public async Task<IEnumerable<SigningRulesDto>> GetSigningRules()
        {
            List<SigningRulesDb> signingRules = await _context.SigningRules.ToListAsync();

            return signingRules.Select(SubjectDbToSubjectDto);
        }

        public async Task<IEnumerable<SigningRulesDto>> GetSigningRulesByGrade(GradeEnum grade)
        {
            List<SigningRulesDb> signingRules = await _context.SigningRules.Where(g => g.GradeEnum == grade).ToListAsync();

            return signingRules.Select(SubjectDbToSubjectDto);
        }

        public async Task SetSigningDone(List<UserDto> students)
        {
            foreach(var student in students)
            {
                var rules = await _context.SigningRules.Where(r => r.GradeEnum == student.StudentClass).ToListAsync();
                var allSignedSubject = await _context.UserSubjects
                .Include(s => s.Subject)
                .Include(u => u.User)
                .Where(u => u.UserId == student.Id && u.Priority == Priority.Primary).ToListAsync();
                var number = NumberOfPossibleSigns(rules);

                if (allSignedSubject.Count == number)
                    student.SignDone = true;
            }
        }

        public async Task<bool> CanSign(UserDb user, SubjectDto subjectDto, Priority priority)
        {
            var allSignedSubject = await _context.UserSubjects
                .Include(s => s.Subject)
                .Include(u => u.User)
                .Where(u => u.UserId == user.Id && u.Priority == priority).ToListAsync();
            var signingRules = await _context.SigningRules.Where(r => r.GradeEnum == user.StudentGrade).ToListAsync();

            var n = NumberOfPossibleSigns(signingRules);

            if (allSignedSubject.Count >= n)
                return false;
            if (allSignedSubject.Any(s => s.SubjectId == subjectDto.Id))
                return false;

            foreach (var rule in signingRules)
            {
                var ruleTypes = rule.Type.ToList();
                var signedSubjectWithDesiredType = allSignedSubject.Where(s => s.Subject.Types.ToList().Any(x => ruleTypes.Any(y => y == x))).Select(x => x.Subject).ToList();
                foreach (var ruleType in ruleTypes)
                {
                    if (signedSubjectWithDesiredType.Count() >= NumberOfRule(signingRules, ruleType))
                        continue;
                    if (subjectDto.Type.Contains(ruleType))
                        return true;
                }
            }
            return false;
        }

        private int? NumberOfRule(List<SigningRulesDb> signRules, SubjectTypeEnum subjectTypeEnum)
        {
            int? number = 0;
            foreach(var rule in signRules)
            {
                if (rule.Type.ToList().Contains(subjectTypeEnum))
                    number += rule.Quantity;
            }
            return number;
        }



        private int? NumberOfPossibleSigns(List<SigningRulesDb> signRules)
        {
            int? number = 0;
            foreach (var rule in signRules)
            {
                number += rule.Quantity;
            }
            return number;
        }

        public async Task CreateSigningRule(SigningRulesDto signingRules)
        {
            var subjectType = GetSubjectTypeEnum(signingRules.Type);
            SigningRulesDb signingRuleDb = new SigningRulesDb()
            {
                GradeEnum = signingRules.Grade,
                Quantity = signingRules.Quantity,
                Type = subjectType
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

            if (signingRulesDto.Type.Count != 0)
            {
                var subjectType = GetSubjectTypeEnum(signingRulesDto.Type);
                signingRulesDb.Type = subjectType;
            }

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

        private SubjectTypeEnum GetSubjectTypeEnum(List<SubjectTypeEnum> list)
        {
            if (list.Count == 0)
                return SubjectTypeEnum.NotDefined;
            return list.Aggregate((prev, next) => prev | next);
        }
    }
}
