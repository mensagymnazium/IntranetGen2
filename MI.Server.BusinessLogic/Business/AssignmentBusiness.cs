using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MI.Server.BusinessLogic.DTO;
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


        public async Task<IEnumerable<AssignmentDto>> GetAssignmentsByUserName(string userName)
        {
            var listDb = await _context.Assignments
                .IncludeFilter(x => x.Submissions.Where(y => y.User.Email == userName))
                .ToListAsync();

            return  _mapper.Map<IEnumerable<AssignmentDto>>(listDb);
        }

        public async Task InsertOrUpdateAssignment(AssignmentDto assignmentDto)
        {
            //var assignmentDb = _mapper.Map<AssignmentDb>(assignmentDto);
            var assignmentDb = new AssignmentDb
            {
                Id = assignmentDto.Id,
                MaxNumberOfUploads = assignmentDto.MaxNumberOfUploads,
                Name = assignmentDto.Name,
                Required = assignmentDto.Required,
                ActiveFrom = Convert.ToDateTime(assignmentDto.ActiveFrom),
                Deadline = Convert.ToDateTime(assignmentDto.Deadline)
            };

            var assignmenIntDb = _context.Assignments.SingleOrDefaultAsync(x => x.Id == assignmentDb.Id);
            if (assignmenIntDb == null)
                await _context.Assignments.AddAsync(assignmentDb);
            else
                _context.Assignments.Update(assignmentDb);

            await _context.SaveChangesAsync();
        }
    }
}