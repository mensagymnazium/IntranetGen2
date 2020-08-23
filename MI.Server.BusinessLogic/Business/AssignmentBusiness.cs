using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Schema;
using AutoMapper;
using MI.Server.BusinessLogic.DTO;
using MI.Server.BusinessLogic.Exceptions;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;
using Z.EntityFramework.Plus;

namespace MI.Server.BusinessLogic.Business
{
    public class AssignmentBusiness
    {
        private readonly MensaIntranetContext _context;
        private readonly IMapper _mapper;

        internal AssignmentBusiness(MensaIntranetContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<AssignmentDb> GetAssignmentById(int id)
        {
            var assignmentDb = await _context.Assignments
                .FirstOrDefaultAsync(x => x.Id == id);

            return assignmentDb;
        }

        public async Task<IEnumerable<AssignmentDto>> GetAssignmentsByUserName(string userName)
        {
            var listDb = await _context.Assignments
                .IncludeFilter(x => x.Submissions.Where(y => y.User.Email == userName))
                .ToListAsync();

            var dateTime = DateTime.Now;
            var returnList = listDb.Where(x => x.ActiveFrom <= dateTime);
            return  _mapper.Map<IEnumerable<AssignmentDto>>(returnList);
        }

        public async Task InsertOrUpdateAssignment(AssignmentDto assignmentDto)
        {
            //var assignmentDb = _mapper.Map<AssignmentDb>(assignmentDto);
            var assignmentDb = new AssignmentDb
            {
                Id = assignmentDto.Id,
                MaxNumberOfUploads = assignmentDto.MaxNumberOfUploads,
                Name = assignmentDto.Name,
                SolutionPath = assignmentDto.SolutionPath,
                Required = assignmentDto.Required,
                ActiveFrom = Convert.ToDateTime(assignmentDto.ActiveFrom),
                Deadline = Convert.ToDateTime(assignmentDto.Deadline)
            };

            var assignmenIntDb = _context.Assignments.SingleOrDefaultAsync(x => x.Id == assignmentDb.Id && x.SolutionPath == assignmentDb.SolutionPath);
            if (assignmenIntDb == null)
                await _context.Assignments.AddAsync(assignmentDb);
            else
                _context.Assignments.Update(assignmentDb);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAssignment(int id)
        {
            var assignment = await _context.Assignments
                .Include(s => s.Submissions)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (assignment == null)
            {
                throw new NotFoundException($"Subject with id {assignment.Id} does not exist in database.");
            }

            _context.Assignments.Remove(assignment);
            await _context.SaveChangesAsync();
        }
    }
}