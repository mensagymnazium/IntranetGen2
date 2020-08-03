using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MI.Server.BusinessLogic.DTO;
using MI.Server.DataAccess.Database;
using MI.Server.DataAccess.DbObjects.Entities;
using Microsoft.EntityFrameworkCore;

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


        public async Task<IEnumerable<AssignmentDto>> GetAssignments()
        {
            return await _context.Assignments.Include(x => x.Submissions).Select(y => _mapper.Map<AssignmentDb, AssignmentDto>(y))
                .ToListAsync().ConfigureAwait(false);
        }
    }
}