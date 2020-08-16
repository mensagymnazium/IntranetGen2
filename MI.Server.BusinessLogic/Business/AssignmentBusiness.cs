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
    }
}